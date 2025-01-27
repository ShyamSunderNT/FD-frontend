import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.css'
import App from './App.jsx'
import { CartProvider } from './components/ContextReducer.jsx';

createRoot(document.getElementById('root')).render(
  <CartProvider>
    <App />
  </CartProvider>
    
 
)
