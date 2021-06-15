import React, { useEffect, useMemo, useState } from 'react';
import { uniqueId } from 'lodash';
import {
  Title,
  Text,
  Checkbox,
  Card,
  Profile,
  SubTitle,
  Icon,
  UserItem,
  Empty,
} from '@/design/components';
import { useTheme } from '@/design/hooks/Theme';
const { isValidArray } = require('@/utils/type');
import createContext from '@/design/hooks/createContext';
const { Provider, useContext: useTree } = createContext('Tree');

// 节点
class Node {
  constructor({ key, title, children }) {
    this.key = key;
    this.title = title;
    this.children = children;

    const { items, nodes } = formatTree(children);

    this.items = items;
    this.nodes = nodes;

    this.hasItems = isValidArray(this.items);
    this.hasNodes = isValidArray(this.nodes);
  }

  getStatus(value) {
    if (!this.hasItems && !this.hasNodes) {
      return { checked: false, undetermined: false };
    }

    const checked = this.values.every((val) => value.includes(val));
    const undetermined =
      !checked && this.values.some((val) => value.includes(val));

    return { checked, undetermined };
  }

  get values() {
    const { hasItems, items, hasNodes, nodes } = this;

    let values = [];

    if (hasItems) values = values.concat(items.map((el) => el.value));
    if (hasNodes) {
      nodes.forEach((node) => (values = values.concat(node.values)));
    }

    return values;
  }
}

// 叶子
class Item {
  constructor({ key, value, dataSource, render }) {
    this.key = key;
    this.value = value;
    this.render = render;
    this.dataSource = dataSource || {};
  }
}

const NodeDom = ({ node, style = {}, bodyStyle = {} }) => {
  const { collapse } = useTree();

  const expand = useMemo(() => !collapse.includes(node.key), [collapse, node]);

  const [{ padding, borderRadius }] = useTheme();

  return (
    <Card
      className="Node"
      key={node.key}
      style={{
        border: 'none',
        boxShadow: 'none',
        ...style,
      }}
      bodyStyle={{
        padding: 0,
        overflow: 'hidden',
        transition: 'all .12s ease-in-out',
        maxHeight: expand ? 10000 : 0,
        paddingTop: expand ? padding.small : 0,
      }}
      headerStyle={{
        borderRadius: expand
          ? `${borderRadius.default}px ${borderRadius.default}px 0 0`
          : borderRadius.default,
      }}
      header={<NodeHeader node={node} />}
    >
      {expand && (
        <NodeBody
          node={node}
          style={{ ...bodyStyle, visible: expand ? 'visible' : 'collapse' }}
        />
      )}
    </Card>
  );
};

const NodeHeader = ({ node }) => {
  const {
    value,
    onChange,
    disabled,
    showOnly,
    collapse,
    setCollapse,
  } = useTree();

  const { checked, undetermined } = useMemo(() => {
    return node.getStatus(value);
  }, [node, value]);

  const onNodeChange = () => {
    onChange(
      checked
        ? value.filter((el) => !node.values.includes(el))
        : [...new Set(value.concat(node.values))],
    );
  };

  const expand = useMemo(() => !collapse.includes(node.key), [collapse, node]);

  return (
    <div
      className="NodeHeader"
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
      }}
      onClick={() =>
        setCollapse(
          expand
            ? [...collapse, node.key]
            : collapse.filter((key) => key !== node.key),
        )
      }
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {showOnly ? (
          <SubTitle style={{ color: 'inherit' }}>{node.title}</SubTitle>
        ) : (
          <Checkbox
            selected={checked}
            undetermined={undetermined}
            onClick={onNodeChange}
            disabled={disabled}
          >
            <SubTitle style={{ color: 'inherit' }}>{node.title}</SubTitle>
          </Checkbox>
        )}
      </div>

      {/* 展开图标 */}
      <Icon
        size={10}
        type="arrowDown"
        style={{
          transition: 'all .12s ease-in-out',
          transform: `rotate(${expand ? 180 : 0}deg)`,
        }}
      />
    </div>
  );
};

