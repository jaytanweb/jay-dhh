import { useState } from 'react';

export function useAnimate(startCb, endCb) {
  const [animating, setAnimating] = useState(false);

  const startAnimation = () => {
    if (!animating) {
      setAnimating(true);
      startCb && startCb();
    }
  };

  const endAnimation = () => {
    if (animating) {
      setAnimating(false);
      endCb && endCb();
    }
  };

  return {
    animating,
    startAnimation,
    endAnimation,
  };
}
