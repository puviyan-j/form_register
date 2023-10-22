import React, { useState } from 'react'

function Forminputs({ input, onChange ,onClick ,values}) {

  const [focused, setfocused] = useState(false);
 
  const handlefocused = (e) => {
    setfocused(true);
  }
  return (
    <>
      <label className='d-block mb-sm-1'>{input.lable} *</label>
      <input 
        name={input.name}
        type={input.type}
        value={values}
        pattern={input.pattern}
        maxLength={input.max_len}
        minLength={input.min_len}
        onBlur={handlefocused}
        focused={focused.toString()}
        required
        onChange={onChange}
        onClick={onClick}
        className='input w-100 border-0 border-bottom border-2'
      >

      </input>
      <span className='error-message text-danger'>{input.error_msg}</span>
    </>
  )
}

export default Forminputs