import React from 'react'
import Header from '../Components/Header'

const About = () => {
  return (
<>
<Header/>
<div className=' border-slate-300 border-2  max-w-lg mx-auto mt-5 p-3'>
  <h3 className='font-serif font-bold text-center'>
  HELLO THIS IS A MERN AUTHENTICATION PROJECT
  </h3>
  <p className='p-5' >
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
  </p>
</div>
</>
  )
}

export default About
