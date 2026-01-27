import React from 'react'
import './PartASec.css'
function PartASec() {
  return (
    <>
    <div className='section2'>
      <div className='section-below'>
        <table className='Advance-Rec' >
          <tbody><tr>
            <td colSpan="4">Advance Received</td>
          </tr>
          <tr className='heds'>
            <td style={{maxWidth:'1vw'}}>SNo</td>
            <td >Date</td>
            <td style={{minWidth:'4vw'}}></td>
            <td style={{maxWidth:'4vw'}}>RTGS/UPI</td>
          </tr>
          <tr>
            <td >1</td>
            <td></td>
            
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td >2</td>
            <td></td>
            
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td >3</td>
            
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td >4</td>
            <td></td>
            <td></td>
          </tr>
        </tbody></table>
      </div>

      <div className='section-below' >
        <table style={{border:'3px solid white',borderBottom:'1px solid black'}}>
          <tbody><tr>
            <td >
                <div className='creds'>
              If Credit Days:
               <span >Days</span></div>
            </td>
          </tr>
          <tr>
            <td >
             Dir Reff for Credit:
                </td>
          </tr>
          <tr>
            <td >
              Signature Of Sales Person:
                 </td>
          </tr>
          <tr>
            <td >
              Verified by:
                </td>
          </tr>
        
        </tbody></table>
      </div>
    </div>
    </>
  )
}

export default PartASec