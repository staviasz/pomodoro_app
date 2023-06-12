import React, { useState } from 'react';
import useInterval from '../hooks/use-interval';
import { timeToSeconds } from '../utils/timeToSeconds';

interface Props {
  defaultPomodoroTimer: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.defaultPomodoroTimer);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return <h1>hello word {timeToSeconds(mainTime)}</h1>;
}
