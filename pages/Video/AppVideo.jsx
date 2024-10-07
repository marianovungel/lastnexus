import React from 'react'
import { VideoPlayer, Options, Notification } from '../../components/MyVideoComp'

export default function AppVideo() {
  return (
    <div className='w-3/4 mt-3 mx-auto bg-slate-100 p-3 rounded-md'>
      <div className='text-center text-2xl'>Vídeo Chamada Page</div>
      <VideoPlayer />
      <Options>
        <Notification />
      </Options>
    </div>
  )
}
