import React from 'react';

import 'materialize-css/dist/css/materialize.min.css';

export default function DisplayField({ description, value }) {
  return (
    <div className="col m3">
      <span id="fieldName">{description}: </span>
      <span id="fieldValue">{value}</span>
    </div>
  )
}
