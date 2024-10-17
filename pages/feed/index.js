"use client";
import React from 'react'
import { PiReadCvLogoFill } from "react-icons/pi";
import { IoMdSearch } from "react-icons/io";
import { ArtigoCard } from '@/components';
import { useUserStore } from '@/lib/userStore';
import Image from 'next/image';

export default function Feed() {
  const { superUser } = useUserStore()
  console.log(superUser)
  return (
    <div className='w-3/4 mx-auto my-3 flex flex-row items-start justify-between'>
        <div className="w-1/5 rounded-md shadow-md p-3 flex flex-col justify-center items-start">
          <h1 className='text-lg text-[#222] py-2 font-semibold font-mono'>Colaboração</h1>
          <p className='text-start'>Solicite colaboração em artigos de sua ária de interece para poderes contribuir com a comunidade científica do mundo inteiro.</p>
        </div>
        <div className="w-2/4 flex flex-col justify-start items-center gap-3">
            <header className="top-0 flex items-center w-full py-2 px-2 shadow-md bg-white h-24 rounded-md">
                <PiReadCvLogoFill size={28} color='#004AAD'/>
                <h1 className="ml-2 text-gray-700 text-xl md:hidden sm:hidden">NEXUS</h1>
                <div id='searchId' className="mx-5 md:mx-20 flex flex-grow items-center px-2 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md">
                    <IoMdSearch size={30} color="gray" />
                    <input type="text" placeholder="Pesquisar artigos" className="flex-grow px-2 text-base bg-transparent outline-none rounded-5xl" />
                </div>
            </header>
            <div className='cardsScroll'>
              <ArtigoCard />
            </div>
        </div>
        <div className="w-1/5 rounded-md shadow-md p-3 flex flex-col justify-center items-center">
          {/* <img src={superUser?.avatar} alt="logo nexus plataforma" className="w-20 rounded-full"/> */}
          <Image
                src={superUser?.avatar ? superUser?.avatar : AvatarULR }
                alt="User"
                width={100}
                height={100}
                priority={true}
                fetchpriority="high"
                className='w-20 h-20 rounded-full'
              />
          <h2 className='pt-2 text-lg font-semibold text-[#333] font-mono'>{superUser?.username}</h2>
          <small>{superUser?.desc ? superUser?.desc : `Desde: ${new Date(superUser?.date).toDateString()}`}</small>
          <small>Área de interesse</small>
        </div>
    </div>
  )
}
