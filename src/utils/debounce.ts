export const debounceRaf = <T extends (...args: any[]) => void>(fn: T) => {
  let raf: number = 0;

  return (...args: Parameters<T>): void => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      fn(...args);
      raf = 0;
    });
  };
};