const NodeBody = ({ node, style = {} }) => {
  const [{ margin, padding }] = useTheme();
  const { itemCol } = useTree();

  return (
    <div
      className="NodeBody"
      style={{ paddingLeft: padding.default * 2, ...style }}
    >
      {node.hasItems && (
        <div
          className="ItemList"
          style={{
            display: 'grid',
            gap: margin.small,
            gridTemplateColumns: `repeat(${itemCol}, 1fr)`,
            placeItems: 'stretch',
            padding: `${padding.small}px ${padding.default}px`,
          }}
        >
          {node.items.map((item) => (
            <ItemDom item={item} key={item.key} />
          ))}
        </div>
      )}

      {node.hasNodes && (
        <div className="NodeList">
          {node.nodes.map((curr, i) => {
            const isLast = i === node.nodes.length - 1;

            return (
              <NodeDom
                node={curr}
                key={curr.key}
                style={{ marginBottom: isLast ? 0 : margin.small }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const ItemDom = ({ item }) => {
  const { value, onChange, disabled, showOnly } = useTree();

  const checked = useMemo(() => {
    return value.includes(item.value);
  }, [value, item]);

  const onItemChange = () => {
    onChange(
      checked
        ? value.filter((el) => el !== item.value)
        : [...value, item.value],
    );
  };

  const Render = item.render;

  if (Render)
    return (
      <Render
        {...item.dataSource}
        value={checked}
        onChange={onItemChange}
        disabled={disabled}
        showOnly={showOnly}
      />
    );

  return (
    <div
      className="item"
      key={item.key}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      {showOnly ? (
        <Text>{item.value}</Text>
      ) : (
        <Checkbox selected={checked} onClick={onItemChange} disabled={disabled}>
          <Text>{item.value}</Text>
        </Checkbox>
      )}
    </div>
  );
};

const Tree = ({
  value,
  onChange,
  itemCol = 2,
  disabled,
  showOnly,
  dataSource,
  style = {},

  collapse: defaultCollapse = false,
}) => {
  const [collapse, setCollapse] = useState([]);

  const { nodes, items } = useMemo(() => {
    return formatTree(
      showOnly
        ? dataSource
        : [
            {
              key: uniqueId(`TreeSelectAll`),
              title: '全选',
              isSelectAll: true,
              children: dataSource,
            },
          ],
    );
  }, [dataSource, showOnly]);

  useEffect(() => {
    let keys = [];

    if (defaultCollapse) {
      // 折第一层以下每一层
      let curr = nodes,
        level = 0;
      while (isValidArray(curr)) {
        let nodeList = [];
        curr.forEach((node) => {
          if (level > 0) keys.push(node.key);
          if (node.hasNodes) nodeList = nodeList.concat(node.nodes);
        });
        curr = nodeList;
        level++;
      }
    }
    setCollapse(keys);
  }, [defaultCollapse, nodes]);

  const [{ margin, padding }] = useTheme();

  return (
    <Provider
      value={{
        value,
        onChange,
        itemCol,
        disabled,
        showOnly,
        collapse,
        setCollapse,
      }}
    >
      <div className="tree" style={{ ...style }}>
        {isValidArray(dataSource) ? (
          showOnly ? (
            <>
              {nodes.map((node) => (
                <NodeDom node={node} key={node.key} />
              ))}
              {isValidArray(items) && (
                <div
                  className="ItemList"
                  style={{
                    display: 'grid',
                    gap: margin.small,
                    gridTemplateColumns: `repeat(${itemCol}, 1fr)`,
                    placeItems: 'stretch',
                    padding: `${padding.small}px ${padding.default}px`,
                  }}
                >
                  {items.map((item) => (
                    <ItemDom item={item} key={item.key} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <NodeDom
              node={nodes[0]}
              key={nodes[0].key}
              bodyStyle={{ paddingLeft: 0 }}
            />
          )
        ) : (
          <Empty desc="暂无数据" />
        )}
      </div>
    </Provider>
  );
};

const formatTree = (dataSource) => {
  const nodes = dataSource
    .filter((el) => isValidArray(el?.children))
    .map((node) => new Node(node));
  const items = dataSource
    .filter((el) => !isValidArray(el?.children))
    .map((leaf) => new Item(leaf));

  return { nodes, items };
};

export default Tree;
