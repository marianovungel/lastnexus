"use client";
import React from 'react'
import { useUserStore } from "../../lib/userStore";
import { useRouter } from 'next/router';

const AvatarULR = "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"

export default function MenuRight() {
  const { currentUser } = useUserStore()
  const router = useRouter()

  return (
    <div className="dropdown">
    <button className="dropbtn">
      {/* <FaUserCircle size={30} color="gray"/> */}
      <img className='w-8 h-8 rounded-full object-cover' src={currentUser?.avatar ? currentUser?.avatar : AvatarULR } alt="" />
      </button>
    <div className="dropdown-content">
        <div onClick={()=> router.push("/profile#sobre")}>Meu Perfil</div>
        <div onClick={()=> router.push("/profile#colaborar")}>Novo Artigo</div>
        <div onClick={()=> router.push("/profile#artigo")}>Meus Artigos</div>
        <div onClick={()=> router.push("/profile#grupo")}>Meus Grupos</div>
    </div>
    </div>
  )
}
