import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export default function SmartPanel() {
  const [partA, setPartA] = useState(null);
  const [partB, setPartB] = useState(null);

  useEffect(() => {
    setPartA(JSON.parse(sessionStorage.getItem("PartA")));
    setPartB(JSON.parse(sessionStorage.getItem("PartB")));
  },[sessionStorage]);

  const ClearAll = () => {
    sessionStorage.removeItem("PartA");
    sessionStorage.removeItem("PartB");
    setPartA(null);
    setPartB(null);
  };
  const generatePDF = () => {
  const table1 = document.getElementById("invoice-table");
  const table2 = document.getElementById("internal-table");

  if (!table1 || !table2) {
    alert("Invoice tables not found");
    return;
  }

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = 190;
  const leftPadding = 10;
  const topPadding = 15;

  // Function to capture and add a table to PDF
  const addTableToPDF = (tableElement, isFirstTable = true) => {
    return new Promise((resolve) => {
      // Create a container for the table
      const container = document.createElement("div");
      container.style.backgroundColor = "#ffffff";
      container.style.padding = "15px";
      container.style.boxSizing = "border-box";
      
      const tableClone = tableElement.cloneNode(true);
      container.appendChild(tableClone);
      
      container.style.position = "absolute";
      container.style.left = "-9999px";
      document.body.appendChild(container);

      html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff"
      }).then((canvas) => {
        document.body.removeChild(container);
        
        const imgHeight = (canvas.height * pageWidth) / canvas.width;
        const imgData = canvas.toDataURL("image/png");
        
        if (!isFirstTable) {
          pdf.addPage();
        }
        
        pdf.addImage(
          imgData,
          "PNG",
          leftPadding,
          topPadding,
          pageWidth,
          imgHeight
        );
        
        resolve();
      });
    });
  };

  // Add tables sequentially
  addTableToPDF(table1, true)
    .then(() => addTableToPDF(table2, false))
    .then(() => {
      // Save the PDF
      const fileName = `Invoice_${ "Mergedinvoice"}_${new Date().toISOString().split("T")[0]}.pdf`;
      pdf.save(fileName);
    })
    .catch((error) => {
      console.error("Error generating PDF:", error);
    });
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
        <button className="btn-pdf"  onClick={generatePDF}>Download merged invoice</button>
    </div>
    </div>
  );
}