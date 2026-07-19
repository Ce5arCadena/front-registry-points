import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// strict mode comentado a proposito, ya que usé en los estados el ... para propagar y en paginación y me produce estados dobles.
// Se puede arreglar con un ref que verifique las llamadas del componente al inicio y solo se haga una vez.
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)
