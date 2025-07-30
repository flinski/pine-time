import { useAppDispatch, useAppState } from '@/contexts/AppContext'
import NextIcon from '@/components/icons/NextIcon'
import PlayIcon from '@/components/icons/PlayIcon'
import PauseIcon from '@/components/icons/PauseIcon'
import ResetIcon from '@/components/icons/ResetIcon'
import styles from './Controls.module.scss'

export default function Controls() {
  const { isActive } = useAppState()
  const dispatch = useAppDispatch()

  const handleToggleTimer = () => {
    dispatch({ type: 'timer/toggle' })
    dispatch({ type: 'timer/decrease' })
  }

  return (
    <div className={styles.controls}>
      <button className={styles.resetButton}>
        <ResetIcon />
      </button>
      <button className={styles.playPauseButton} onClick={handleToggleTimer}>
        {isActive ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button className={styles.nextButton}>
        <NextIcon />
      </button>
    </div>
  )
}
