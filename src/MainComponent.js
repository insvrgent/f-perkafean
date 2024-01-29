// MainComponent.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import Scan from './Scan';
import TableComponent from './TableComponent'; // Import the updated TableComponent
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const MainComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/scan/:table_id" element={<TableComponent />} />
      </Routes>
    </Router>
  );
};

export default MainComponent;