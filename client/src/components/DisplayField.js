import React from 'react';

export default function DisplayField({ classContainer, classLabel, classValue, description, value }) {
  return (
    <div className={classContainer}>
      <span
        className={classLabel}
      >
        {description}:&nbsp;
      </span>

      <span
        className={classValue}
      >
        {value}
      </span>
    </div>
  )
}
