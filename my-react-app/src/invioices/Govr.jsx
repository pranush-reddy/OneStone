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
             
              </td></tr>
                            <tr> <td colSpan={5}>
               PAN Number with copy : &nbsp;
                
              </td></tr>
               <tr>
              <td colSpan={5}>
               Full Billing Address with Pincode:&nbsp; 
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
    </>
  )
}

export default Govr