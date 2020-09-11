import React from 'react';

export default function Select({ currentItem, allItens, onChange }) {
  const handlePeriodChange = ({ target: { value } }) => {
    onChange(value);
  }

  return (
    <select className="browser-default"
      value={currentItem}
      onChange={handlePeriodChange}>
      {allItens.map(item => {
        return (
          <option key={item} value={item}>{item}</option>
        )
      })}
    </select>
  )
}
