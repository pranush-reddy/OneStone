import React, { useState ,useEffect} from 'react'

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import './Govr.css'
function Govr({Extra,Amount,Quantity,Rate,Transport,Labour,StandAdv,GST,Grand ,Name, Date,Address,SalesMan,Item,Lot,Pcs,Designer,}) {
    const [ShowGen,SetShowGen]=useState(false);
      const [selected, setSelected] = useState('');
    const [getNO,SetGSTno]=useState("");
    const [PANno,setPan]=useState("");
    const [BillingAddress,SetBilling]=useState("");
  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  useEffect(() => {
    if (Extra<1) {
      SetShowGen(true);
    } else {
      SetShowGen(false);
    }
  }, [Extra]);
const GetGrand=()=>{
    if(Extra<1){
        return Grand;
    }else{
        return Number(Amt())+Number(CalculateGst());
    }
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
            
            let amt=Number(Extra);
            return (amt/0.18).toFixed(2);
        }
    }
    const CalRate=()=>{
        if(Extra<1){
               return Number(Rate);
        }else{
            const amt=(Extra/0.18).toFixed(2);
            return Number(amt/Quantity);
        }
    }
    const formatForDisplay = (yyyymmdd) => {
  const [yyyy, mm, dd] = yyyymmdd.split("-");
  return `${dd}-${mm}-${yyyy}`; 
};
    const generatePDF = () => {
        const input = document.getElementById("gst-table");
        
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
        
        // Style the table
        const table = wrapper.querySelector('#gst-table');
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
        });
        
        // Hide select element
        const selects = wrapper.querySelectorAll('select');
        selects.forEach(select => {
            select.style.display = 'none';
        });
        
        // Add to document
        document.body.appendChild(wrapper);
        
        // Generate PDF
        html2canvas(wrapper, {
            scale: 2,
            useCORS: true,
            logging: false,
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
    const mainGrandValue= GetGrand();
  // Open WhatsApp Web
  const message = encodeURIComponent(
    "We've a new GST Split Invoice!!\n"+
    `Date: ${Date}\n`+`Amount:${mainGrandValue}\n`+
    `On Item : ${Item}`
  );
  
  window.open(`https://web.whatsapp.com/send?text=${message}`, "_blank");
  
  URL.revokeObjectURL(url);
}

  return (
    <>
              <table id="gst-table">
                <tbody>
         
            <tr >
              <td style={{paddingTop:'20px'}} colSpan={4}>
               Sales Man Reff:&nbsp;{SalesMan}
              </td>
              <td style={{paddingTop:'20px'}} colSpan={1}>
                Date:&nbsp;
                 {formatForDisplay(Date)}
              </td>
            </tr>
            <tr> <td colSpan={5}>
               Name of Party (Firm / Person): &nbsp;
                {Name}
              </td></tr>
              <tr> <td colSpan={5}>
               GST Number : &nbsp;
            <label htmlFor="radio">
      <select name="radio" id="radios" style={{marginRight:'10px'}} value={selected} onChange={handleChange}>
        <option value="">--Please choose an option--</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select></label>
             {selected==="Yes" && (<input value={getNO} id="heds" onChange={(e)=>{SetGSTno(e.target.value)}} type="text"/>)}
              </td></tr>
                            <tr> <td colSpan={5}>
               PAN Number with copy : &nbsp;
               <input value={PANno} id="heds" onChange={(e)=>{setPan(e.target.value)}} type="text"/>
              </td></tr>
               <tr>
              <td colSpan={5}>
               Full Billing Address with Pincode:&nbsp; 
                <input value={BillingAddress} style={{width:'40vw'}} onChange={(e)=>{SetBilling(e.target.value)}} type="text"/>
              </td>
            </tr>
            <tr style={{height:'25px'}}>&nbsp;</tr>
            <tr>
              <td colSpan={5}>
               Full Site Address with Pincode:&nbsp; {Address}
              </td>
            </tr>
            <tr style={{height:'25px'}}>&nbsp;</tr>
           
            <tr><td colSpan={5}>Vehicle Number :</td></tr>
        
            <tr className='heds'>
                <td style={{width:'2vw'}}>SN</td>
              <td style={{width:'38vw'}}>ACC Description</td>
              <td>Qty (sqft)</td>
              <td>Rate</td>
              <td>Amount</td>
            </tr>
            <tr className="items">
                <td>1.</td>
              <td>{Item} </td>

              <td>{Quantity}</td>
              <td>{CalRate().toFixed(2)}</td>
              <td>{Amt()}</td>
            </tr>
            <tr>
              <td  style={{textAlign:'center'}}>2.</td>
              <td></td>
              <td></td>
              
              <td></td>
              <td></td>
             </tr>
             <tr>
              <td  style={{textAlign:'center'}}>3.</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
             </tr>
             <tr>
              <td  style={{textAlign:'center'}}>4.</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
             </tr>
             <tr><td  style={{textAlign:'center'}}>5.</td>
             <td></td>
             <td></td>
             <td></td>
             <td></td></tr>
           {ShowGen &&  (<>
            <tr>
              <td> </td>
              
              <td> </td>
              <td> </td>
              <td>Transport</td>
              <td> {Transport || 0}</td>
            </tr>
            <tr>
              <td> </td>
              
              <td> </td>
              <td> </td>
              <td>Labour</td>
              <td>{Labour || 0}</td>
            </tr>
            <tr>
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
              <td>GST (18%)</td>
              <td>{CalculateGst()}</td>
            </tr>
            <tr>
              <td> </td>

              <td> </td>
              <td> </td>
              <td>Grand Total</td>
              <td>{ GetGrand()}</td>
            </tr></tbody> 
          </table>
              <div className="btns">
       
        <button className="btn-pdf" onClick={generatePDF}>
          Download PDF
        </button>
        <button  className="btn-pdf" onClick={shareToWhatsAppDesktop}>
          Share
        </button>
      </div>
    </>
  )
}

export default Govr