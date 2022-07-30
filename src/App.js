import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import ChatPage from './pages/ChatPage/ChatPage';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <header></header>
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
