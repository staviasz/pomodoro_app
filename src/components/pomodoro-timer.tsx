/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useCallback, useEffect, useState } from 'react';
import useInterval from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';
import { secondsToMinutes } from '../utils/secons-to-minutes';

const bellStart = require('../sounds/bell-start.mp3');
const bellFinish = require('../sounds/bell-finish.mp3');

const audioStartWorking = new Audio(bellStart);
const audioFinishWorking = new Audio(bellFinish);

interface Props {
  defaultPomodoroTimer: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.defaultPomodoroTimer);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [noWorking, setNoWorking] = useState(true);
  const [resting, setResting] = useState(false);
  const [cycles, setCycles] = useState(new Array(props.cycles - 1).fill(true));

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null
  );

  const configureWork = useCallback(
    (start: boolean) => {
      // console.log(noWorking);
      if (start) {
        setCompletedCycles(0);
        setFullWorkingTime(0);
        setNumberOfPomodoros(0);
      }

      setTimeCounting(true);
      setWorking(true);
      setNoWorking(false);
      setResting(false);
      setMainTime(props.defaultPomodoroTimer);
      audioStartWorking.play();

      console.log(noWorking);
    },
    [
      setCompletedCycles,
      setFullWorkingTime,
      setNumberOfPomodoros,
      setTimeCounting,
      setWorking,
      setNoWorking,
      setResting,
      setMainTime,
      props.defaultPomodoroTimer,
    ]
  );

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCounting(true);
      setWorking(false);
      setResting(true);

      if (long) {
        setMainTime(props.longRestTime);
      } else {
        setMainTime(props.shortRestTime);
      }

      audioFinishWorking.play();
    },
    [
      setTimeCounting,
      setWorking,
      setResting,
      setMainTime,
      props.longRestTime,
      props.shortRestTime,
    ]
  );

  const configureNoWorking = useCallback(() => {
    setTimeCounting(false);
    setWorking(false);
    setNoWorking(true);
    setResting(false);
    setMainTime(props.defaultPomodoroTimer);
    audioFinishWorking.play();
  }, [
    setTimeCounting,
    setWorking,
    setNoWorking,
    setResting,
    setMainTime,
    props.defaultPomodoroTimer,
  ]);

  useEffect(() => {
    if (working) {
      document.body.classList.add('working');
    } else {
      document.body.classList.remove('working');
    }

    if (mainTime > 0) return;

    if (working && cycles.length > 0) {
      configureRest(false);
      cycles.pop();
    } else if (working && cycles.length <= 0) {
      configureRest(true);
      setCycles(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWork(false);
  }, [
    working,
    resting,
    mainTime,
    cycles,
    configureRest,
    setCycles,
    setCompletedCycles,
    setNumberOfPomodoros,
    numberOfPomodoros,
    props,
    completedCycles,
    configureWork,
  ]);

  return (
    <div className="pomodoro">
      {noWorking ? (
        <h2>Pomodoro</h2>
      ) : (
        <h2>You are: {working ? 'Working' : 'Resting'}</h2>
      )}

      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button
          text={!working ? 'Start' : 'Restart'}
          onClick={() =>
            noWorking ? configureWork(true) : configureWork(false)
          }
        ></Button>

        <Button
          className={!working && !resting ? 'hidden' : ''}
          text="Rest"
          onClick={() => configureRest(false)}
        ></Button>

        <Button
          className={!working && !resting ? 'hidden' : ''}
          text={timeCounting ? 'pause' : 'play'}
          onClick={() => setTimeCounting(!timeCounting)}
        ></Button>
      </div>
      <div className="details">
        <p>Ciclos concluidos: {completedCycles}</p>
        <p>Horas trabalhadas: {secondsToMinutes(fullWorkingTime)}</p>
        <p>Pomodoros concluidos: {numberOfPomodoros}</p>
      </div>
      <Button
        className={noWorking ? 'hidden' : 'no_working'}
        text="End"
        onClick={() => configureNoWorking()}
      ></Button>
    </div>
  );
}
