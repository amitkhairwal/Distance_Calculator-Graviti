import React from 'react';
import './App.css';
import DistanceCalculator from './components/DistanceCalculator';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <DistanceCalculator />
    </div>
  );
}

export default App;
