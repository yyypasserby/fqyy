export function randomChoice<T>(arr: Readonly<T[]>): T {
  const length = arr.length;
  return arr[Math.floor(Math.random() * length)];
}
