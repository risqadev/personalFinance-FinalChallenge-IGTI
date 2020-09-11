import React from 'react';
import M from "materialize-css";
import 'materialize-css/dist/css/materialize.min.css';

export default function Select({ currentItem, allItens, onChange }) {
  const handlePeriodChange = ({ target: { value } }) => {
    onChange(value);
  }

  React.useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <div className="input-field col">
      <select className="center-align"
        value={currentItem}
        onChange={handlePeriodChange}>
        {allItens.map(item => {
          return (
            <option key={item} value={item}>{item}</option>
          )
        })}
      </select>
    </div>
  )
}
