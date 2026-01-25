import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./PartB.css";
import SmartPanel from "./SmartPanel";

function PartB({Extra,Amount,Quantity,Rate,Transport,Labour,StandAdv,GST,Grand ,Name, Date,Address,SalesMan,Item,Lot,Pcs,Designer,}) {

const GetGrand=()=>{
    if(Extra<1){
        return Grand;
    }else{
      let amt=Number(Extra);
      amt=(amt/0.18).toFixed(2);
        return Number(amt)+Number(CalculateGst());
    }
}
const MainGrand=()=>{
  if(Extra<1){
    return GetGrand();
  }
  let amt=Amt();
  return amt+Number(Transport)+Number(Labour);
}
const CalculateGst=()=>{
    if(Extra<1){
       return GST;
    }else{ return Number(Extra).toFixed(2);}    
}
    const Amt=()=>{
        if(Extra<1){
               return Amount;
        }else{
            return Math.abs(GetGrand()-Grand)-Number(Transport)-Number(Labour);
        }
    }
    const CalRate=()=>{
        if(Extra<1){
               return Number(Rate);
        }else{
            const amt=Amt();
            return Number(amt/Quantity);
        }
    }  
    const formatForDisplay = (yyyymmdd) => {
  const [yyyy, mm, dd] = yyyymmdd.split("-");
  return `${dd}-${mm}-${yyyy}`; 
};
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
      <div>
        <h3>Internal Invoice</h3>
              <table id="internal-table">
                <thead>
            <tr>
              <th colSpan={6}>Invoice</th>
            </tr>
            <tr>
              <td colSpan={3}>
               <b>Name:</b> <br />
                {Name}
              </td>
              <td colSpan={3}>
                <b>Date</b> <br />
                 {formatForDisplay(Date)}
              </td>
            </tr>
            <tr>
              <td colSpan={6}>
               <b>Full Address:</b>&nbsp; {Address}
              </td>
            </tr>
   <tr>
              <td colSpan={3}>
                Sales Man Reff: <br />
                {SalesMan}
              </td>
              <td colSpan={3}>
                Arc / Interior Designer  <br />
                 {Designer}
              </td>
            </tr>
            <tr>
              <th>Description</th>

              <th>Lot Id</th>
              <th>No.of Pc</th>
              <th>Qty (sqft)</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
            <tr className="items">
              <td>
                {Item}
              </td>
              <td> {Lot}</td>
                     <td> {Pcs}</td>
              <td>
                
                {Quantity}
              </td>
              <td>
               {CalRate().toFixed(2)}
              </td>
              <td>{Amt()}</td>
            </tr>
            <tr className="final1">
              <td> </td>
              <td> </td>

              <td>Total: { Number(Pcs)}</td>
              <td>Total: {Number(Quantity).toFixed(2)}</td>
              <td></td>
            <td></td>
            </tr>
           {Transport &&  (<>
            <tr>
              <td> </td>
              <td> </td>
              
              <td> </td>
              <td> </td>
              <td>Transport</td>
              <td> {Transport || 0}</td>
            </tr></>)}
           {(Labour>1)  && (<><tr>
              <td> </td>
              <td> </td>
              
              <td> </td>
              <td> </td>
              <td>Labour</td>
              <td>{Labour || 0}</td>
            </tr></>)}
            {(StandAdv>1) && (<><tr>
              <td> </td>
              <td> </td>
              
              <td> </td>
              <td> </td>
              <td>Stand Adv</td>
              <td> {StandAdv || 0}</td>
            </tr></>)}
            <tr>
              <td> </td>
              <td> </td>
              
              <td> </td>
              <td> </td>
              <td>GST (18%)</td>
              <td>{CalculateGst()}</td>
            </tr>
            <tr>
              <td> </td>
              <td> </td>
              
              <td> </td>
              <td> </td>
              <td>Grand Total</td>
              <td>{ MainGrand()}</td>
            </tr></thead>
          </table>
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