import NextIcon from '@/components/icons/NextIcon'
// import PlayIcon from '@/components/icons/PlayIcon'
import ResetIcon from '@/components/icons/ResetIcon'
import styles from './Controls.module.scss'
import PauseIcon from '../icons/PauseIcon'

export default function Controls() {
  return (
    <div className={styles.controls}>
      <button className={styles.resetButton}>
        <ResetIcon />
      </button>
      <button className={styles.playPauseButton}>
        <PauseIcon />
      </button>
      <button className={styles.nextButton}>
        <NextIcon />
      </button>
    </div>
  )
}
