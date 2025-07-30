import { AppProvider } from '@/contexts/AppContext'
import Widget from '@/components/Widget'
import styles from './App.module.scss'

export default function App() {
  return (
    <AppProvider>
      <div className={styles.app}>
        <Widget />
      </div>
    </AppProvider>
  )
}
