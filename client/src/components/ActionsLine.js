import React from 'react';
import ActionSearch from './ActionSearch';
// import ActionNewEntry from './ActionNewEntry';
import ModalReact from './ModalReact';

export default function ActionsLine({ onSaveNew, onSearch, isEditing }) {
  return (
    <div className="row">
      <ModalReact onSave={onSaveNew} isEditing={isEditing} />
      <ActionSearch onSearch={onSearch} />
    </div>
  )
}
