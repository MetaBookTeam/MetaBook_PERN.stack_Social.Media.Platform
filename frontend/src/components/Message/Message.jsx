import React from 'react'
import "./Message.css"

const Message = ({own}) => {
  return (
    <div className={own ?"message own": "message"}>
<div className='messageTop'>
    <img className='messageImg'
    src='http://res.cloudinary.com/dpbh42kjy/image/upload/v1708864871/kk9y6ycii6xwvezxbvgx.jpg'/>
    <p className='messageText'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto omnis error natus modi nobis </p>
</div>
<div className='messageBottom'>1 hour ago</div>
    </div>
  )
}

export default Message