import { useEffect } from 'react'
import { useAppDispatch, useAppState } from '@/contexts/AppContext'
import { LS_KEY } from '@/constants/config'
import { secsToMins } from '@/utils/helpers'
import BackIcon from '@/components/icons/BackIcon'
import styles from './Settings.module.scss'

export default function Settings() {
  const { focusTime, breakTime, restTime, sessionsCycle } = useAppState()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const settings = {
      focusTime,
      breakTime,
      restTime,
      sessionsCycle,
    }

    localStorage.setItem(LS_KEY, JSON.stringify(settings))
  }, [focusTime, breakTime, restTime, sessionsCycle])

  const handleCloseSettings = () => {
    dispatch({ type: 'settings/close' })
  }

  const handleChangeTime = (
    event: React.ChangeEvent<HTMLInputElement>,
    mode: 'focus' | 'break' | 'rest'
  ) => {
    dispatch({
      type: 'settings/changeModeTime',
      payload: { value: Number(event.target.value) * 60, mode: mode },
    })
    dispatch({ type: 'timer/reset' })
  }

  const handleChangeSessions = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'settings/setSessionsCycle', payload: Number(event.target.value) })
    dispatch({ type: 'timer/reset' })
  }

  return (
    <div className={styles.settings}>
      <div className={styles.panel}>
        <button className={styles.backButton} onClick={handleCloseSettings}>
          <BackIcon />
        </button>
      </div>
      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="focus" className={styles.label}>
            Focus
          </label>
          <input
            type="number"
            id="focus"
            className={styles.input}
            value={
              secsToMins(focusTime) <= 0 || secsToMins(focusTime) > 99 ? '' : secsToMins(focusTime)
            }
            onChange={(event) => handleChangeTime(event, 'focus')}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="break" className={styles.label}>
            Break
          </label>
          <input
            type="number"
            id="break"
            className={styles.input}
            value={
              secsToMins(breakTime) <= 0 || secsToMins(breakTime) > 99 ? '' : secsToMins(breakTime)
            }
            onChange={(event) => handleChangeTime(event, 'break')}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="rest" className={styles.label}>
            Rest
          </label>
          <input
            type="number"
            id="rest"
            className={styles.input}
            value={
              secsToMins(restTime) <= 0 || secsToMins(restTime) > 99 ? '' : secsToMins(restTime)
            }
            onChange={(event) => handleChangeTime(event, 'rest')}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="sessions" className={styles.label}>
            Sessions
          </label>
          <input
            type="number"
            id="sessions"
            className={styles.input}
            value={sessionsCycle <= 0 || sessionsCycle > 32 ? '' : sessionsCycle}
            onChange={handleChangeSessions}
          />
        </div>
      </div>
    </div>
  )
}
