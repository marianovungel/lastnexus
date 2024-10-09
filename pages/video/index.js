import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation'

import styles from '@/styles/home.module.css'
import { useState } from 'react';

export default function Home() {
  const router = useRouter()
  const [roomId, setRoomId] = useState('')

  const createAndJoin = () => {
    const roomId = uuidv4()
    router.push(`/video/${roomId}`)
  }

  const joinRoom = () => {
    if (roomId) router.push(`/video/${roomId}`)
    else {
      alert("Please provide a valid room id")
    }
  }
  return (
    <div className={styles.homeContainer}>
        <h1>Crie ou Participe de Reunião</h1>
        <div className={styles.enterRoom}>
          <input placeholder='Código da Sala' value={roomId} onChange={(e) => setRoomId(e?.target?.value)}/>
          <button className='px-4 py-2 bg-[#1f8ef1] text-bold text-white rounded-md bottom-0 shadow-md cursor-pointer' onClick={joinRoom}>Join Room</button>
        </div>
        <span  className={styles.separatorText} >--------------- OR ---------------</span>
        <button className='px-4 py-2 bg-[#1f8ef1] text-bold text-white rounded-md bottom-0 shadow-md cursor-pointer' onClick={createAndJoin}>Create a new room</button>
    </div>
  )
}
