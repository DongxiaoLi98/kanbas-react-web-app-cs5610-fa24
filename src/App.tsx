import React from 'react';
import Kanbas from './Kanbas';
//import './App.css';
import Labs from './Labs';
import { HashRouter, Link, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <div>
        <Link to="/Labs">Labs</Link> | <Link to="/Kanbas">Kanbas</Link>
        <Routes> 
          <Route path="/" element={<Navigate to="Labs" />} />
          <Route path="/Labs/*" element={<Labs />}/>
          <Route path="/Kanbas/*" element={<Kanbas />}/>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
