import { Button, Stack } from 'react-bootstrap';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';
import 'react-circular-progressbar/dist/styles.css';
import './Timer.css';


function TimerCircle({ 
  percentage, 
  duration,
  savedDuration,
  onStart,
  onStop,
  onPause,
  onResume,
  isPaused,
  isRunning,
  isBreak,
}) {
  
  return (
    <Stack>
      <div className='timer'>
        <CircularProgressbarWithChildren
          value={percentage}
          styles={buildStyles({
            pathTransitionDuration: 0.5,
            pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
            trailColor: '#d6d6d6',
            backgroundColor: '#3e98c7',
          })}>
        <div style={{ fontSize: 42, color: '#f88'}}>
          {  
            // Display the countdown value and a break notice
            isPaused ? `${Math.floor(savedDuration / 60)}:${(savedDuration % 60).toString().padStart(2, '0')}` 
            : `${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`
          }
        </div>
        <div>
          {isBreak ? 'Ha descansar!' : ''}
        </div>
        </CircularProgressbarWithChildren>
      </div>
      <div className='d-flex justify-content-center m-3'>
        {!isRunning && !isPaused && 
          <Button variant='success' className='d-flex' onClick={onStart}><FaPlay /></Button>}
        {isRunning && !isPaused && 
          <Button variant='danger' className='me-2 d-flex' onClick={onStop}><FaStop /></Button>}
        {isRunning && !isPaused && !isBreak && 
          <Button variant='secondary' className='d-flex' onClick={onPause}><FaPause /></Button>}
        {isPaused && 
          <Button variant='success' className='d-flex' onClick={onResume}><FaPlay /></Button>}
      </div>
    </Stack>
  );
}

export default TimerCircle;
