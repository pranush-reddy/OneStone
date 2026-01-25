import { useLocation } from "react-router-dom";
import { useState } from "react";
import Nav from "../Nav";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PartB from './PartB'
import "./PartA.css";
import Govr from "./Govr";

function PartA() {
  const [disabled, setDisabled] = useState(false);
  const location = useLocation();
  const [Name, SetName] = useState("");
  const [Item, SetItem] = useState("");
  const [Quantity, SetQuantity] = useState(0);
  const [Rate, SetRate] = useState(0);
  const [Transport, SetTransport] = useState(0);
  const [Labour, SetLabour] = useState(0);
  const [StandAdv, SetStandAdv] = useState(0);
  
  const [ Extra,SetExtra] = useState(0);
  
  const [Pcs, SetPcs] = useState(0);
  const[Address,SetAddress]=useState("");
  const [SelectDate, SetDate] = useState(() => {
  const today = new Date().toISOString().split("T")[0];
  return today; // e.g., "2026-01-25"
});
  const[SalesMan,SetSalesMan]=useState("");
  const [Lot,SetLot]=useState("");
  const [Designer,SetDesigner]=useState("");
  // const subtotal =
  //   Number(amount) +
  //   Number(props.Transport) +
  //   Number(props.Labour) +
  //   Number(props.StandAdv);
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  const formattedDate = `${dd}/${mm}/${yyyy}`;

  const generatePDF = () => {
    const input = document.getElementById("invoice-table");

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
        const clonedElement = clonedDoc.getElementById("invoice-table");
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
      sessionStorage.setItem("PartA",JSON.stringify({
        AGrand:FindGrand()
      }))

      setDisabled(true);
    }
  };
  const CalTotal=()=>{
    return (Number(Quantity)*Number(Rate)).toFixed(2) || 0
  }
  const FindGrand=()=>{
    let grand=0;
    const subtotal=CalSub();
    if(Extra<1){
      grand+=subtotal;
      grand+=((subtotal *18)/100);
    }else{
      grand+=subtotal+Number(Extra);
    }
    return Number(grand)
  }
  const CalSub=()=>{
   return Number(Quantity )* Number(Rate)+Number(Transport)+Number(Labour)+Number(StandAdv)
    
  };
  const GetGst=()=>{
      let sub=CalSub();
      sub=(sub*18/100);
      return sub.toFixed(2);
  } 

  return (
    <>
      <div className="customer-invoice-container">
        <h3>Estimation & Quotation</h3>
        <h5>Create and manage quotations and estimates

</h5>
        <div>
          <table id="invoice-table"><thead>
            <tr>
              <th colSpan={6}>Invoice</th>
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
                 <input
                  required
                  id="name"
                  disabled={disabled}
                  type="date"
                  placeholder="Select Date"
                  value={SelectDate}
                  onChange={(e) => {
                    SetDate(e.target.value);
                  }}/>
              </td>
            </tr>
            <tr>
              <td colSpan={6}>
                Full Address:&nbsp; <input
                  required
                  id="name"
                  disabled={disabled}
                  type="text"
                  placeholder="Enter Address"
                  value={Address}
                  onChange={(e) => {
                    SetAddress(e.target.value);
                  }}/>
              </td>
            </tr>
   <tr>
              <td colSpan={3}>
                Sales Man Reff: <br />
                <input
                  required
                  id="name"
                  disabled={disabled}
                  type="text"
                  placeholder="Enter Salesman name "
                  value={SalesMan}
                  onChange={(e) => {
                    SetSalesMan(e.target.value);
                  }}
                />
              </td>
              <td colSpan={3}>
                Arc / Interior Designer  <br />
                 <input
                  required
                  id="name"
                  disabled={disabled}
                  type="text"
                  placeholder="Enter Designer"
                  value={Designer}
                  onChange={(e) => {
                    SetDesigner(e.target.value);
                  }}/>
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
                {" "}
                <input
                  disabled={disabled}
                  type="text"
                  placeholder="Enter Description"
                  value={Item}
                  onChange={(e) => {
                    SetItem(e.target.value);
                  }}
                />
              </td>
              <td> <input
                  required
                  id="name"
                  disabled={disabled}
                  type="text"
                  placeholder="Enter LotID"
                  value={Lot}
                  onChange={(e) => {
                    SetLot(e.target.value);
                  }}/></td>
                     <td> <input
                  required
                  id="name"
                  disabled={disabled}
                  type="Number"
                  placeholder="Enter Pcs"
                  value={Pcs}
                  onChange={(e) => {
                    SetPcs(e.target.value);
                  }}/></td>
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
              <td>{CalTotal()}</td>
            </tr>
            <tr className="final1">
              <td> </td>
              <td> </td>

              <td>Total: {Pcs || 0}</td>
              <td>Total: {Quantity || 0}</td>
              <td></td>
            <td></td>
            </tr>
            <tr>
              <td> </td>
              
              <td> </td>
              <td> </td>
              <td> </td>
              <td>Extra</td>
              <td><input type="text" id="name" value={Extra} onChange={(e)=>{SetExtra(e.target.value)}}/></td>
            </tr>
            <tr>
              <td> </td>
              <td> </td>
              
              <td> </td>
              <td> </td>
              <td>Transport</td>
              <td> <input required
              id="transport" step="any"
              type='number' disabled={disabled}
              placeholder="Enter transport cost"
              min="0"
              value={Transport} 
              onChange={(e) => {
                SetTransport(e.target.value)
              }}
            /></td>
            </tr>
            <tr>
              <td> </td>
              <td> </td>
              
              <td> </td>
              <td> </td>
              <td>Labour</td>
              <td><input required disabled={disabled}
              id="labour"
              type='number' 
              placeholder="Enter labour cost"
              min="0" step={1}
              value={Labour} 
              onChange={(e) => {
                SetLabour(e.target.value)
              }}
            /></td>
            </tr>
            <tr>
              <td> </td>
              <td> </td>
              
              <td> </td>
              <td> </td>
              <td>Stand Adv</td>
              <td> <input required disabled={disabled}
              id="standAdv"
              type='number' 
              placeholder="Enter standard advance"
              min="0" step="0.01"
              value={StandAdv} 
              onChange={(e) => {
                SetStandAdv(e.target.value)
              }}
            /></td>
            </tr>
            <tr>
              <td> </td>
              
              <td> </td>
              <td> </td>
              <td> </td>
              <td>Sub Total</td>
              <td>{CalSub().toFixed(2)}</td>
            </tr>
            <tr>
              <td> </td>
              <td> </td>
              
              <td> </td>
              <td> </td>
              <td>GST</td>
              <td>{GetGst()}</td>
            </tr>
            <tr>
              <td> </td>
              <td> </td>
              
              <td> </td>
              <td> </td>
              <td>Grand Total</td>
              <td>{ FindGrand().toFixed(2)}</td>
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
        </button>  <button onClick={sharePDFToWhatsApp } className="btn-pdf">
         Share 
        </button>
      </div>
      
      <Govr Name={Name} SalesMan={SalesMan} Designer={Designer} Address={Address} Date={SelectDate} Item={Item} Lot={Lot}
      Pcs={Pcs}  Extra={Extra} Quantity={Quantity} Amount={CalTotal()} Rate={Rate}
       Transport={Transport} Labour={Labour} StandAdv={StandAdv} GST={GetGst()} Grand={FindGrand().toFixed(2)}/>
      <PartB Name={Name} SalesMan={SalesMan} Designer={Designer} Address={Address} Date={SelectDate} Item={Item} Lot={Lot}
      Pcs={Pcs}  Extra={Extra} Quantity={Quantity} Amount={CalTotal()} Rate={Rate}
       Transport={Transport} Labour={Labour} StandAdv={StandAdv} GST={GetGst()} Grand={FindGrand().toFixed(2)}/>
    </>
  
  );
}

export default PartA;