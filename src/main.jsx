import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import Projects from './pages/Projects.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import StackProof from './pages/projects-pages/StackProof.jsx';
import WanderMind from './pages/projects-pages/WanderMind.jsx';
import FintechSystem from './pages/projects-pages/FintechSystem.jsx';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/projects', element: <Projects /> },
  { path: '/projects/stackproof', element: <StackProof /> },
  { path: '/projects/wandermind', element: <WanderMind /> },
  { path: '/projects/fintech-system', element: <FintechSystem /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
