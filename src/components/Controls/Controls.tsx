import { useAppDispatch, useAppState } from '@/contexts/AppContext'
import NextIcon from '@/components/icons/NextIcon'
import PlayIcon from '@/components/icons/PlayIcon'
import PauseIcon from '@/components/icons/PauseIcon'
import ResetIcon from '@/components/icons/ResetIcon'
import styles from './Controls.module.scss'

export default function Controls() {
  const { isActive } = useAppState()
  const dispatch = useAppDispatch()

  const handleResetTimer = () => {
    dispatch({ type: 'timer/reset' })
  }

  const handleToggleTimer = () => {
    dispatch({ type: 'timer/toggle' })
  }

  const handleNextSession = () => {}

  return (
    <div className={styles.controls}>
      <button className={styles.resetButton} onClick={handleResetTimer}>
        <ResetIcon />
      </button>
      <button className={styles.playPauseButton} onClick={handleToggleTimer}>
        {isActive ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button className={styles.nextButton} onClick={handleNextSession}>
        <NextIcon />
      </button>
    </div>
  )
}
