import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/home/Home';
import OtherPage from './views/other/OtherPage';
import AddPage from './views/add/AddPage'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/other/" element={<OtherPage />} />
        <Route path="/add/" element={<AddPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;