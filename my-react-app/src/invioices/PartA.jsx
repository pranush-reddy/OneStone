import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Nav from "../Nav";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PartB from "./PartB";
import "./PartA.css";
import Govr from "./Govr";
import PartASec from "./PartASec";

function PartA( ) {
    const location = useLocation();
const data = location.state || {};

useEffect(()=>{
  // Access table data
console.log(data)
},[data]);
  const [disabled, setDisabled] = useState(false);

  const [Item, SetItem] = useState("");
  const [Quantity, SetQuantity] = useState("");
  const [Rate, SetRate] = useState("");
  const [SaveStatus,SetSaveStatus]=useState("Save Invoice")
  const [Transport, SetTransport] = useState("");
  const [Labour, SetLabour] = useState("");
  const [StandAdv, SetStandAdv] = useState("");

  const [Extra, SetExtra] = useState("");
const [isSubmitted,SetSubmitted]=useState(false);
  const [SelectDate, SetDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today; // e.g., "2026-01-25"
  });
  const [rates, setRates] = useState({});

  // Initialize rates from rows[0].rate
  useEffect(() => {
    if (data.items) {
      const initialRates = {};
      data.items.forEach(item => {
        // Get rate from first row if exists
        initialRates[item.id] = item.rows?.[0]?.rate || '';
      });
      setRates(initialRates);
    }
  }, [data.items]);

  const handleRateChange = (itemId, value) => {
    setRates(prev => ({
      ...prev,
      [itemId]: value
    }));
   
  };

  const formatDateToYMD = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${day}-${month}-${year}`;
};
  // const subtotal =
  //   Number(amount) +
  //   Number(props.Transport) +
  //   Number(props.Labour) +
  //   Number(props.StandAdv);

const generatePDF = () => {
  const input = document.querySelector(".invoice");

  if (!input) {
    alert("Invoice table not found");
    return;
  }

  // Create wrapper
  const wrapper = document.createElement('div');
  wrapper.style.width = '794px'; // A4 width in pixels
  wrapper.style.margin = '0 auto';
  wrapper.style.padding = '20px';
  wrapper.style.boxSizing = 'border-box';
  wrapper.style.background = '#ffffff';
  
  // Position it off-screen instead of using opacity/fixed
  wrapper.style.position = 'absolute';
  wrapper.style.left = '-9999px';
  wrapper.style.top = '0';
  
  // Clone and append content
  const content = input.cloneNode(true);
  wrapper.appendChild(content);
  
  // Apply styles to make it print-friendly
  wrapper.style.fontFamily = 'Arial, sans-serif';
  wrapper.style.lineHeight = '1.5';
  
  // Style tables - FIX: Use correct selector
  const tables = wrapper.querySelectorAll('table');
  tables.forEach(table => {
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.boxSizing = 'border-box';
    table.style.margin = '10px 0';
    // Remove the transform scale if present
    if (table.style.transform) {
      table.style.transform = 'none';
    }
  });
  
  // Style table cells for better visibility
  const cells = wrapper.querySelectorAll('td, th');
  cells.forEach(cell => {
    cell.style.border = '1px solid #ddd';
    cell.style.padding = '8px';
    cell.style.textAlign = 'left';
  });
  
  // Style inputs
  const inputs = wrapper.querySelectorAll('input');
  inputs.forEach(input => {
    input.style.border = '1px solid #ccc';
    input.style.padding = '4px';
    input.style.background = '#f9f9f9';
    input.style.width = '100%';
    input.style.boxSizing = 'border-box';
    // Remove readonly if you want to capture input values
    input.removeAttribute('readonly');
  });
  
  // Add to document
  document.body.appendChild(wrapper);

  // Generate PDF
  html2canvas(wrapper, {
    scale: 1, // Increase scale for better quality
    useCORS: true,
    logging: true,
    backgroundColor: '#ffffff',
    width: 794,
    height: wrapper.scrollHeight,
    windowWidth: 794,
    onclone: (clonedDoc, element) => {
      // Make sure everything is visible in clone
      element.style.background = '#ffffff';
      element.style.position = 'relative';
      element.style.left = '0';
      element.style.opacity = '1';
      
      // Force table borders to be visible
      const clonedTables = element.querySelectorAll('table');
      clonedTables.forEach(table => {
        table.style.border = '1px solid #000';
      });
    }
  }).then((canvas) => {
    // Remove wrapper
    document.body.removeChild(wrapper);
    
    // Create PDF
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate dimensions to fit the page
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight) * 0.95;
    
    pdf.addImage(imgData, "PNG", 
      (pdfWidth - imgWidth * ratio) / 2, // Center horizontally
      10, // Start from top
      imgWidth * ratio, 
      imgHeight * ratio
    );
    
    // Save PDF
    const fileName = `Invoice_${new Date().toISOString().split("T")[0]}.pdf`;
    pdf.save(fileName);
    
  }).catch(error => {
    console.error("PDF generation error:", error);
    // Clean up
    if (document.body.contains(wrapper)) {
      document.body.removeChild(wrapper);
    }
  });
};
const shareToWhatsAppDesktop = async () => {
    const mainGrandValue=FindGrand();
  // Open WhatsApp Web
  const message = encodeURIComponent(
    "We've a new Quotation!!\n"+
    `Date: ${SelectDate}\n`+`Amount:${mainGrandValue}\n`+
    `On Item : ${Item}`
  );
  
  window.open(`https://web.whatsapp.com/send?text=${message}`, "_blank");
  
  URL.revokeObjectURL(url);
}

  const HandleInvoice = (e) => {
    e.preventDefault();
    if (Name != "" && Item != "" && Quantity != 0 && Rate != 0) {
  let ind = 1;
  SetSaveStatus("processing...")

// Get or initialize index
if(sessionStorage.getItem("index")){
  ind = parseInt(sessionStorage.getItem("index"));
} else {
  sessionStorage.setItem("index", "1");
}

// Generate invoice number
const invoiceNumber = `INV-2026-${String(ind).padStart(3, '0')}`;

// Get existing invoices or initialize empty object
let allInvoices = {};
if(sessionStorage.getItem("InvoiceDetails")) {
  allInvoices = JSON.parse(sessionStorage.getItem("InvoiceDetails"));
}

// Add new invoice to the hashmap
allInvoices[invoiceNumber] = {
  Name: Name,
  No: invoiceNumber,
  Date: SelectDate,
  Grand:FindGrand().toFixed(2),
  Dispatch1: Number(AGrand()).toFixed(2),
  Dispatch2: BsecGrand().toFixed(2)
};
SetSaveStatus("Saved!!")
// Save updated invoices back to sessionStorage
sessionStorage.setItem("InvoiceDetails", JSON.stringify(allInvoices));

ind = ind + 1;
sessionStorage.setItem("index", ind.toString());

console.log(`Invoice saved: ${invoiceNumber}`);
      setDisabled(true);
    }
  };

