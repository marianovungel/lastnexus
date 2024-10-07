import React, { useContext, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { SocketContext } from '../../Context/SocketContext'
import { RxClipboardCopy } from "react-icons/rx";

export default function Options( { children } ) {
  const { me, callAccepted, name, setName, callEnded, callUser, leaveCall } = useContext(SocketContext)
  const [idToCall, setIdToCall] = useState("")
  return (
    <div>
      <div className='w-1/2 mx-auto flex justify-center items-center gap-3'>
        <div className='w-2/5 flex flex-col justify-center items-center gap-2'>
          <label htmlFor="Name" className='w-full flex justify-start text-md'>Account Info</label>
          <input className='w-full px-2 py-2 rounded-md' type="text" name='Name' id='Name' onChange={(e)=> setName(e.target.value)} value={name} />
          <CopyToClipboard text={me} className="w-full text-white bg-cyan-300 rounded-md py-2 flex justify-center items-center gap-3">
            <button> <RxClipboardCopy /> Copiar Id</button>
          </CopyToClipboard>
        </div>
        <div className='w-2/5 flex flex-col justify-center items-center gap-2'>
          <label htmlFor="idToCall" className='w-full flex justify-start text-md'>Account Info</label>
          <input className='w-full px-2 py-2 rounded-md' type="text" name='idToCall' id='idToCall' onChange={(e)=> setIdToCall(e.target.value)} value={idToCall} />
          {
            callAccepted && !callEnded ? (
              <button className='w-full text-white bg-red-400 rounded-md py-2 flex justify-center items-center gap-3 ' onClick={leaveCall}>Desligar</button>
            ) : (
              <button className='w-full text-white bg-cyan-300 rounded-md py-2 flex justify-center items-center gap-3' onClick={()=> callUser(idToCall)}>Chamar</button>
            )
          }
        </div>
        { children }
      </div>
    </div>
  )
}
