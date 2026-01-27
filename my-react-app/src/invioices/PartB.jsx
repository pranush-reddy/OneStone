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

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.style.width = '794px';
    wrapper.style.margin = '0 auto';
    wrapper.style.padding = '20px';
    wrapper.style.boxSizing = 'border-box';
    wrapper.style.background = '#ffffff';
    wrapper.style.position = 'absolute';
    wrapper.style.left = '-9999px';
    wrapper.style.top = '0';

    // Clone and append content
    const content = input.cloneNode(true);
    wrapper.appendChild(content);

    // Apply styles
    wrapper.style.fontFamily = 'Arial, sans-serif';
    wrapper.style.lineHeight = '1.5';

    // Style the table (FIXED)
    const table = wrapper.querySelector('#internal-table');
    if (table) {
      table.style.width = '100%';
      table.style.borderCollapse = 'collapse';
      table.style.boxSizing = 'border-box';
      table.style.margin = '10px 0';
      table.style.transform = 'none';
    }

    // Style table cells
    const cells = wrapper.querySelectorAll('td, th');
    cells.forEach(cell => {
      cell.style.border = '1px solid #000000';
      cell.style.padding = '8px';
      cell.style.textAlign = 'left';
    });

    // Style inputs
    const inputs = wrapper.querySelectorAll('input');
    inputs.forEach(input => {
      input.style.border = '1px solid #ffffff';
      input.style.padding = '4px';
      input.style.background = '#f9f9f9';
      input.style.width = '100%';
      input.style.boxSizing = 'border-box';
    });

    // Hide select elements (FIXED)
    const selects = wrapper.querySelectorAll('select');
    selects.forEach(select => {
      select.style.display = 'none';
    });

    // Add to document
    document.body.appendChild(wrapper);

    // Generate PDF
    html2canvas(wrapper, {
      scale: 1,
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff',
      width: 794,
      height: wrapper.scrollHeight,
      windowWidth: 794,
      onclone: (clonedDoc, element) => {
        element.style.background = '#ffffff';
        element.style.position = 'relative';
        element.style.left = '0';
        element.style.opacity = '1';

        const clonedTables = element.querySelectorAll('table');
        clonedTables.forEach(table => {
          table.style.border = '1px solid #000';
        });
      }
    }).then((canvas) => {
      document.body.removeChild(wrapper);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight) * 0.95;

      pdf.addImage(imgData, "PNG",
        (pdfWidth - imgWidth * ratio) / 2,
        10,
        imgWidth * ratio,
        imgHeight * ratio
      );

       const fileName2 = `Invoice_${new globalThis.Date().toISOString().split("T")[0]}.pdf`;
      pdf.save(fileName2);

    }).catch(error => {
      console.error("PDF generation error:", error);
      if (document.body.contains(wrapper)) {
        document.body.removeChild(wrapper);
      }
    });
  };
const shareToWhatsAppDesktop = async () => {
    const mainGrandValue= MainGrand();
  // Open WhatsApp Web
  const message = encodeURIComponent(
    "We've a new Internal invoice!!\n"+
    `Date: ${Date}\n`+`Amount:${mainGrandValue}\n`+
    `On Item : ${Item}`
  );
  
  window.open(`https://web.whatsapp.com/send?text=${message}`, "_blank");
  
  URL.revokeObjectURL(url);
}


  return (
    <>
      <div>
        <h3>Internal Invoice</h3>
              <table id="internal-table">
                <tbody>
            <tr>
              <th style={{backgroundColor:'#e7e7e7'}} colSpan={7}>Invoice</th>
            </tr>
            <tr>
              <td colSpan={4}>
               Name : &nbsp;
                {Name}
              </td>
              <td colSpan={3}>
                Date : &nbsp;
                 {formatForDisplay(Date)}
              </td>
            </tr>
            <tr>
              <td colSpan={7}>
               Full Address:&nbsp; {Address}
              </td>
            </tr>
   <tr>
              <td colSpan={4}>
                Sales Man Reff: 
                {SalesMan}
              </td>
              <td colSpan={3}>
                Arc / Interior Designer  
                 {Designer}
              </td>
            </tr>
            <tr className="make-center">
              <td >SNo</td>
              <td>Description</td>
              <td>Lot Id</td>
              <td>No.of Pc</td>
              <td>Qty (sqft)</td>
              <td>Rate</td>
              <td>Amount</td>
            </tr>
            <tr className="items">
              <td>1</td>
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
            <tr className="items">
              <td>2</td>
              <td>
              </td>
              <td> </td>
                     <td> </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="items">
              <td>3</td>
              <td>
              </td>
              <td> </td>
                     <td> </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="items">
              <td>4</td>
              <td>
              </td>
              <td> </td>
                     <td> </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="items">
              <td>5</td>
              <td>
              </td>
              <td> </td>
                     <td> </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            
           {Transport &&  (<>
            <tr>
              <td> </td>
              <td></td>
              <td> </td>
              
              <td> </td>
              <td> </td>
              <td>Transport</td>
              <td> {Transport || 0}</td>
            </tr></>)}
           {(Labour>1)  && (<><tr>
              <td> </td>
              <td> </td>
               <td></td>
              <td> </td>
              <td> </td>
              <td>Labour</td>
              <td>{Labour || 0}</td>
            </tr></>)}
            {(StandAdv>1) && (<><tr>
              <td> </td>
              <td> </td>
               <td></td>
              <td> </td>
              <td> </td>
              <td>Stand Adv</td>
              <td> {StandAdv || 0}</td>
            </tr></>)}
            <tr>
              <td> </td>
              <td> </td>
               <td></td>
              <td> </td>
              <td> </td>
              <td>GST (18%)</td>
              <td>{CalculateGst()}</td>
            </tr>
            <tr>
              <td> </td>
              <td> </td>
               <td></td>
              <td> </td>
              <td> </td>
              <td>Grand Total</td>
              <td>{ MainGrand()}</td>
            </tr></tbody>
          </table>
    </div>
      <div className="btns">
      
        <button onClick={generatePDF} className="btn-pdf">
          Download PDF
        </button>
         <button onClick={shareToWhatsAppDesktop } className="btn-pdf">
         Share 
        </button>
      </div>

    </>
  
  );
}

export default PartB;