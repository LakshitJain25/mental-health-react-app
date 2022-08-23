import { Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css';
import ChatPage from './pages/ChatPage/ChatPage';
import HomePage from './pages/HomePage/HomePage';
import { AnimatePresence, motion } from 'framer-motion'
import Analytics from './pages/Analytics/Analytics';
import { useEffect, useRef } from 'react';
import { curveText } from 'curvetext'
import ArcText from 'arc-text'
import Tips from './pages/Tips/Tips';

function App() {
  const location = useLocation()
  const pageVariants = {
    in: {
      opacity: 1,
      x: 0,
      rotate: "0deg",
      transition: {
        duration: 0.6
      }

    },
    out: {
      opacity: 0,
      x: "-100%",
      // rotate: "200deg",
      transition: {
        duration: 0.6
      }
    }
  }

  const pageTransition = {
    type: "tween",
    ease: "linear"
  }


  return (
    // <BrowserRouter>
    <div className="container">
      <header className='header'>
        <span className="logo"><Link to="/" style={{ textDecoration: "none" }}>HAPPIFY</Link></span>
        <ul className="navbar">
          <li className="navbar-item"><Link to={"/"}>Home</Link></li>
          <li className="navbar-item"><Link to={"/test"}>Test</Link></li>
          <li className="navbar-item"><Link to={"/tips"}>Tips</Link></li>
          <li className="navbar-item"><Link to={"/"}>Contact Us</Link></li>
        </ul>
      </header>
      <div className="grid-container">
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<HomePage variants={pageVariants} />} />
            <Route path='/test' element={<ChatPage variants={pageVariants} transition={pageTransition} />} />
            <Route path='/tips' element={<Tips variants={pageVariants} transition={pageTransition} />} />
            <Route path='/analytics' element={<Analytics variants={pageVariants} transition={pageTransition} />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
    // </BrowserRouter>

  );
}

export default App;
