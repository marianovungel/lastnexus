"use client";
import React from 'react'
import { useUserStore } from "../../lib/userStore";
import { useRouter } from 'next/router';
import Image from 'next/image';

const AvatarULR = "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"

export default function MenuRight() {
  const { currentUser } = useUserStore()
  const router = useRouter()

  return (
    <div className="dropdown">
    <button className="dropbtn">
      {/* <FaUserCircle size={30} color="gray"/> */}
      <Image 
      src={currentUser?.avatar ? currentUser?.avatar : AvatarULR }
      alt="User"
      width={100}
      height={100}
      priority={true}
      className='w-8 h-8 rounded-full object-cover'

      />
      </button>
    <div className="dropdown-content p-0 rounded-md">
        <div onClick={()=> router.push("/profile#sobre")} className='w-full p-2 rounded-t-md font-semibold text-[#666] hover:cursor-pointer hover:bg-[#999]'>Meu Perfil</div>
        <div onClick={()=> router.push("/profile#colaborar")} className='w-full p-2 font-semibold text-[#666] hover:cursor-pointer hover:bg-[#999]'>Novo Artigo</div>
        <div onClick={()=> router.push("/profile#artigo")} className='w-full p-2 font-semibold text-[#666] hover:cursor-pointer hover:bg-[#999]'>Meus Artigos</div>
        <div onClick={()=> router.push("/profile#grupo")} className='w-full p-2  font-semibold text-[#666] hover:cursor-pointer hover:bg-[#999]'>Meus Grupos</div>
        <div onClick={()=> auth.signOut()} className='w-full p-2 rounded-b-md  font-semibold text-[#666] hover:cursor-pointer hover:bg-[#999]'>Sair</div>
    </div>
    </div>
  )
}
