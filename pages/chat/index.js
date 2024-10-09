import React from 'react'
import { ChatItem, Detail, ListItem } from '@/components'
import { useChatStore } from '@/lib/chatStore'

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