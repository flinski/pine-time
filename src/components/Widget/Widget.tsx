import Controls from '@/components/Controls'
import Timer from '@/components/Timer'
import styles from './Widget.module.scss'

export default function Widget() {
  return (
    <div className={styles.widget}>
      <Timer />
      <Controls />
    </div>
  )
}
