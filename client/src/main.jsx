import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import {AuthProvider} from './components/context/Context'
import 'antd/dist/reset.css'
import { Cartprovider } from './components/context/Cart.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Cartprovider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Cartprovider>
  </AuthProvider>
)
