import React from 'react';

export default function InfoField({ description, value }) {
  return (
    <div>
      <span id="fieldName">{description}: </span>
      <span id="fieldValue">{value}</span>
    </div>
  )
}
