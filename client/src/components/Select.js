import React from 'react';


const stringMonths = {
  1: 'Jan',
  2: 'Fev',
  3: 'Mar',
  4: 'Abr',
  5: 'Mai',
  6: 'Jun',
  7: 'Jul',
  8: 'Ago',
  9: 'Set',
  10: 'Out',
  11: 'Nov',
  12: 'Dez'
};


export default function Select({ className, items, onChange }) {

  return (
    <select
      className={['browser-default _period-select', className].join(' ')}
      value={items.list[items.currentIndex]}
      // selectedIndex={items.currentIndex}
      onChange={onChange}
    >
      {items.list.map((item, index) => {
        const year = item.substring(0, 4);
        const month = stringMonths[Number(item.substring(5, 8))];


        return (

          <option
            key={index}
            value={item}
            style={{ fontFamily: 'Consolas, monospace' }}
          // selected={index === items.currentIndex}
          >
            {`${month}/${year}`}
          </option>

        )
      })}
    </select>
  )
}