const GetGrand=()=>{
    if(Extra<1){
        return FindGrand();
    }else{
      let amt=Number(Extra);
      amt=(amt/0.18).toFixed(2);
        return Number(amt)+Number(CalculateGst());
    }
}
const BsecGrand=()=>{
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
            return Math.abs(GetGrand()-FindGrand())-Number(Transport)-Number(Labour);
        }
    }

  const CalTotal = () => {
    return (Number(Quantity) * Number(Rate)).toFixed(2) || 0;
  };
  const AGrand=()=>{
    if(Extra<1){
        return Number(GetGrand()).toFixed(2);
    }else{
        return Number(AAmt())+Number(AGst());
    }
}
const AGst=()=>{
    if(Extra<1){
       return GetGst();
    }else{ return Number(Extra).toFixed(2);}    
}
    const AAmt=()=>{
        if(Extra<1){
               return Amount;
        }else{
            
            let amt=Number(Extra);
            return (amt/0.18).toFixed(2);
        }
    }
  const FindGrand = () => {
    let grand = 0;
    const subtotal = CalSub();
    if (Extra < 1) {
      grand += subtotal;
      grand += (subtotal * 18) / 100;
    } else {
      grand += subtotal + Number(Extra);
    }
    return Number(grand);
  };
  const CalSub = () => {
    return (
      CalTotAmt()+
      Number(Quantity) * Number(Rate) +
      Number(Transport) +
      Number(Labour) +
      Number(StandAdv)
    );
  };
  const GetGst = () => {
    if(Extra<1){
       let sub = CalSub();
    sub = (sub * 18) / 100;
    return sub.toFixed(2);
    }return ''
   
  };
