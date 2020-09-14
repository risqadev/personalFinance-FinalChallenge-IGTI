import React from 'react';

export default function Button({ id, value, className, dataTarget, disabled, onClick, children }) {
  return (
    <button
      id={id}
      value={value}
      className={className || ''}
      data-target={dataTarget}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
