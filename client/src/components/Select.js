import React from 'react';
// MATERIALIZE JAVASCRIPT CAUSOU PROBLEMA NA ATUALIZAÇÃO
// import M from "materialize-css";DO SELECT

export default function Select({ selectedItem, items, onChange }) {
  const handlePeriodChange = ({ target: { value } }) => {
    onChange(value);
  }

  // MATERIALIZE JAVASCRIPT CAUSOU PROBLEMA NA ATUALIZAÇÃO
  // React.useEffect(() => {
  //   M.AutoInit();
  // }, []);

  return (
    <div className="col">
      <select className="browser-default input-field"
        value={selectedItem}
        onChange={handlePeriodChange}>
        {items.map((item, index) => {
          return (
            <option key={index} value={item}>{item}</option>
          )
        })}
      </select>
    </div>
  )
}
