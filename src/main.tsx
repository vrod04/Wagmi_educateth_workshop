import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppKitProvider } from './WalletContext.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppKitProvider>
      <App />
    </AppKitProvider>
  </StrictMode >,
)
