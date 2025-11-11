import React, { type ComponentProps } from 'react'
  

interface ButtonProps extends ComponentProps<'button'> {}

function Button(props: ButtonProps) {
  return (
    <button className='' {...props}>
      {props.children}
    </button>
  )
}
  



export default Button
