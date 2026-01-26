import { useLocation } from "react-router-dom";
import { useState } from "react";
import Nav from "../Nav";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PartB from "./PartB";
import "./PartA.css";
import Govr from "./Govr";
import PartASec from "./PartASec";

function PartA() {
  const [disabled, setDisabled] = useState(false);
  const location = useLocation();
  const [Name, SetName] = useState("");
  const [Item, SetItem] = useState("");
  const [Quantity, SetQuantity] = useState("");
  const [Rate, SetRate] = useState("");
  const [Transport, SetTransport] = useState("");
  const [Labour, SetLabour] = useState("");
  const [StandAdv, SetStandAdv] = useState("");

  const [Extra, SetExtra] = useState("");
const [isSubmitted,SetSubmitted]=useState(false);
  const [Pcs, SetPcs] = useState("");
  const [Address, SetAddress] = useState("");
  const [SelectDate, SetDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today; // e.g., "2026-01-25"
  });
  const [SalesMan, SetSalesMan] = useState("");
  const [Lot, SetLot] = useState("");
  const [Designer, SetDesigner] = useState("");
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
  const input = document.querySelector(".invoice");

  if (!input) {
    alert("Invoice table not found");
    return;
  }

  const wrapper = document.createElement('div');
  wrapper.style.width = '754px'; 
  wrapper.style.margin = '20px';
  wrapper.style.padding = '0px';

  wrapper.style.boxSizing = 'border-box';
  wrapper.style.backgroundColor = '#ffffff';
  
  // Clone and append content
  const content = input.cloneNode(true);
  wrapper.appendChild(content);
  
  // Style the tables inside
  const tables = content.querySelectorAll('table');
  tables.forEach(table => {
    table.style.tableLayout = 'fixed';
    table.style.borderCollapse = 'collapse';
    table.style.boxSizing = 'border-box';
  });
  const inputs = content.querySelectorAll('input');
  inputs.forEach(input => {
    input.style.border = 'none';
    input.style.background = 'transparent';
    input.style.width = '100%';
    input.style.boxSizing = 'border-box';
    input.setAttribute('readonly', 'readonly');
  });
  
  const gstinv=document.getElementById("gst-table");
  if(gstinv){
    gstinv.style.width="70vw"; 
    gstinv.style.paddingTop="20px";
  }
  // Add to document temporarily
  wrapper.style.position = 'absolute';
  wrapper.style.left = '-9999px';
  document.body.appendChild(wrapper);

  html2canvas(wrapper, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
    width: 794, 
    height: wrapper.scrollHeight + 40, 
  }).then((canvas) => {
    document.body.removeChild(wrapper);
    
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    
    pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
    
    const fileName = `Invoice_${Name || "Customer"}_${new Date().toISOString().split("T")[0]}.pdf`;
    pdf.save(fileName);
  }).catch(error => {
    if (document.body.contains(wrapper)) {
      document.body.removeChild(wrapper);
    }
    console.error("PDF generation error:", error);
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

      pdf.addImage(
        imgData,
        "PNG",
        leftPadding,
        topPadding,
        imgWidth,
        imgHeight,
      );

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
          "_blank",
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
      sessionStorage.setItem(
        "PartA",
        JSON.stringify({
          AGrand: FindGrand(),
        }),
      );

      setDisabled(true);
    }
  };
  const CalTotal = () => {
    return (Number(Quantity) * Number(Rate)).toFixed(2) || 0;
  };
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

  return (
    <>
      <div className="customer-invoice-container">
        <h3>Estimation & Quotation</h3>
        <h5>Create and manage quotations and estimates</h5>
        <div className="invoice" id="invoice-content">
          <table id="invoice-table">
            <thead>
              <tr>
                <th colSpan={7}>Invoice</th>
              </tr>
              <tr>
                <td colSpan={5}>
                  Name of the Party: &nbsp;
                  <input
                    required readOnly={isSubmitted}
                    id="name"
                    disabled={disabled}
                    type="text"
                    value={Name}
                    onChange={(e) => {
                      SetName(e.target.value);
                    }}
                  />
                </td>
                <td colSpan={2}>
                  Date:&nbsp;
                  <input
                    required readOnly={isSubmitted}
                    id="name"
                    disabled={disabled}
                    type="date"
                    value={SelectDate}
                    onChange={(e) => {
                      SetDate(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={7}>
                  Full Site Address with Pincode:&nbsp;{" "}
                  <input
                    required
                    id="name"
                    disabled={disabled}
                    type="text" readOnly={isSubmitted}
                    value={Address}
                    onChange={(e) => {
                      SetAddress(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={3}>
                  Sales Man Reff: &nbsp;
                  <input
                    required
                    id="sd" readOnly={isSubmitted}
                    disabled={disabled}
                    type="text"
                    value={SalesMan}
                    onChange={(e) => {
                      SetSalesMan(e.target.value);
                    }}
                  />
                </td>
                <td colSpan={4}>
                  Arc / Interior Designer &nbsp;
                  <input readOnly={isSubmitted}
                    required
                    disabled={disabled}
                    id="sd"
                    type="text"
                    value={Designer}
                    onChange={(e) => {
                      SetDesigner(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr id="items-head">
                <td > SN </td>
                <td>Description</td>

                <td>Lot Id</td>
                <td>No.of Pc</td>
                <td>Qty (sqft)</td>
                <td>Rate</td>
                <td>Amount</td>
              </tr>
              <tr className="items">
                <td> 1</td>
                <td>
                  
                  <input
                    disabled={disabled}
                    type="text"
                    id="data"
                    value={Item} readOnly={isSubmitted}
                    onChange={(e) => {
                      SetItem(e.target.value);
                    }}
                  />
                </td>
                <td>
                  {" "}
                  <input
                    required
                     id="data" readOnly={isSubmitted}
                    disabled={disabled}
                    type="text"
                    value={Lot}
                    onChange={(e) => {
                      SetLot(e.target.value);
                    }}
                  />
                </td>
                <td>
                  {" "}
                  <input
                    required readOnly={isSubmitted}
                      id="data"
                    disabled={disabled}
                    type="Number"
                    value={Pcs}
                    onChange={(e) => {
                      SetPcs(e.target.value);
                    }}
                  />
                </td>
                <td>
                  {" "}
                  <input
                    disabled={disabled}
                    required readOnly={isSubmitted}
                    id="data"
                    type="number"
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
                    disabled={disabled} readOnly={isSubmitted}
                    required
                      id="data"
                    type="number"
                    
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
             <tr>
              <td  style={{textAlign:'center'}}>2</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
             </tr>
             <tr>
              <td  style={{textAlign:'center'}}>3</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
             </tr>
             <tr>
              <td  style={{textAlign:'center'}}>4</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
             </tr>
             <tr><td  style={{textAlign:'center'}}>5</td>
             <td></td>
             <td></td>
             <td></td>
             <td></td>
             <td></td>
             <td></td></tr>
             <tr><td style={{textAlign:'center'}}>6</td>
             <td></td>
             <td></td>
             <td></td>
             <td></td>
             <td></td>
             <td></td></tr>
             <tr>
              <td  style={{textAlign:'center'}}>7</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
                  {" "}
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
                <td>{CalSub().toFixed(2)}</td>
              </tr>
              <tr>
             
                <td style={{textAlign:'end'}} colSpan={6}>GST</td>
                <td>{GetGst()}</td>
              </tr>
              <tr>
                <td style={{textAlign:'end'}} colSpan={6}>Grand Total</td>
                <td>{FindGrand().toFixed(2) }</td>
              </tr>
            </thead>
          </table>
          <PartASec />
            <Govr
        Name={Name}
        SalesMan={SalesMan}
        Designer={Designer}
        Address={Address}
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
      />
        </div>
      </div>
      <div className="btns">
        <button onClick={HandleInvoice} className="btn-pdf" type="submit">
          Submit
        </button>
        <button onClick={generatePDF} className="btn-pdf">
          Download PDF
        </button>{" "}
        <button onClick={sharePDFToWhatsApp} className="btn-pdf">
          Share
        </button>
      </div>

    
      <PartB
        Name={Name}
        SalesMan={SalesMan}
        Designer={Designer}
        Address={Address}
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
      />
    </>
  );
}

export default PartA;
