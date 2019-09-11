import React from 'react';
import './App.css';
import BarChart from './components/BarChart';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row mt-5">
          <BarChart data={[49, 104, 159, 323, 513, 256, 173, 345, 513, 642, 334]} size={[500, 500]} />
        </div>
      </div>
    </div>
  );
}

export default App;
