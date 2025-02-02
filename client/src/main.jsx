import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from './components/ui/sonner.jsx'
import { SocketProvider } from './context/SocketContext.jsx'
import { BrowserRouter } from 'react-router-dom'



createRoot(document.getElementById('root')).render(
  <SocketProvider>
   <BrowserRouter>
    <App />
    <Toaster closeButton/>
   </BrowserRouter>
    
  </SocketProvider>
)
