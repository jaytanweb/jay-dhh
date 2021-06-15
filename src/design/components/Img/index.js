import React from 'react';
import styled from 'styled-components';

const Img = styled.img.attrs((props) => ({ alt: props?.alt || 'img' }))`
  display: block;
  max-width: 100%;
  width: auto;
  user-select: none;
`;
export default Img;
