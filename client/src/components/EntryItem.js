import React from 'react';
import { formatBRL } from '../helpers/formatter';
import Button from './Button';

import Icon from './Icon';

export default function EntryItem({ className, item, previousDay, onClick }) {
  const { _id, day, type, description, value } = item;
  const typeProps =
    (type === '+')
      ? { name: 'Receita', cssClass: '_income' }
      : (type === '-')
        ? { name: 'Despesa', cssClass: '_expense' }
        : 'Error';

  const handleClick = ({ currentTarget }) => {
    onClick(currentTarget);
  }


  return (
    <div className={
      `${className} ${typeProps.cssClass} ${day !== previousDay && '_days-space'}`
    }>
      <div className="col _entry-day">{day}</div>
      <div className="col">
        <div className="_entry-description" >{description}</div>
        <div className="_entry-type">{typeProps.name}</div>
      </div>
      <div className="col _entry-value">{formatBRL(value)}</div>

      <Button
        id={_id}
        value="edit"
        className="btn-flat waves-effect waves-teal _action-icon"
        onClick={handleClick}
      >
        <Icon>edit</Icon>
      </Button>

      <Button
        id={_id}
        value="delete"
        className="btn-flat waves-effect waves-teal red-text _action-icon"
        onClick={handleClick}
      >
        <Icon>delete</Icon>
      </Button>

    </div>
  )
}
