import React from 'react'
import { ListItem, ChatItem, Detail } from '../components/index'
import { useChatStore } from '../lib/chatStore'

export default function MyChat() {
  const { chatId } = useChatStore()
  return (
    <div className='container'>
        <ListItem />
        { chatId && <ChatItem />}
        { chatId && <Detail />}
    </div>
  )
}
