import React from 'react';
import { formatBRL } from '../helpers/formatter';
import './components.css';

export default function EntryItem({ item, returnAction }) {
  const { _id, day, type, description, value } = item;
  const typeName =
    (type === '+') ? 'Receita' :
      (type === '-') ? 'Despesa' :
        'Error';

  const handleActionClick = ({ target: { id, innerText: action } }) => {
    returnAction(action, id);
  }

  return (
    <div className="row valign-wrapper">
      <div className="col">{day}</div>
      <div className="col">
        <div /* className="col" */ style={{ fontWeight: 'bold' }}>{typeName}</div>
        <div /* className="col" */>{description}</div>
      </div>
      <div style={{ margin: '0 auto' }}></div>
      <div className="col" style={{ fontWeight: 'bold' }}>{formatBRL(value)}</div>
      <span
        id={_id}
        className="material-icons clickable"
        onClick={handleActionClick}
      >
        edit
      </span>
      <span
        id={_id}
        action="delete"
        className="material-icons clickable"
        onClick={handleActionClick}
      >
        delete
      </span>
    </div>
  )
}
