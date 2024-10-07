import React, { useState } from 'react'
import './MenuLeft.css'
import { Link } from 'react-router-dom';
import { RiMenuFold3Line2, RiMenuFill  } from "react-icons/ri";

export default function MenuLeft() {
    const [openVariable, setopenVariable] = useState(false)
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
            <Link to="/">Home</Link>
            <Link to="/feed">Feed</Link>
            <Link to="/chat">Chat</Link>
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
