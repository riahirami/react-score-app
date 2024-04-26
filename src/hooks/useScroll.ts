import { RefObject, useEffect } from 'react';

const useScroll = (
  pointer: unknown,
  objectRef?: RefObject<{ offsetTop?: number }>,
  isDisabled = false,
) => {
  useEffect(() => {
    if (!isDisabled) {
      try {
        window.scroll({
          top: objectRef?.current?.offsetTop || 0,
          left: 0,
          behavior: 'smooth',
        });
      } catch (error) {
        window.scrollTo(0, 0);
      }
    }
  }, [pointer, isDisabled]);
  return null;
};

export default useScroll;
