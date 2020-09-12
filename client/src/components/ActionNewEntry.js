import React from 'react';
import Button from './Button';

export default function ActionNewEntry() {
  const handleButtonClick = () => {
    console.log('Novo lançamento');
  }

  return (
    <Button onClick={handleButtonClick}>+ NOVO LANÇAMENTO</Button>
  )
}
