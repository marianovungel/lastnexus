import React, { useEffect } from 'react'
import { ChatItem, Detail, ListItem } from '@/components'
import { useChatStore } from '@/lib/chatStore'
import { useRouter } from 'next/router';
import { useUser } from '@/context/UseContext';

export default function MyChat() {
  const { chatId } = useChatStore()
  const { user } = useUser();
  const router = useRouter();

  useEffect(()=>{
    const VerifyUser =()=>{
      if(!user){
        router.push("/login");
      }
    }

    VerifyUser()
  }, [])
  return (
    <div className='container'>
        <ListItem />
        { chatId && <ChatItem />}
        { chatId && <Detail />}
    </div>
  )
}