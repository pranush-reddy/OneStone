import React from 'react';

function Table({ 
  rows, unit, ColorSelect, SetColorSelect, 
  LotID, SetLotId, renderRow }) {
  return (
    <div className="table-container">
      <div style={{ overflowX: 'auto' }}>
        <table className="measurement-table">
          <thead>
            <tr>
              <th colSpan={7}>Colour</th>
              <th colSpan={8} style={{ padding: '0px' }}>
                <select 
                  style={{ width: '100%', height: '6vh', textAlign: 'center' }}
                  className="color-select"
                  value={ColorSelect}
                  onChange={(e) => SetColorSelect(e.target.value)}
                >
                  <option value=""><b>- Select Stock Colour -</b></option>
                  <option value="Imported Marble - Block A"><b>Imported Marble - Block A</b></option>
                  <option value="EXOTIC Quartzite">EXOTIC Quartzite</option>
                  <option value="ONYX Black Gold">ONYX Black Gold</option>
                  <option value="Quartz - White Premium">Quartz - White Premium</option>
                </select>
              </th>
              <th colSpan={7}>Lot Id</th>
              <th colSpan={1} style={{ padding: '0px',margin:'0px' ,width:'20vw'}}>
                <select 
                  style={{ width: '100%', height: '6vh', textAlign: 'center' }}
                  className="color-select"
                  value={LotID}
                  onChange={(e) => SetLotId(e.target.value)}
                >
                  <option value=""><b>- Select LotID -</b></option>
                  <option value="24YJU/45"><b>24YJU/45</b></option>
                  <option value="24XYZ/89">24XYZ/89</option>
                  <option value="24QRT/56">24QRT/56</option>
                  <option value="24ABC/12">24ABC/12</option>
                </select>
              </th>
            </tr>
            <tr>
              <th style={{ width: '1vw', padding: '0px' }}>S.NO</th>
              <th colSpan="3">Sizes</th>
              <th colSpan="3">Less1</th>
              <th colSpan="3">Less2</th>
              <th colSpan="3">Less3</th>
              <th colSpan="3">Less4</th>
              <th colSpan="3">Less5</th>
              <th colSpan="3">Less6</th>
              <th>Area</th>
            </tr>
          </thead>
          <tbody>
            {/* Use renderRow function passed from parent */}
            {rows.map((row, index) => renderRow(row, index))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;