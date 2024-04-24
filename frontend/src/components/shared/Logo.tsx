import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/openai.png'

const Logo = () => {
  return (
    <div className='flex items-center gap-2 m-4'>
      <Link to={"/"}>
        <img src={logo} width={"30px"} alt='' height={"30px"} className='img rotate'/>
      </Link>
      <div className='md:block sm:none xs:none mr-auto font-bold shadow-md'>
      <h2 className='font-sm'>VerbiX-AI</h2>
      </div>
    </div>
  )
}

export default Logo
