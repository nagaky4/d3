import React from 'react';
import './App.css';
import HorizontalBarChart from './components/BarChart/HorizontalBarChart';
import VerticalBarChart from './components/BarChart/VerticalBarChart';

function App() {

  const data = [
    { name: "A", value: 49 },
    { name: "B", value: 104 },
    { name: "C", value: 159 },
    { name: "D", value: 323 },
    { name: "E", value: 513 },
    { name: "F", value: 256 },
    { name: "G", value: 173 },
    { name: "H", value: 345 },
    { name: "I", value: 513 },
    { name: "K", value: 642 },
    { name: "M", value: 334 }
  ]

  return (
    <div className="App">
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-6">
            <HorizontalBarChart data={[49, 104, 159, 323, 513, 256, 173, 345, 513, 642, 334]} />
          </div>

          <div className="col-sm-6">
            <VerticalBarChart data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
