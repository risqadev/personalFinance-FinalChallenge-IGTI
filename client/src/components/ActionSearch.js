import React from 'react';

export default function ActionSearch({ searchInput, onChange }) {
  return (
    <div className="col" style={{ width: '70%' }}>
      <input
        // value={searchInput}
        type="text"
        name="search"
        id="search"
        className="input-field"
        onChange={onChange}
      />
    </div>
  )
}
