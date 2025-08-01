import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/components/App'
import '@/styles/index.scss'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
