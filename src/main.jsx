import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router";
import './index.css'
import './library/fontawsomeLibrary.js'
import HomePage from './pages/HomePage.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import AboutPage from './pages/AboutPage.jsx'
import TodoDetailPage from './pages/TodoDetailPage.jsx';

const AppLayout = () => {
  const location = useLocation();
  const isAboutClass = (location.pathname==='/about')?'bg-color-1':'';
  return (
  <>
    <Header />
    <div className={`mainPage xl:px-20 py-3 ${isAboutClass}`} >
      <Outlet />
    </div>
    <Footer />
  </>
)}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />} >
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/todo/detail/:id" element={<TodoDetailPage />} />
          </Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>
)
