import React from 'react'

export default function Icon({ id, className, children }) {
  return (
    <i
      id={id}
      className={'material-icons ' + (className || '')}
    >
      {children}
    </i>
  )
}
