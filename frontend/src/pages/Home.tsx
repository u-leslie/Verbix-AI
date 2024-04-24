import React from 'react'
import TypeAnimate from '../components/typo/typingAnimation'
import robot from '../assets/robott.png'
import chat from '../assets/chat.png'
import Footer from '../components/footer/Footer'

const Home = () => {
  return (
    <div className='w-[100%] h-[100%] mx-auto'>
      <div className='flex w-[100%] flex-col items-center justify-center mx-auto'>
        <div className='mt-3'>
          <TypeAnimate/>
        </div>
        <div className='w-[100%] block lg:flex gap-5 mt-10'>
        <img src={robot} alt="" width={"200px"} className='m-auto' />
        </div>
        <div className='flex w-[100%] mx-auto'>
       <img src={chat} style={{boxShadow:"-5px -5px 105px #004d56"}} alt="" className='flex m-auto w-[60%] rounded shadow-sm my-20'/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
