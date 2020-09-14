import React from 'react';

export default function Button({ children, className, dataTarget, onClick }) {
  return (
    <button
      className={`btn waves-effect waves-light col ${className}`}
      data-target={dataTarget}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
