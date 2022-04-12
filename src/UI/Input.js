import React from 'react'
import './Input.css'

const Input = ({onChange, value}) => {
  return (
    <>
    <input className='inputAmount' type="text" onChange={onChange} value={value}/>
    </>
  )
}

export default Input