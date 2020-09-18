import React from 'react';
// MATERIALIZE JAVASCRIPT CAUSOU PROBLEMA NA ATUALIZAÇÃO
// import M from "materialize-css";

export default function Select({ className, items, onChange }) {
  // MATERIALIZE JAVASCRIPT CAUSOU PROBLEMA NA ATUALIZAÇÃO
  // React.useEffect(() => {
  // M.AutoInit();
  // }, []);

  return (
    <div className="input-field">

      <select
        className={className || ''}
        value={items.list[items.currentIndex]}
        // selectedIndex={items.currentIndex}
        onChange={onChange}
      >
        {items.list.map((item, index) => {
          return (

            <option
              key={index}
              value={item}
            // selected={index === items.currentIndex}
            >
              {item}
            </option>

          )
        })}
      </select>

    </div>
  )
}
