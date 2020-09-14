import React from 'react';
import './components.css';
// MATERIALIZE JAVASCRIPT CAUSOU PROBLEMA NA ATUALIZAÇÃO
// import M from "materialize-css";DO SELECT

export default function Select({ className, items, onChange }) {
  // MATERIALIZE JAVASCRIPT CAUSOU PROBLEMA NA ATUALIZAÇÃO
  // React.useEffect(() => {
  //   M.AutoInit();
  // }, []);

  return (
    <select
      className={className || ''}
      value={items.list[items.currentIndex]}
      onChange={onChange}
    >
      {items.list.map((item, index) => {
        return (

          <option
            key={index}
            value={item}
          >
            {item}
          </option>

        )
      })}
    </select>
  )
}
