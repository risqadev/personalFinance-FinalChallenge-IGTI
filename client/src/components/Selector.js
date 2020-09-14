import React from 'react';
import Button from './Button';
import Select from './Select';
import './components.css';
import Icon from './Icon';

export default function Selector({ items, onChange }) {
  const limitButton =
    items.currentIndex === 0
      ? 'inferior'
      : items.currentIndex === items.list.length - 1
        ? 'superior'
        : 'in';

  return (
    <div className="valign-wrapper _flex-center _period-selector">

      <Button
        value="<"
        className="btn waves-effect waves-light"
        disabled={limitButton === 'inferior'}
        onClick={onChange}
      >
        <Icon>chevron_left</Icon>
      </Button>

      <Select
        className="browser-default input-field _period-select"
        items={items}
        onChange={onChange}
      />

      <Button
        value=">"
        className="btn waves-effect waves-light"
        disabled={limitButton === 'superior'}
        onClick={onChange}
      >
        <Icon>chevron_right</Icon>
      </Button>

    </div>
  )
}
