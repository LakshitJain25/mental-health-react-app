import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css';
import ChatPage from './pages/ChatPage/ChatPage';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <header className='header'>
          <span className="logo">HAPPIFY</span>
          <ul className="navbar">
            <li className="navbar-item"><Link to={"/"}>Home</Link></li>
            <li className="navbar-item"><Link to={"/test"}>Test</Link></li>
            <li className="navbar-item"><Link to={"/"}>Tips</Link></li>
            <li className="navbar-item"><Link to={"/"}>Contact Us</Link></li>
          </ul>
        </header>
        <div className="grid-container">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/test' element={<ChatPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
