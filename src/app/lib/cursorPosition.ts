import { useState, useEffect } from 'react';

export default function useCursorPosition() {

  const [mousePosition, setMousePosition] = useState<({
    x: number | 0;
    y: number | 0;
  })>({
    x: 0,
    y: 0,
  });

  const updateMousePosition = (e: MouseEvent) => {
    setMousePosition({
        x: e.clientX,
        y: e.clientY,
  });
}

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
        window.removeEventListener('mousemove', updateMousePosition);
    }
  }, []); // Empty array ensures effect runs only on mount and unmount  

  return mousePosition;
}
