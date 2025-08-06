import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';

// Pages
import Home from './pages/Home';
import LoginPage from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <MovieProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Router>
    </MovieProvider>
  );
}

export default App;
