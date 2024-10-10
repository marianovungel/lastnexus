import { useRouter } from 'next/router'
import React from 'react'
import { RiMenuFill } from 'react-icons/ri'
import styles from '@/components/Left/index.module.css'
import { IoHome } from "react-icons/io5";
import { RiPagesFill } from "react-icons/ri";
import { IoMdChatboxes } from "react-icons/io";

export default function Left() {
    const router = useRouter()
  return (
    <div className={styles.dropdown}>
        <button className={styles.dropbtn}><RiMenuFill  size={30} color='gray' /></button>
        <div className={styles.dropdowncontentft}>
            <div onClick={()=> router.push("/")} className='w-full flex justify-start items-center gap-3 p-2 rounded-t-md font-semibold text-[#666] hover:cursor-pointer hover:bg-[#999]'><IoHome size={18} color='gray' /> <p>Home</p></div>
            <div onClick={()=> router.push("/feed")} className='w-full flex justify-start items-center gap-3 p-2 font-semibold text-[#666] hover:cursor-pointer hover:bg-[#999]'><RiPagesFill size={18} color='gray' /> <p>Feed</p></div>
            <div onClick={()=> router.push("/chat")} className='w-full flex justify-start items-center gap-3 p-2 font-semibold text-[#666] hover:cursor-pointer hover:bg-[#999] rounded-b-md'><IoMdChatboxes size={18} color='gray' /> <p>Chat</p></div>
        </div>
    </div>
  )
}
