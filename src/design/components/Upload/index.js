import React, { useState } from 'react';
import styled from 'styled-components';

import { useTheme } from '@/design/hooks/Theme';

const FileContainer = styled.label(({ hasError, disabled, dragEnter }) => {
  const [
    {
      borderRadius,
      padding,
      color: { gray, red, primary },
    },
  ] = useTheme();

  return `
    display: block;
    position: relative;
    width: 100%;
    padding: ${padding.default}px;
    opacity: ${disabled ? 0.3 : 1};
    border: 1px dashed ${
      hasError ? red.light_5 : dragEnter ? primary.light_5 : gray.light_5
    };
    border-radius: ${borderRadius.default}px;
    cursor: ${disabled ? 'not-allowed' : 'normal'};

    background: ${
      hasError ? red.light_5 : dragEnter ? primary.light_5 : gray.light_5
    };

    &:hover {
        border-color: ${hasError ? red.light_3 : primary.light_3}
    }
`;
});

const FileInput = styled.input.attrs(({ multiple }) => ({
  type: 'file',
  multiple,
}))(() => {
  return `
    all: unset;
    width: 0;
    height: 0;
    opacity: 0;    
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
`;
});

const Upload = ({ children, hasError, disabled, onUpload, multiple }) => {
  const [dragEnter, setDragEnter] = useState(false);
  const [files, setFiles] = useState([]);

  const updateEnter = (e, entered) => {
    e.stopPropagation();
    e.preventDefault();

    setDragEnter(entered);
  };

  return (
    <FileContainer
      hasError={hasError}
      disabled={disabled}
      dragEnter={dragEnter}
      // 拖动事件
      onDragOver={(e) => updateEnter(e, true)}
      onDragEnter={(e) => updateEnter(e, true)}
      onDragLeave={(e) => updateEnter(e, false)}
      onMouseEnter={(e) => updateEnter(e, true)}
      onMouseLeave={(e) => updateEnter(e, false)}
      onDragEnd={(e) => updateEnter(e, false)}
      onDrop={(e) => {
        updateEnter(e, false);
        onUpload && onUpload(e.nativeEvent.dataTransfer.files);
      }}
    >
      {children}
      <FileInput
        onChange={(e) => onUpload(e.target.files)}
        multiple={multiple}
      />
    </FileContainer>
  );
};

export default Upload;
