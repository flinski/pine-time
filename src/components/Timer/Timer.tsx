import { useEffect } from 'react'
import { useAppDispatch, useAppState } from '@/contexts/AppContext'
import { formatTime } from '@/utils/helpers'
import styles from './Timer.module.scss'

export default function Timer() {
  const { timeLeft, isActive, mode, focusTime, breakTime, restTime } = useAppState()
  const dispatch = useAppDispatch()

  const modeTime = mode === 'focus' ? focusTime : mode === 'break' ? breakTime : restTime
  const timeProgress = timeLeft / modeTime
  const strokeDasharray = 2 * Math.PI * 90
  const strokeDashoffset = timeProgress * strokeDasharray

  useEffect(() => {
    let intervalId = undefined

    if (isActive && timeLeft >= 0) {
      intervalId = setInterval(() => {
        dispatch({ type: 'timer/decrease' })
      }, 1000)
    } else if (isActive && timeLeft < 0) {
      dispatch({ type: 'timer/complete' })
    }

    return () => clearInterval(intervalId)
  }, [isActive, timeLeft, dispatch])

  return (
    <div className={styles.timer}>
      <div className={styles.info}>
        <div className={styles.title}>{mode}</div>
        <div className={styles.countdown}>{formatTime(timeLeft)}</div>
        <div>Sessions</div>
      </div>
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle
          id="progressCircle"
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 100 100)"
        ></circle>
      </svg>
    </div>
  )
}
