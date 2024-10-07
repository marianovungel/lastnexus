import React from 'react'
import './ListItem.css'
import UserInfo from '../UserInfo/UserInfo'
import ChatList from '../ChatList/ChatList'

export default function ListItem() {
  return (
    <div className='list'>
      <UserInfo />
      <ChatList />
    </div>
  )
}
