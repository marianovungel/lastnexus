import React, { useContext } from 'react'
import { SocketContext } from '../../Context/SocketContext'

export default function Notification() {
  const { call, callAccepted,  answerCall } = useContext(SocketContext)

  return (
    <>
      {call.isReceivedCall && !callAccepted && (
        <div className='flex justify-center'>
          <h1>{call.name} is calling: </h1>
          <button onClick={answerCall}>Answer</button>
        </div>
      )

      }
    </>
  )
}
