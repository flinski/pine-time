import { useAppDispatch, useAppState } from '@/contexts/AppContext'
import BackIcon from '@/components/icons/BackIcon'
import styles from './Settings.module.scss'
import { secsToMins } from '@/utils/helpers'

export default function Settings() {
  const { focusTime, breakTime, restTime } = useAppState()
  const dispatch = useAppDispatch()

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
            type="text"
            id="focus"
            className={styles.input}
            value={secsToMins(focusTime)}
            onChange={(event) => handleChangeTime(event, 'focus')}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="break" className={styles.label}>
            Break
          </label>
          <input
            type="text"
            id="break"
            className={styles.input}
            value={secsToMins(breakTime)}
            onChange={(event) => handleChangeTime(event, 'break')}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="rest" className={styles.label}>
            Rest
          </label>
          <input
            type="text"
            id="rest"
            className={styles.input}
            value={secsToMins(restTime)}
            onChange={(event) => handleChangeTime(event, 'rest')}
          />
        </div>
      </div>
    </div>
  )
}
