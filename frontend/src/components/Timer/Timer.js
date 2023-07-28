import { useState, useEffect } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';

import TimerCircle from './TimerCircle';


const Timer = ({ client, task, onStop }) => {
  const [workDuration, setWorkDuration] = useState(25 * 60);
  const [breakDuration, setBreakDuration] = useState(5 * 60);
  const [duration, setDuration] = useState(workDuration);
  const [timer, setTimer] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [savedDuration, setSavedDuration] = useState(null);
  const audioStartBreak = new Audio(process.env.PUBLIC_URL + 'Singing bowl startBreak.mp3');
  const audioStopBreak = new Audio(process.env.PUBLIC_URL + 'Singing bowl stopBreak.mp3');

  const percentage = !isPaused
  ? (duration / (isBreak ? breakDuration : workDuration)) * 100
  : (savedDuration / (isBreak ? breakDuration : workDuration)) * 100;


  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setDuration(duration => {
          if (duration === 0) {
            setIsBreak(!isBreak);
            if (isBreak) {
              handleStartBreak();
            } else {
              handleStopBreak();
            }
            return isBreak ? workDuration : breakDuration;
          } else {
            return duration - 1;
          }
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isRunning, isBreak, workDuration, breakDuration]);


  useEffect(() => {
    if (!isRunning) {
      if (isBreak && duration === 0) {
        // The timer was stopped while on a break
        setIsBreak(false);
        setDuration(workDuration);
      } else {
        setDuration(isBreak ? breakDuration : workDuration);
      }
    }
  }, [isBreak, isRunning, workDuration, breakDuration]);


  const handleStart = async () => {
    // Create and start the timer
    try {
      const response = await client.post('/api/timer/', {
        duration,
        task: task.url,
      }, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });
      setIsRunning(true);
      setTimer(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleStop = async () => {
    // Send a stop request and stop the timer
    try {
      await client.patch(timer.url, {
        is_completed: true,
      }, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });
      setIsRunning(false);
      setIsBreak(false);
      if (onStop) onStop();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePause = async () => {
    // Save the current value of the duration state
    setSavedDuration(duration);
  
    // Send a request to your server to pause the timer for the current user and task
    try {
      await client.patch(timer.url, {
        is_running: false
      }, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });
      setIsRunning(false);
      setIsPaused(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResume = async () => {
    // Restore the saved value of the duration state
    if (savedDuration !== null) {
      setDuration(savedDuration);
      setSavedDuration(null);
    }
  
    // Send a request to your server to resume the timer for the current user and task
    try {
      await client.patch(timer.url, {
        is_running: true
      }, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });
      setIsRunning(true);
      setIsPaused(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartBreak = async () => {
    try {
      await client.patch(timer.url, {
        is_running: false
      }, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });
      audioStartBreak.play()
    } catch (error) {
      console.error(error);
    }
  };

  const handleStopBreak = async () => {
    try {
      await client.patch(timer.url, {
        is_running: true
      }, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });
      audioStopBreak.play();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Form className='m-3'>
        <Form.Group>
          <Form.Label>Duración</Form.Label>
          <Form.Control
            type="number"
            value={workDuration / 60}
            onChange={e => setWorkDuration(e.target.value * 60)}
            disabled={isRunning || isPaused}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Duración de descanso</Form.Label>
          <Form.Control
            type="number"
            value={breakDuration / 60}
            onChange={e => setBreakDuration(e.target.value * 60)}
            disabled={isRunning || isPaused}
          />
        </Form.Group>
      </Form>
      <div className='d-flex justify-content-center'>
        <TimerCircle
          percentage={percentage}
          duration={duration}
          savedDuration={savedDuration}
          onStart={handleStart}
          onStop={handleStop}
          onPause={handlePause}
          onResume={handleResume}
          isPaused={isPaused}
          isRunning={isRunning}
          isBreak={isBreak}
        />
      </div>
    </div>
  );
};

export default Timer;
