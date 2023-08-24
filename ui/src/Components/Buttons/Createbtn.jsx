import React, { useState } from 'react'
import Myform from '../Myform';
import { useNavigate } from 'react-router-dom';
const Createbtn = () => {
    const [form, setForm]= useState(false);
    const submit = useNavigate()
    const handleClick =(e)=>{
        setForm(true)
        e.preventDefault();
    }
    const handleSubmit = (e)=>{
      e.preventDefault();
      submit("/submittedform")


    }
  return (
    <div className='createform'>
        {form===true?<Myform />:<><button onClick={handleClick} className='createbtn'>Create +</button>
        <button className='showsubmitted' onClick={handleSubmit}>Show data</button></>}
      
    </div>
  )
}

export default Createbtn
