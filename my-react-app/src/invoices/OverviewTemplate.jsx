import React from 'react'
import { useLocation } from 'react-router-dom'
function OverviewTemplate() {
    const location=useLocation();
    const data=location.state || {};

const GetFinal=()=>{
    let grand=0;
      data.items.map((item, index) => (
        grand+=item.rate*item.totalArea).toFixed(2))
    if(data.Extra>0){
        grand+=data?.Transport+data?.Labour
    }
    else{
        grand+=data.GST
    }
    return grand;
}
  return (
           <table id="internal-table">
                <tbody>
            <tr>
              <th style={{backgroundColor:'#e7e7e7'}} colSpan={7}>Invoice</th>
            </tr>
            <tr>
              <td colSpan={4}>
               Name : &nbsp;
                {data.Name}
              </td>
              <td colSpan={3}>
                Date : &nbsp;
                 {data.Date}
              </td>
            </tr>
            <tr>
              <td colSpan={7}>
               Full Address:&nbsp; {data.Address}
              </td>
            </tr>
   <tr>
              <td colSpan={4}>
                Sales Man Reff: 
                {data.SalesMan}
              </td>
              <td colSpan={3}>
                Arc / Interior Designer  
                 {data.Designer}
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
       {data.items.map((item, index) => (
          
  <tr key={item.id || index}>
    <td style={{ textAlign: 'center' }}>{item.id}</td>
    <td>{item.ColorSelect || ''}</td>
    <td>{item.LotID || ''}</td>
    <td>{item.pieces || ''}</td>
    <td>{Number(item?.totalArea).toFixed(2) || '0.00'}</td>
   <td>
                {item.rate}
              </td>
              <td style={{textAlign:'right'}}>
                {Number(item.amount).toFixed(2)}
              </td>
   
  </tr>
))}
           {data.Transport &&  (<>
            <tr>
              <td> </td>
              <td></td>
              <td> </td>
              
              <td> </td>
              <td> </td>
              <td>Transport</td>
              <td style={{textAlign:'right'}}> {data.Transport || 0}</td>
            </tr></>)}
           {(data.Labour>1)  && (<><tr>
              <td> </td>
              <td> </td>
               <td></td>
              <td> </td>
              <td> </td>
              <td >Labour</td>
              <td style={{textAlign:'right'}}>{data.Labour || 0}</td>
            </tr></>)}
            {(data.StandAdv>1) && (<><tr>
              <td> </td>
              <td> </td>
               <td></td>
              <td> </td>
              <td> </td>
              <td>Stand Adv</td>
              <td style={{textAlign:'right'}}> {data.StandAdv || 0}</td>
            </tr></>)}
            <tr>
              <td> </td>
              <td> </td>
               <td></td>
              <td> </td>
              <td> </td>
              <td>GST (18%)</td>
              <td style={{textAlign:'right'}}>{data.Extra>0 ? data.Extra : data.GST}</td>
            </tr>
            <tr>
              <td> </td>
              <td> </td>
               <td></td>
              <td> </td>
              <td> </td>
              <td>Grand Total</td>
              <td style={{textAlign:'right'}}>₹ {Number(GetFinal()).toFixed(2)}</td>
            </tr></tbody>
          </table>
  )
}

export default OverviewTemplate