import { useLocation } from "react-router-dom";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./PartB.css";
import SmartPanel from "./SmartPanel";

function PartB() {
  const [disabled, setDisabled] = useState(false);
  const [Name, SetName] = useState("");
  const [Item, SetItem] = useState("");
  const [Quantity, SetQuantity] = useState(0);
  const [Rate, SetRate] = useState(0);
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  const formattedDate = `${dd}/${mm}/${yyyy}`;

  const generatePDF = () => {
    const input = document.getElementById("internal-table");

    if (!input) {
      alert("Invoice table not found");
      return;
    }

    html2canvas(input, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      // Add padding through html2canvas options
      onclone: function (clonedDoc) {
        const clonedElement = clonedDoc.getElementById("internal-table");
        if (clonedElement) {
          // Apply padding styles to the cloned element
          clonedElement.style.padding = "15px";
          clonedElement.style.boxSizing = "border-box";
        }
      },
    }).then((canvas) => {
      const imgWidth = 190; // A4 width minus left/right padding
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      // Add padding by positioning the image
      const leftPadding = 10;
      const topPadding = 15;

      pdf.addImage(
        imgData,
        "PNG",
        leftPadding,
        topPadding,
        imgWidth,
        imgHeight,
      );

      // Save the PDF
      const fileName = `Invoice_${Name || "Customer"}_${new Date().toISOString().split("T")[0]}.pdf`;
      pdf.save(fileName);
    });
  };
const sharePDFToWhatsApp = async () => {
  const input = document.getElementById("internal-table");

  if (!input) {
    alert("Invoice table not found");
    return;
  }

  try {
    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      onclone: function (clonedDoc) {
        const clonedElement = clonedDoc.getElementById("internal-table");
        if (clonedElement) {
          clonedElement.style.padding = "15px";
          clonedElement.style.boxSizing = "border-box";
        }
      },
    });

    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const leftPadding = 10;
    const topPadding = 15;

    pdf.addImage(imgData, "PNG", leftPadding, topPadding, imgWidth, imgHeight);

    // Get Blob instead of saving
    const blob = pdf.output("blob");
    const fileName = `Invoice_${Name || "Customer"}_${new Date().toISOString().split("T")[0]}.pdf`;
    const file = new File([blob], fileName, { type: "application/pdf" });

    // Try Web Share API first (mobile-friendly)
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: "Invoice PDF",
        files: [file],
      });
      return;
    }

    // Fallback: Download + WhatsApp Web link (works on desktop/mobile)
    const blobUrl = URL.createObjectURL(blob);
    
    // Trigger download
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Open WhatsApp Web with download instructions
    setTimeout(() => {
      window.open(
        `https://web.whatsapp.com/send?text=Here's your invoice PDF (check downloads): ${fileName}`,
        "_blank"
      );
    }, 500);

    // Cleanup
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Share failed:", error);
    alert("Failed to generate PDF for sharing");
  }
};



  const HandleInvoice = (e) => {
    e.preventDefault();
   
    if (Name != "" && Item != "" && Quantity != 0 && Rate != 0) {
       sessionStorage.setItem("PartB",JSON.stringify({
        BGrand:(Quantity*Rate)
      }))
      setDisabled(true);
    }else{
 console.log("failed");
    }
  };

  return (
    <>
      <div className="customer-invoice-container">
        <h3>Internal Invoice</h3>
        <div>
          <table id="internal-table">
            <thead>
            <tr>
              <th colSpan={5}>Invoice</th>
            </tr>
            <tr>
              <td colSpan={3}>
                Name: <br />
                <input
                  required
                  id="name"
                  disabled={disabled}
                  type="text"
                  placeholder="Enter Party name"
                  value={Name}
                  onChange={(e) => {
                    SetName(e.target.value);
                  }}
                />
              </td>
              <td colSpan={3}>
                Date: <br />
                {formattedDate}
              </td>
            </tr>
            <tr>
              <td colSpan={5}>
                Full Address:&nbsp;{"8-1/7/2 Hyderabad,500043"}
              </td>
            </tr>

            <tr>
              <th>Item Name</th>
              <th>Lot Id</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
            <tr className="items">
              <td>
                {" "}
                <input
                  disabled={disabled}
                  type="text"
                  placeholder="Enter product name"
                  value={Item}
                  onChange={(e) => {
                    SetItem(e.target.value);
                  }}
                />
              </td>
              <td>{"MRB21c"}</td>
              <td>
                {" "}
                <input
                  disabled={disabled}
                  required
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  min="0"
                  step="any"
                  value={Quantity}
                  onChange={(e) => {
                    SetQuantity(e.target.value);
                  }}
                />
              </td>
              <td>
                <input
                  disabled={disabled}
                  required
                  id="rate"
                  type="number"
                  placeholder="Enter rate per unit"
                  min="0"
                  step="any"
                  value={Rate}
                  onChange={(e) => {
                    SetRate(e.target.value);
                  }}
                />
              </td>
              <td>{Number(Quantity)*Number(Rate) || 0}</td>
            </tr>
            <tr className="final1">
              <td> </td>
              <td> </td>
              <td>Total: {Quantity || 0}</td>
              <td></td>
              <td>Total(Rs): {Number(Quantity )* Number(Rate)}</td>
            </tr>
           
            <tr>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>Grand Total</td>
              <td>{Number(Quantity )* Number(Rate) }</td>
            </tr></thead>
          </table>
        </div>
      </div>
      <div className="btns">
        <button onClick={HandleInvoice} className="btn-pdf" type="submit">
     
          Submit
        </button>
        <button onClick={generatePDF} className="btn-pdf">
          Download PDF
        </button>
         <button onClick={sharePDFToWhatsApp } className="btn-pdf">
         Share 
        </button>
      </div>

    <SmartPanel/>
    </>
  
  );
}

export default PartB;