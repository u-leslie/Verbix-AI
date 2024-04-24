import React from 'react'
import { TypeAnimation } from 'react-type-animation';

const TypeAnimate = () => {
  return (
    <TypeAnimation
    sequence={[
      // Same substring at the start will only be typed out once, initially
      "Feel free to chat with VerbiX-AI ",
      1000, // wait 1s before replacing "Mice" with "Hamsters"
      "Chatting, learning, evolving... 💻",
      1000,
      '',
      1000,
      'Develop powered by AI 🦾',
      1000
    ]}
    wrapper="span"
    speed={50}
    style={{ fontSize: '2em', display: 'inline-block'  }}
    repeat={Infinity}
  />
  )
}

export default TypeAnimate
