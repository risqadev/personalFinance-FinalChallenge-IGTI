import React from 'react';
import Button from './Button';
import Select from './Select';

export default function Selector({ selectedItem, items, onChange }) {
  const handleButtonClick = () => {

  }

  return (
    <div className="center">
      <div className="valign-wrapper">
        <Button addClasses="" onClick={handleButtonClick}>&lt;</Button>
        <Select selectedItem={selectedItem} items={items} onChange={onChange} />
        <Button addClasses="" onClick={handleButtonClick}>&gt;</Button>
      </div>
    </div>
  )
}
