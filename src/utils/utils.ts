import { useLayoutEffect, useState } from 'react';

/**
 * 随机生成uuid
 */
export function uuid() {
  const arr: string[] = [];
  const hexDigits: string = '0123456789abcdef';
  for (let i: number = 0; i < 36; i++) {
    arr[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  arr[8] = arr[13] = arr[18] = arr[23] = '-'
  const uniqueId: string = arr.join('');
  return uniqueId;
}

/**
 * 监听视窗宽度变化
 */
export function useWindowSize() {
  const [size, setSize] = useState<[number, number]>([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}
