import React from 'react'
import { FaVideo } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useUserStore } from "../../../lib/userStore";
const AvatarULR = "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"

export default function UserInfo() {
  const { currentUser } = useUserStore()
  return (
    <div className='UserInfo'>
      <div className="user">
        <img src={currentUser?.avatar ? currentUser?.avatar : AvatarULR } alt="" />
        <h2>{currentUser?.username}</h2>
      </div>
      <div className="icons">
        <HiOutlineDotsHorizontal size={16} color='#444' className='iconItems' />
        <FaVideo size={16} color='#444' className='iconItems' />
        <IoCall size={16} color='#444' className='iconItems' />
      </div>
    </div>
  )
}
