import React from 'react';
import { timeToSeconds } from '../utils/timeToSeconds';

interface Props {
  mainTime: number;
}

export function Timer(props: Props): JSX.Element {
  return <div className="timer">{timeToSeconds(props.mainTime)}</div>;
}
