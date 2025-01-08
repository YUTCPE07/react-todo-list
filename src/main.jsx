import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import '/src/index.css'
import HomePage from './pages/HomePage.jsx'
import EditTodoListPage from './pages/EditTodoListPage.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import AboutPage from './pages/AboutPage.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <div className="mainPage">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/todo/edit/:id" element={<EditTodoListPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
