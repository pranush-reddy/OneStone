import { useLocation } from 'react-router-dom'
import Nav from '../Nav'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import './PartB.css'

function PartB() {
  const location = useLocation()
  const props = JSON.parse(sessionStorage.getItem("data")) || {}
    const amount=props?.Quantity*props?.Rate;
    const subtotal=Number(amount)+Number(props.Transport)+Number(props.Labour)+Number(props.StandAdv) 
const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); 
const yyyy = today.getFullYear();

const formattedDate = `${dd}/${mm}/${yyyy}`; 

const generatePDF = () => {
  const input = document.getElementById('invoice-table')
  
  if (!input) {
    alert('Invoice table not found')
    return
  }

  html2canvas(input, {
    scale: 2, // Higher quality
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    // Add padding through html2canvas options
    onclone: function(clonedDoc) {
      const clonedElement = clonedDoc.getElementById('invoice-table')
      if (clonedElement) {
        // Apply padding styles to the cloned element
        clonedElement.style.padding = '15px'
        clonedElement.style.boxSizing = 'border-box'
      }
    }
  }).then((canvas) => {
    const imgWidth = 190 // A4 width minus left/right padding
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    
    // Add padding by positioning the image
    const leftPadding = 10
    const topPadding = 15
    
    pdf.addImage(imgData, 'PNG', leftPadding, topPadding, imgWidth, imgHeight)
    
    // Save the PDF
    const fileName = `Invoice_${props.Name || 'Customer'}_${new Date().toISOString().split('T')[0]}.pdf`
    pdf.save(fileName)
  })
}

 
    return (
    <>
        <Nav/>
        <div className='customer-invoice-container'>
            <h3>Internal Invoice</h3>
            <div>
                <table id="invoice-table">
                    <tr>
                        <th colSpan={5}>Invoice</th>
                    </tr>
                    <tr>
                        <td colSpan={3}>Name: <br/>
                       {props.Name}</td>
                       < td colSpan={3}>Date: <br/>
                       {formattedDate}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>Full Address:&nbsp;{"8-1/7/2 Hyderabad,50043"}</td>
                    </tr>
                    
                    <tr>
                        <th>Item Name</th>
                        
                        <th>Lot Id</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Amount</th></tr>
                       <tr className='items'> 
                        <td>{props.Item}</td>
                        <td>{"Not given"}</td>
                        <td>{props.Quantity}</td>
                        <td>{props.Rate}</td>
                        <td>{amount}</td>
                        </tr>
                        <tr className='final1'>
                            <td>{" "}</td>
                            <td>{" "}</td>
                            <td>Total:  {props.Quantity} </td>
                            <td></td>
                            <td>Total: ₹ {props.Quantity*props.Rate}</td>
                        </tr>
                        
                           <tr>
                             <td>{" "}</td>
                            <td>{" "}</td>
                            <td>{" "}</td>
                            <td>Grand Total</td>
                            <td>₹ {amount}</td>
                        </tr>
                </table>
            </div>
        </div>
        <div className='btns'>
 <button onClick={generatePDF} className="btn-pdf">
              Download PDF
            </button>
        </div>
        <div className='adv'>
            <h4>Total Amount (A+B) </h4>
            <h5>₹ {subtotal + (subtotal * 18 / 100) +amount}</h5>
        </div>
        
    </>
      
  )
}

export default PartB