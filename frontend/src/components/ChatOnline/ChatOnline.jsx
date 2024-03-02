import React from 'react'
import "./ChatOnline.css"

const ChatOnline = () => {
  return (
    <div className='chatOnline'>
    <div className='chatOnlineFreind'>
     <div className="chatOnlineImgContainer">
    <img className='chatOnlineImg' src='http://res.cloudinary.com/dpbh42kjy/image/upload/v1708864871/kk9y6ycii6xwvezxbvgx.jpg'/>
    <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">
            Osama
        </span>
    </div>
    <div className='chatOnlineFreind'>
     <div className="chatOnlineImgContainer">
    <img className='chatOnlineImg' src='http://res.cloudinary.com/dpbh42kjy/image/upload/v1708828557/kvmzgyam3h4pqagnym9t.jpg'/>
    <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">
            Rafat
        </span>
    </div>
    </div>
  )
}

export default ChatOnline