import { useAppDispatch } from '@/contexts/AppContext'
import SettingsIcon from '@/components/icons/SettingsIcon'
import TreeIcon from '@/components/icons/TreeIcon'
import styles from './Panel.module.scss'

export default function Panel() {
  const dispatch = useAppDispatch()

  const handleOpenSettings = () => {
    dispatch({ type: 'settings/open' })
  }

  return (
    <div className={styles.panel}>
      <div className={styles.logo}>
        <TreeIcon />
        <span>PineTime</span>
      </div>
      <button className={styles.settingsButton} onClick={handleOpenSettings}>
        <SettingsIcon />
      </button>
    </div>
  )
}
