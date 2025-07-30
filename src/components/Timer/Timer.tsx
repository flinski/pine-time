import { useEffect } from 'react'
import { useAppDispatch, useAppState } from '@/contexts/AppContext'
import { formatTime } from '@/utils/helpers'
import styles from './Timer.module.scss'

export default function Timer() {
  const { timeLeft, isActive, mode, focusTime } = useAppState()
  const dispatch = useAppDispatch()

  const timeProgress = timeLeft / focusTime
  const strokeDasharray = 565
  const strokeDashoffset = Math.floor(timeProgress * strokeDasharray)

  useEffect(() => {
    let intervalId = undefined

    if (isActive) {
      intervalId = setInterval(() => {
        dispatch({ type: 'timer/decrease' })
      }, 1000)
    }

    return () => clearInterval(intervalId)
  }, [isActive, dispatch])

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

        {timeProgress !== 1 && (
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
          />
        )}
      </svg>
    </div>
  )
}
