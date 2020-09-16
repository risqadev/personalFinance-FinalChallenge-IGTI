import React from 'react';

export default function ActionSearch({ className, searchInput, onChange }) {
  return (
    <div className={'' + className || ''}>
      <label htmlFor="find">Localizar</label>
      <input
        // value={findInput}
        type="text"
        name="find"
        id="find"
        /* className="input-field" */
        onChange={onChange}
      />
    </div>
  )
}
