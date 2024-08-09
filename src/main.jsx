import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GetSheet from './pages/GetSheet.jsx'
import Header from './components/Header.jsx'
import NotFound from './components/NotFound.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <NotFound/>
  },
  {
    path: "/obtener-lamina",
    element: <GetSheet/>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
      {/* <App /> */}
    {/* </Router> */}
  </StrictMode>,
)
