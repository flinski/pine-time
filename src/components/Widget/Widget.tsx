import Panel from '@/components/Panel'
import Timer from '@/components/Timer'
import Controls from '@/components/Controls'
import styles from './Widget.module.scss'

export default function Widget() {
  return (
    <div className={styles.widget}>
      <Panel />
      <Timer />
      <Controls />
    </div>
  )
}
