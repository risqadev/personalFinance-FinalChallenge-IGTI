import React from 'react';
import { formatBRL } from '../helpers/formatter';
import Button from './Button';
import './components.css';
import Icon from './Icon';

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

      <Button
        className="btn-flat waves-effect waves-teal _action-icon"
        onClick={handleActionClick}
      >
        <Icon
          id={_id}
        >
          edit
        </Icon>
      </Button>

      <Button
        className="btn-flat waves-effect waves-teal _action-icon"
        onClick={handleActionClick}
      >
        <Icon
          id={_id}
        >
          delete
        </Icon>
      </Button>

    </div>
  )
}
