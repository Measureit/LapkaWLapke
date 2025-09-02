import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import Navbar from './components/Navbar.tsx';
import HomePage from './pages/HomePage.tsx';
import BlogPage from './pages/BlogPage.tsx';
import ShopPage from './pages/ShopPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import Footer from './components/Footer.tsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/sklep" element={<ShopPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
