import styles from './Timer.module.scss'

export default function Timer() {
  return (
    <div className={styles.timer}>
      <div className={styles.info}>
        <div className={styles.title}>Focus</div>
        <div className={styles.countdown}>25 00</div>
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
          transform="rotate(-90 100 100)"
        />
      </svg>
    </div>
  )
}
