import React from "react";
import "./App.css";
import HorizontalBarChart from "./components/BarChart/HorizontalBarChart";
import VerticalBarChart from "./components/BarChart/VerticalBarChart";
import Circle from "./components/Circle/Circle";
import LineChart from "./components/Line/LineChart";

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
  ];

  return (
    <div className="App">
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-6">
            <HorizontalBarChart data={data} />
          </div>

          <div className="col-sm-6">
            <VerticalBarChart data={data} />
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-sm-6">
        </div>
        <div className="col-sm-6">
          <LineChart data={data} />
        </div>
      </div>
      <div className="row mt-5"></div>
    </div>
  );
}

export default App;
