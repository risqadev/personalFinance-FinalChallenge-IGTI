import React from 'react';
import EntryItem from './EntryItem';

export default function EntriesList({ items, onClick }) {
  return (
    <div>
      {items.map((item) => {
        return (
          <EntryItem
            key={item._id}
            item={item}
            onClick={onClick}
          />
        )
      })}
    </div>
  )
}
