import React from 'react';
import EntryItem from './EntryItem';

export default function EntriesList({ items, onClick }) {
  // console.log(items);

  return (
    <div>
      {items.map((item, index) => {

        return (
          <EntryItem
            className="row valign-wrapper _entryItem"
            key={index}
            item={item}
            previousDay={index !== 0 && items[index - 1].day}
            onClick={onClick}
          />
        )
      })}
    </div>
  )
}
