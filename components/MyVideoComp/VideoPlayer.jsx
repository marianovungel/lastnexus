import React, { useContext } from 'react'
import { SocketContext } from '../../Context/SocketContext'

export default function VideoPlayer() {
  const { call, callAccepted, myVideo, userVideo, stream, name, callEnded } = useContext(SocketContext)
  return (
    <div className='py-6 flex justify-center gap-5 items-center'>
      {
        stream && (
        <div className='border-gray-500 rounded-lg bg-slate-400 w-2/5'>
          <small>{name || 'Name'}</small>
          <video playsInline muted ref={myVideo}  className='w-full h-1/5 rounded-lg'/>
        </div>
        )
      }
      {
        callAccepted && !callEnded && (
        <div className='border-gray-500 rounded-lg bg-slate-400 w-2/5'>
          <small>{call.name || 'Name'}</small>
          <video playsInline muted ref={userVideo}  className='w-full h-1/5 rounded-lg'/>
        </div>
        )
      }
    </div>
  )
}
