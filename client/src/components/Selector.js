import React from 'react';
import Button from './Button';
import Select from './Select';

export default function Selector({ currentItem, allItens, onChange }) {
  const handleSelectChange = (value) => {
    onChange(value);
  }

  const handleButtonClick = () => {

  }

  return (
    <div className="row">
      <Button onClick={handleButtonClick}>&lt;</Button>
      <Select currentItem={currentItem} allItens={allItens} onChange={handleSelectChange} />
      <Button onClick={handleButtonClick}>&gt;</Button>
    </div>
  )
}
