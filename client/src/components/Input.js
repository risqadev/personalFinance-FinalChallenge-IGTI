import React from 'react'

export default function Input({ classContainer, classLabel, classInput, id, label, value, type, name, min, max, step, checked, onChange }) {

  return (
    <div className={classContainer}>
      {/* {type === 'radio' || (
        <>
          <label
            className={classLabel}
            htmlFor={name}
          >
            <span>{label}</span>
          </label>

          <input
            id={id}
            className={classInput}
            value={value}
            type={type}
            name={name}
            min={min}
            max={max}
            step={step}
            checked={checked}
            onChange={onChange}
          />
        </>
      )}

      {type === 'radio' && (
        <> */}
      <label
        className={classLabel}
        htmlFor={name}
      >

        <input
          id={id}
          className={classInput}
          value={value}
          type={type}
          name={name}
          min={min}
          max={max}
          step={step}
          checked={checked}
          onChange={onChange}
        />
        <span>{label}</span>
      </label>
      {/* </>
      )} */}
    </div >
  )
}
