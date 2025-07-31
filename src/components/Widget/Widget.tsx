import { useAppState } from '@/contexts/AppContext'
import Panel from '@/components/Panel'
import Timer from '@/components/Timer'
import Controls from '@/components/Controls'
import Settings from '@/components/Settings'
import styles from './Widget.module.scss'

export default function Widget() {
  const { areSettingsOpen } = useAppState()

  return (
    <div className={styles.widget}>
      {areSettingsOpen ? (
        <Settings />
      ) : (
        <>
          <Panel />
          <Timer />
          <Controls />
        </>
      )}
    </div>
  )
}
