import React from 'react';
import Button from './Button';
import Select from './Select';
import Icon from './Icon';

export default function Selector({ items, onChange }) {
  const limitButton =
    items.currentIndex === 0
      ? 'inferior'
      : items.currentIndex === items.list.length - 1
        ? 'superior'
        : 'in';

  const handleChange = ({ currentTarget }) => {
    onChange(currentTarget);
  }

  return (
    <div className="valign-wrapper _flex-center _period-selector">

      <Button
        value="<"
        className="btn waves-effect waves-light _btn"
        disabled={limitButton === 'inferior'}
        onClick={handleChange}
      >
        <Icon>chevron_left</Icon>
      </Button>

      <Select
        items={items}
        onChange={handleChange}
      />

      <Button
        value=">"
        className="btn waves-effect waves-light _btn"
        disabled={limitButton === 'superior'}
        onClick={handleChange}
      >
        <Icon>chevron_right</Icon>
      </Button>

    </div>
  )
}
