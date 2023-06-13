import { zeroLeft } from './zero-left';

export function secondsToTime(time: number): string {
  const min = zeroLeft((time / 60) % 60);
  const sec = zeroLeft((time % 60) % 60);
  return `${min}:${sec}`;
}