const downloadAllTablesAsPDF = async () => {
  try {
    // 1. Get all tables
    const invoiceTable = document.getElementById("invoice-table");
    const section2 = document.querySelector("div.section2");
    const gstTable = document.getElementById("gst-table");
    const internalTable = document.getElementById("internal-table");
    
    if (!invoiceTable) {
      alert("Invoice table not found");
      return;
    }
    
    // 2. Create a container for all tables
    const container = document.createElement('div');
    container.style.cssText = `
      width: 794px;
      margin: 0 auto;
      padding: 20px;
      background: #ffffff;
      font-family: Arial, sans-serif;
      box-sizing: border-box;
    `;
    
    // 3. Clone and add all tables with spacing
    if (invoiceTable) {
      const invoiceClone = invoiceTable.cloneNode(true);
      container.appendChild(invoiceClone);
      container.appendChild(document.createElement('br'));
    }
    
    if (section2) {
      const section2Clone = section2.cloneNode(true);
      container.appendChild(section2Clone);
      container.appendChild(document.createElement('br'));
    }
    
    if (gstTable) {
      const gstClone = gstTable.cloneNode(true);
      container.appendChild(gstClone);
      container.appendChild(document.createElement('br'));
    }
    
    if (internalTable) {
      const internalClone = internalTable.cloneNode(true);
      container.appendChild(internalClone);
    }
    
    // 4. Position container off-screen
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    document.body.appendChild(container);
    
    // 5. Style all tables for PDF
    const allTables = container.querySelectorAll('table');
    allTables.forEach((table, index) => {
      table.style.cssText = `
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 30px;
        border: 1px solid #000;
        page-break-inside: avoid;
      `;
      
      // Style all cells
      const cells = table.querySelectorAll('td, th');
      cells.forEach(cell => {
        cell.style.border = '1px solid #000';
        cell.style.padding = '8px';
        cell.style.textAlign = 'left';
      });
      
      // Style inputs and make them readonly
      const inputs = table.querySelectorAll('input');
      inputs.forEach(input => {
        input.style.border = '1px solid #ccc';
        input.style.padding = '4px';
        input.style.background = '#f9f9f9';
        input.style.width = '100%';
        input.style.boxSizing = 'border-box';
        input.setAttribute('readonly', 'true');
        input.readOnly = true;
      });
      
      // Hide all select elements
      const selects = table.querySelectorAll('select');
      selects.forEach(select => {
        select.style.display = 'none';
        select.style.visibility = 'hidden';
      });
    });
    
    // 6. Also hide select elements outside tables (in the container)
    const allSelects = container.querySelectorAll('select');
    allSelects.forEach(select => {
      select.style.display = 'none';
      select.style.visibility = 'hidden';
    });
    
    // 7. Generate PDF
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: container.offsetWidth,
      height: container.scrollHeight,
      windowWidth: container.offsetWidth,
      onclone: (clonedDoc, element) => {
        // Ensure styles are applied in the cloned document
        element.style.background = '#ffffff';
        
        // Make inputs readonly in clone
        const clonedInputs = element.querySelectorAll('input');
        clonedInputs.forEach(input => {
          input.setAttribute('readonly', 'true');
          input.readOnly = true;
          input.style.border = '1px solid #ccc';
          input.style.background = '#f9f9f9';
        });
        
        // Hide selects in clone
        const clonedSelects = element.querySelectorAll('select');
        clonedSelects.forEach(select => {
          select.style.display = 'none';
          select.style.visibility = 'hidden';
        });
      }
    });
    
    // 8. Remove container
    document.body.removeChild(container);
    
    // 9. Create PDF
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
    
    pdf.addImage(canvas, "PNG", 
      (pdfWidth - imgWidth * ratio) / 2,
      10,
      imgWidth * ratio,
      imgHeight * ratio
    );
    
    // 10. Save PDF
    const fileName = `Complete_Invoice_${new Date().toISOString().split("T")[0]}.pdf`;
    pdf.save(fileName);
    
  } catch (error) {
    console.error("PDF generation error:", error);
    alert("Failed to generate PDF. Please try again.");
  }
};
const CalPieceTotal=()=>{
  let tot=0;
  data.items.map((value,index)=>{
    tot+=value.rows.length
  });
  return Number(tot);
};
const CalSQFT=()=>{
  return data.grandTotal;
} 
const CalTotAmt=()=>{
  let sum=0;
  data.items.map((item,index)=>{
      sum+=item.totalArea * (rates[item.id] || item.rows?.[0]?.rate || 0)
  })
  return Number(sum);
}
  return (
    <>
        <h3>Estimation & Quotation</h3>
        <h5>Create and manage quotations and estimates</h5>
        <div className="invoice" id="invoice-content">
          <table id="invoice-table">
            <thead>
              <tr>
                <th style={{backgroundColor:'#f2f2f2'}} colSpan={7}>Invoice</th>
              </tr></thead>
              <tbody>
              <tr>
                <td colSpan={5}>
                  Name of the Party: &nbsp;
                 {data.Name || ""}
                </td>
                <td colSpan={2}>
                  Date:&nbsp;
                  {formatDateToYMD(data.ThisDate) || ""}
                </td>
              </tr>
              <tr>
                <td colSpan={7}>
                  Full Site Address with Pincode:&nbsp;
                 {data.Address}
                </td>
              </tr>
              <tr>
                <td colSpan={3}>
                  Sales Man Reff: &nbsp;
                  {data.SalesMan}
                </td>
                <td colSpan={4}>
                  Arc / Interior Designer: &nbsp;
                 {data.Refer}
                </td>
              </tr>
              <tr id="items-head" className="make-center">
                <td > SNo </td>
                <td style={{width:'25%'}}>Description</td>

                <td>Lot Id</td>
                <td style={{width:'10%'}}>No.of Pc</td>
                <td style={{width:'15%'}}>Qty (sqft)</td>
                <td>Rate</td>
                <td>Amount</td>
              </tr>
         {data.items.map((item, index) => (
          
  <tr key={item.id || index}>
    <td style={{ textAlign: 'center' }}>{item.id}</td>
    <td>{item.ColorSelect || ''}</td>
    <td>{item.LotID || ''}</td>
    <td>{item.rows?.length || ''}</td>
    <td>{item.totalArea?.toFixed(2) || '0.00'}</td>
   <td>
                <input
                  type="number"
                  step="0.01"
                  value={rates[item.id] || item.rows?.[0]?.rate || ''}
                  onChange={(e) => handleRateChange(item.id, e.target.value)}
                  className="data"
                  style={{ width: '100px' }}
                />
              </td>
              <td style={{textAlign:'right'}}>
                ₹{(item.totalArea * (rates[item.id] || item.rows?.[0]?.rate || 0)).toFixed(2)}
              </td>
   
  </tr>
))}
            <tr style={{backgroundColor:'#f2f2f2'}}>
              <td></td>
              <td></td>
              <td></td>
              <td style={{textAlign:'right'}}>Total: &nbsp;{CalPieceTotal()}</td>
              <td  style={{textAlign:'right'}}>Total:&nbsp;{CalSQFT()}</td>
              <td></td>
            </tr>
              <tr>
           
                <td style={{textAlign:'end'}} colSpan={6}>Others</td>
                <td>
                  <input
                    type="text" readOnly={isSubmitted}
                      id="data"
                    value={Extra}
                    onChange={(e) => {
                      SetExtra(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
              
                <td style={{textAlign:'end'}} colSpan={6}>Transport</td>
                <td>
                  <input
                    required
                       id="data" readOnly={isSubmitted}
                    step="any"
                    type="number"
                    disabled={disabled}
                    min="0"
                    value={Transport}
                    onChange={(e) => {
                      SetTransport(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
               
                <td  style={{textAlign:'end'}} colSpan={6}>Labour</td>
                <td>
                  <input
                    required
                    disabled={disabled}
                        id="data" readOnly={isSubmitted}
                    type="number"
                    min="0"
                    step={1}
                    value={Labour}
                    onChange={(e) => {
                      SetLabour(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
               
                <td style={{textAlign:'end'}} colSpan={6}>Stand Adv</td>
                <td>
                  
                  <input
                    required
                    disabled={disabled} readOnly={isSubmitted}
                        id="data"
                    type="number"
                    min="0"
                    step="0.01"
                    value={StandAdv}
                    onChange={(e) => {
                      SetStandAdv(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
               
                <td style={{textAlign:'end'}} colSpan={6}>Sub Total</td>
                <td>{(CalSub()+Number(Extra)).toFixed(2)}</td>
              </tr>
              <tr>
                <td style={{textAlign:'end'}} colSpan={6}>GST</td>
                <td>{GetGst()}</td>
              </tr>
              <tr>
                <td style={{textAlign:'end'}} colSpan={6}>Grand Total</td>
                <td>{FindGrand().toFixed(2) }</td>
              </tr>
             
            </tbody>
            <tr>
              <td colSpan={2}>
                    <div style={{width:'max-content',gap:'25px',display:'flex',justifyContent:'space-evenly'}}>
                      <div>D-1:&nbsp;{Number(AGrand()).toFixed(2)}</div>
                      <div>D-2:&nbsp;{BsecGrand().toFixed(2)}</div>
                    </div>
              </td>
            </tr>
          </table>
        
          
          <PartASec />
          
        </div>
    
      
      <div className="btns">
      
        <button onClick={generatePDF} className="btn-pdf">
          Download PDF
        </button>
        <button onClick={shareToWhatsAppDesktop} className="btn-pdf">
          Share
        </button>
      </div>
      
  <Govr
        Name={data.Name}
        SalesMan={data.SalesMan}
        Designer={data.Refer}
        Address={data.Address}
        Date={formatDateToYMD(data.ThisDate)}
       Items={data.items}
        Extra={Extra}
        Quantity={Quantity}
        Amount={CalTotal()}
        Rate={rates}
        Transport={Transport}
        Labour={Labour}
        StandAdv={StandAdv}
        GST={GetGst()}
        data={data}
        Grand={FindGrand().toFixed(2)}
      />

      {/* <PartB
        Name={"Name"}
        SalesMan={"SalesMan"}
        Designer={Designer}
        Address={"sd"}
        Date={SelectDate}
        Item={Item}
        Lot={Lot}
        Pcs={Pcs}
        Extra={Extra}
        Quantity={Quantity}
        Amount={CalTotal()}
        Rate={Rate}
        Transport={Transport}
        Labour={Labour}
        StandAdv={StandAdv}
        GST={GetGst()}
        Grand={FindGrand().toFixed(2)}
      /> */}
      <div style={{display:'flex',justifyContent:'center',gap:'25px'}}>
        <button onClick={HandleInvoice} className="btn-pdf" type="submit">
          {SaveStatus}
        </button> <button onClick={downloadAllTablesAsPDF} className="btn-pdf" type="submit">
          Download All
        </button></div>
    </>
  );
}

export default PartA;
