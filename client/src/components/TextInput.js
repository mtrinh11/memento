import React from 'react'

export default (props) =>
  props.fieldType === 'textfield' ? (
    <textarea
      required={props.required}
      style={props.style}
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={(e) => props.onChange(e)}
      placeholder={props.placeholder}
    />
  ) : (
    <input
      required={props.required}
      style={props.style}
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={(e) => props.onChange(e)}
      placeholder={props.placeholder}
      autoComplete="false"
    />
  )
