import React from 'react'
import './Select.css'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


const Select = ({options, value, onChange}) => {
  return (
    <>
    <Dropdown 
            options={options} 
            onChange={onChange}
            value={value} placeholder="From" />
    </>
  )
}

export default Select