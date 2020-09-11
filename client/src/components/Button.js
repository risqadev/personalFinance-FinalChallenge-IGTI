import React from 'react';

import 'materialize-css/dist/css/materialize.min.css';

export default function Button({ children }) {
  return (
    <button className="btn waves-effect waves-light col">{children}</button>
  )
}
