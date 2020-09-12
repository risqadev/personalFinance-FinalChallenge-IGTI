import React from 'react';
import EntryItem from './EntryItem';

export default function EntriesList({ items, returnAction }) {
  return (
    <div>
      {items.map((item) => {
        return (
          <EntryItem
            key={item._id}
            item={item}
            returnAction={returnAction}
          />
        )
      })}
    </div>
  )
}
