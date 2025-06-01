// hooks/useResize.ts
import { useState, useEffect } from 'react';

const SCREENBREAKPOINT = 1320;

export const useResize = () => {
  // Инициализируем 0, чтобы во время SSR не было window.innerWidth
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    // Только в браузере: получаем актуальную ширину
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Сразу один раз задаём ширину
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width,
    isBreakpoint: width > SCREENBREAKPOINT,
  };
};
