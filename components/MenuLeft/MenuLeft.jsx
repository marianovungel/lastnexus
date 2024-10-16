"use client";
import React, { useState } from 'react'
import { RiMenuFold3Line2 } from "react-icons/ri";
import { useRouter } from 'next/router';
import { PiChatDotsFill, PiChatSlashFill } from "react-icons/pi";
import ChatGrup from '../ChatGrup/ChatGrup';
import { useUserStore } from '@/lib/userStore';
import io from 'socket.io-client';

const socket = io.connect("https://chat-socket-io-backend-eshj.onrender.com/")

export default function MenuLeft({grup, room}) {
    const [openVariable, setopenVariable] = useState(false)
    const router = useRouter()
    const { currentUser } = useUserStore()

    const joinRoom = () =>{
        if(currentUser?.username !== "" && room !== ""){
        socket.emit("join_room", room);
        }
    }


    function openNav() {
        joinRoom()
        setopenVariable(true)
        document.getElementById("mySidebar").style.width = "300px";
        document.getElementById("main").style.marginLeft = "300px";
        
        const larguraDisponivel = window.innerWidth;
        
        if(larguraDisponivel < 890){
            document.getElementById("nexusId").style.display = "none";
        }
      }
      
      function closeNav() {
        setopenVariable(false)
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";

        const larguraDisponivel = window.innerWidth;
        
        if(larguraDisponivel < 890){
            document.getElementById("nexusId").style.display = "flex";
        }
      }

  return (
    <div className='absolute right-3'>
        <div className='flex items-center'>
            <div id="mySidebar" className="sidebar">
                <div className='flex items-center justify-between w-full border-b-2 border-slate-[#666] py-3'>
                    <div className='text-lg pl-2 font-semibold text-[#666]'>{grup ? grup : "Chat Name"}</div>
                    <button className="openbtn flex items-center justify-center mr-3" onClick={closeNav} id='nexusId' >
                        <PiChatSlashFill  color='gray' size={25} />
                    </button>
                </div>
                <ChatGrup socket={socket} username={currentUser?.username} room={room} />
                {/* <div onClick={()=> router.push("/")}>Home</div>
                <div onClick={()=> router.push("/feed")}>Feed</div>
                <div onClick={()=> router.push("/chat")}>Chat</div> */}
            </div>

            <div id="main">
                {openVariable ? (
                    <button className="openbtn flex items-center justify-center mr-3" onClick={closeNav} id='nexusId' >
                        <RiMenuFold3Line2 color='gray' size={30} />
                    </button>
                ):(
                    <button className="openbtn flex items-center justify-center mr-3" onClick={openNav} id='nexusId' >
                        <PiChatDotsFill  size={30} color='gray' />
                    </button>
                )}
                
            </div>
        </div>
    </div>
  )
}
