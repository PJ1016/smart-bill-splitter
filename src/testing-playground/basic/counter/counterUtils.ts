export const increment = (count: number): number => count + 1;

export const decrement = (count: number): number => {
  if (count <= 0) return 0;
  return count - 1;
};
