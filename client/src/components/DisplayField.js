import React from 'react';

export default function DisplayField({ description, value }) {
  return (
    <div className="col m3">
      <span id="fieldName">{description}: </span>
      <span id="fieldValue" style={{ fontWeight: 'bold' }}>{value}</span>
    </div>
  )
}
