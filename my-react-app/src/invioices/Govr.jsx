import React, { useState ,useEffect} from 'react'
import './Govr.css'
function Govr({Extra,Amount,Quantity,Rate,Transport,Labour,StandAdv,GST,Grand ,Name, Date,Address,SalesMan,Item,Lot,Pcs,Designer,}) {
    const [ShowGen,SetShowGen]=useState(false);
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
        return 0;
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

  return (
    <>
    <div>
        <h3>GST split Invoice</h3>
              <table id="gst-table">
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
           {ShowGen &&  (<>
            <tr>
              <td> </td>
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
              <td> </td>
              <td>Labour</td>
              <td>{Labour || 0}</td>
            </tr>
            <tr>
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
              <td>{ Grand}</td>
            </tr></thead>
          </table>
    </div>
    </>
  )
}

export default Govr