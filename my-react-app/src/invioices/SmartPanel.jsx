import { useState, useEffect } from "react";

export default function SmartPanel() {
  const [partA, setPartA] = useState(null);
  const [partB, setPartB] = useState(null);

  useEffect(() => {
    setPartA(JSON.parse(sessionStorage.getItem("PartA")));
    setPartB(JSON.parse(sessionStorage.getItem("PartB")));
  });

  const ClearAll = () => {
    sessionStorage.removeItem("PartA");
    sessionStorage.removeItem("PartB");
    setPartA(null);
    setPartB(null);
  };

  return (
    <div>
      <div className="pannel">
        <div className="analytics">
          <h4>Part A</h4>
          <br />
          <p>₹ {partA?.AGrand || 0} /-</p>
        </div>

        <div className="analytics">
          <h4>Part B</h4>
          <br />
          <p>₹ {partB?.BGrand || 0} /-</p>
        </div>

        <div className="analytics">
          <h4>Total</h4>
          <br />
          <p>₹ {(partA?.AGrand || 0) + (partB?.BGrand || 0)} /-</p>
        </div>
      </div>
<div className="clear">
      <button className="btn-pdf"  onClick={ClearAll}>Clear Dashboard</button>
    </div>
    </div>
  );
}
