import React from 'react'
import { ContextProviderIo } from '../../Context/SocketContext';
import AppVideo from './AppVideo';


export default function VideoProvider() {
  return (
    <ContextProviderIo>
        <AppVideo />
    </ContextProviderIo>
  )
}
