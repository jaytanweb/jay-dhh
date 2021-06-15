import { keyframes, css } from 'styled-components';

export const fadeIn = keyframes`
  0% {
    transform: translateZ(-80px);
    opacity: 0;
  }
  100% {
    transform: translateZ(0);
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  0% {
    transform: translateZ(0);
    opacity: 1;
  }
  100% {
    transform: translateZ(-80px);
    opacity: 0;
  }
`;

export const scaleIn = keyframes`
  0% {
    transform: scale(0);
    transform-origin: center center;
    opacity: 1;
  }
  100% {
    transform: scale(1);
    transform-origin: center center;
    opacity: 1;
  }
`;

export const scaleOut = keyframes`
  0% {
    transform: scale(1);
    transform-origin: center center;
    opacity: 1;
  }
  100% {
    transform: scale(0);
    transform-origin: center center;
    opacity: 1;
  }
`;

export const fadeEnter = css`
  animation: ${fadeIn} 0.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
`;
export const fadeExit = css`
  animation: ${fadeOut} 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

export const scaleEnter = css`
  animation: ${scaleIn} 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;
export const scaleExit = css`
  animation: ${scaleOut} 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

export const scaleInTL = keyframes`
  0% {
    transform: scale(0);
    transform-origin: 100% 100%;
    opacity: 1;
  }
  100% {
    transform: scale(1);
    transform-origin: 100% 100%;
    opacity: 1;
  }
`;

export const scaleOutTL = keyframes`
  0% {
    transform: scale(1);
    transform-origin: 100% 100%;
    opacity: 1;
  }
  100% {
    transform: scale(0);
    transform-origin: 100% 100%;
    opacity: 1;
  }
`;

export const scaleInTR = keyframes`
  0% {
    transform: scale(0);
    transform-origin: 0 100%;
    opacity: 1;
  }
  100% {
    transform: scale(1);
    transform-origin: 0 100%;
    opacity: 1;
  }
`;

export const scaleOutTR = keyframes`
  0% {
    transform: scale(1);
    transform-origin: 0 100%;
    opacity: 1;
  }
  100% {
    transform: scale(0);
    transform-origin: 0 100%;
    opacity: 1;
  }
`;

export const scaleInBL = keyframes`
  0% {
    transform: scale(0);
    transform-origin: 100% 0;
    opacity: 1;
  }
  100% {
    transform: scale(1);
    transform-origin: 100% 0;
    opacity: 1;
  }
`;

export const scaleOutBL = keyframes`
  0% {
    transform: scale(1);
    transform-origin: 100% 0;
    opacity: 1;
  }
  100% {
    transform: scale(0);
    transform-origin: 100% 0;
    opacity: 1;
  }
`;

export const scaleInBR = keyframes`
  0% {
    transform: scale(0);
    transform-origin: 0 0;
    opacity: 1;
  }
  100% {
    transform: scale(1);
    transform-origin: 0 0;
    opacity: 1;
  }
`;

export const scaleOutBR = keyframes`
  0% {
    transform: scale(1);
    transform-origin: 0 0;
    opacity: 1;
  }
  100% {
    transform: scale(0);
    transform-origin: 0 0;
    opacity: 1;
  }
`;

export const slideInRight = keyframes`
  0% {
    transform: translateX(100%);
    transform-origin: 0 0;
    opacity: 1;
  }
  100% {
    transform: translateX(0);
    transform-origin: 0 0;
    opacity: 1;
  }
`;

export const slideOutRight = keyframes`
  0% {
    transform: translateX(0);
    transform-origin: 0 0;
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    transform-origin: 0 0;
    opacity: 1;
  }
`;

export const slideEnterBL = css`
  -webkit-animation: ${slideInRight} 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: ${slideInRight} 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;
export const slideExitBL = css`
  -webkit-animation: ${slideOutRight} 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: ${slideOutRight} 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

export const scaleEnterTL = css`
  animation: ${scaleInTL} 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;
export const scaleExitTL = css`
  animation: ${scaleOutTL} 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

export const scaleEnterTR = css`
  animation: ${scaleInTR} 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;
export const scaleExitTR = css`
  animation: ${scaleOutTR} 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

export const scaleEnterBL = css`
  animation: ${scaleInBL} 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

export const scaleExitBL = css`
  animation: ${scaleOutBL} 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

export const scaleEnterBR = css`
  animation: ${scaleInBR} 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;
export const scaleExitBR = css`
  animation: ${scaleOutBR} 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;
