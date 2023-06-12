import React, { useState } from 'react';
import useInterval from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';

interface Props {
  defaultPomodoroTimer: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.defaultPomodoroTimer);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return (
    <div className="pomodoro">
      <h2>you are: working</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button text="teste"></Button>
        <Button text="teste"></Button>
        <Button text="teste"></Button>
      </div>
    </div>
  );
}
