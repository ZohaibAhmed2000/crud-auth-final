import { TextField } from '@mui/material'
import React from 'react'

const InputComp = ({label,onChange,value}) => {
  return (
    <TextField id="outlined-basic" label={label} variant="outlined" onChange={onChange} value={value}/>
  )
}

export default InputComp