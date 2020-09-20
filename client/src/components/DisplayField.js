import React from 'react';

export default function DisplayField({ classContainer, classLabel, classValue, styleContainer, description, value }) {
  return (
    <div className={classContainer} style={styleContainer}>
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
