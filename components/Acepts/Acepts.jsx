import React from 'react'
import { MdArticle } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { useRouter } from "next/router";
import Image from 'next/image';
import Logo from '@/images/NEXUS.png';

export default function Acepts({ data }) {
  const router = useRouter()
  const goToDoc = ()=>{
    router.push(`/createDocs/${data?.link}`)
  }
  return (
    <div id='rejectedContainer' className='w-full flex flex-row items-center justify-between bg-blend-lighten gap-3 py-3 hover:bg-cyan-50'>
        <div className='flex flex-row items-center justify-start gap-3 px-3'>
            <Image src={Logo} alt='Logo Nexus plataform' className='w-20 h-20 rounded-full object-cover' />
            <div className='flex flex-col items-start justify-center gap-1'>
                <b className='font-medium'>{data?.usernotifyName}</b>
                <p>{data?.text}</p>
                <button onClick={goToDoc} className='px-3 py-2 rounded-3xl font-normal shadow-md text-[#666] border-sky-700 border-1 bg-white flex flex-row justify-center items-center gap-2'>Acesse agora <MdArticle size={24} className='text-sky-700' /></button>
            </div>
        </div>
        <div className='px-3 h-full flex flex-col items-end justify-center gap-2'>
        <small className='w-full flex flex-row justify-end text-end'>15 min</small>
            <BsThreeDots size={24} color='gray' />
        </div>
    </div>
  )
}
