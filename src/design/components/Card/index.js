import { useTheme } from '@/design/hooks/Theme';
import React from 'react';

import styled from 'styled-components';
import { SubTitle, Title } from '../Text';

const CardContainer = styled.div.attrs(({ className = '' }) => ({
  className: `CardContainer ${className}`,
}))(() => {
  const [
    {
      padding,
      borderRadius,
      borderColor,
      boxShadow,
      color: { gray },
    },
  ] = useTheme();

  return `
    background: ${gray.light_5};
    box-shadow: ${boxShadow.default};
    border: 1px solid ${borderColor};
    border-radius: ${borderRadius.default}px;
    width: 100%;
    maxWidth: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  `;
});

const CardHeader = styled.div.attrs(({ className = '' }) => ({
  className: `CardHeader ${className}`,
}))(() => {
  const [
    {
      padding,
      borderRadius,
      color: { gray },
    },
  ] = useTheme();

  return `
    display: flex;
    align-items: center;
    border-top-left-radius: ${borderRadius.small}px;
    border-top-right-radius: ${borderRadius.small}px;
    padding: ${padding.default}px ${padding.default}px ${padding.small}px;
    background: ${gray.light_3};
  `;
});

const CardFooter = styled.div.attrs(({ className = '' }) => ({
  className: `CardFooter ${className}`,
}))(() => {
  const [{ padding, borderRadius }] = useTheme();

  return `
    display: flex;
    align-items: center;
    border-bottom-left-radius: ${borderRadius.default}px;
    border-bottom-right-radius: ${borderRadius.default}px;
    padding: 0 ${padding.default}px ${padding.default}px;
  `;
});

const CardBody = styled.div.attrs(({ className = '' }) => ({
  className: `CardBody ${className}`,
}))(() => {
  const [{ padding, borderRadius }] = useTheme();
  return `
    flex:1;
    overflow-y: auto;
    padding: ${padding.default}px;
    border-radius: 0 ${borderRadius.default}px;
  `;
});

const Card = styled(CardContainer).attrs(
  ({
    width = '100%',
    header,
    footer,
    children,
    style = {},
    bodyStyle = {},
    headerStyle = {},
    footerStyle = {},
  }) => {
    return {
      style: { ...style, width },
      children: (
        <>
          {header && (
            <CardHeader style={headerStyle}>
              {typeof header === 'string' ? (
                <SubTitle>{header}</SubTitle>
              ) : (
                header
              )}
            </CardHeader>
          )}
          <CardBody style={bodyStyle}>{children}</CardBody>

          {footer && <CardFooter style={footerStyle}>{footer}</CardFooter>}
        </>
      ),
    };
  },
)``;

export default Card;
