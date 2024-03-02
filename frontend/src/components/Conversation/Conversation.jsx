import React from 'react'
import "./Conversation.css"

const Conversation = ({elem}) => {
  return (
    <div className='conversation'>
        <img className='conversationImg' src="http://res.cloudinary.com/dpbh42kjy/image/upload/v1708864871/kk9y6ycii6xwvezxbvgx.jpg"/>
        <span className='conversationName'>Osama</span>
    </div>
  )
}

export default Conversation