"use client";
import React, { useState } from 'react'
import { RiMenuFold3Line2, RiMenuFill  } from "react-icons/ri";
import { useRouter } from 'next/router';

export default function MenuLeft() {
    const [openVariable, setopenVariable] = useState(false)
    const router = useRouter()

    function openNav() {
        setopenVariable(true)
        document.getElementById("mySidebar").style.width = "150px";
        document.getElementById("main").style.marginLeft = "150px";
        
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
    <div className='flex items-center'>
        <div id="mySidebar" className="sidebar">
            <div onClick={()=> router.push("/")}>Home</div>
            <div onClick={()=> router.push("/feed")}>Feed</div>
            <div onClick={()=> router.push("/chat")}>Chat</div>
        </div>

        <div id="main">
            {openVariable ? (
                <button className="openbtn flex items-center justify-center mr-3" onClick={closeNav} id='nexusId' >
                    <RiMenuFold3Line2 color='gray' size={30} />
                </button>
            ):(
                <button className="openbtn flex items-center justify-center mr-3" onClick={openNav} id='nexusId' >
                    <RiMenuFill  size={30} color='gray' />
                </button>
            )}
            
        </div>
    </div>
  )
}
