import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './views/home/Home';
import './App.css';
import Header from './components/Header';
import About from './views/about/About';
import { AuthProvider } from './context/AuthContext';
import SignUp from './views/signup/SignUp';
import Login from './views/login/Login';
import Profile from './views/profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;