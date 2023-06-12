export function timeToSeconds(time: number): string {
  const zeroLeft = (n: number) => Math.floor(n).toString().padStart(2, '0');
  const min = zeroLeft((time / 60) % 60);
  const sec = zeroLeft((time % 60) % 60);
  return `${min}:${sec}`;
}
