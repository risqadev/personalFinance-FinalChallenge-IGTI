import React from 'react';
import ActionNewEntry from './ActionNewEntry';
import ActionSearch from './ActionSearch';

export default function ActionsLine() {
  return (
    <div className="row">
      <ActionNewEntry />
      <ActionSearch />
    </div>
  )
}
