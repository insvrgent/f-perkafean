import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import isAuthenticated from './authCheck.js';

function Scan() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      const res = await isAuthenticated();
      if(!res.success) navigate('/login');
    }

    checkAuth();
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default Scan;
