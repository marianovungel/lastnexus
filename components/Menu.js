"use client";
import React from 'react'
import { IoMdSearch } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { MenuRight } from './index';
import { useUserStore } from '../lib/userStore';
import { useRouter } from 'next/router';
import Image from 'next/image';
// import LogoNexus from '@/images/logocortada.png';
// import BindText from '@/images/bt.png';
import BindText from '@/images/b.png';
import Left from './Left/Left';

function Menu() {
  const { supernotification } = useUserStore()
  const router = useRouter()
  
  const goTo = ()=>{
    router.push("/notification")
  }

  return (
    <header className=" sticky top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white h-20">
      <h1 className="ml-2 text-gray-700 text-xl md:hidden sm:hidden">BindText</h1>
      <Left />
      <Image 
        // src={LogoNexus}
        src={BindText}
        alt='Logo Nexto'
        className='cursor-pointer w-24 object-cover ml-6'
        fetchpriority="high"
        onClick={()=> router.push("/")} 
       />
      <div id='searchId' className="mx-5 md:mx-20 flex flex-grow items-center px-2 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md">
        <IoMdSearch size={30} color="gray" />
        <input type="text" placeholder="Search" className="flex-grow px-2 text-base bg-transparent outline-none" />
      </div>
      <div onClick={goTo} className="mr-2 border-0 relative flex items-center cursor-pointer h-10 w-8">
        <IoNotifications size={30} color="gray"/>
        {supernotification > 0 && (<i style={{fontSize: 9, padding:1}} className='bg-red-600 text-white rounded-full absolute top-0 right-0 min-w-4 flex justify-center items-center'>{supernotification > 99 ? "99+" : supernotification }</i>)}
      </div>
      <MenuRight />
  </header>
  )
}
export default Menu;