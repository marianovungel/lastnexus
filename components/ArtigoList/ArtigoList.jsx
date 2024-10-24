import React from 'react'
import { IoLockClosed } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
// import { useRouter } from 'next/router';

export default function ArtigoList({ data }) {
  // const router = useRouter()
  const OpenArgito = (docId)=>{
    window.location.replace(`https://nexus-editor.vercel.app/documents/${docId}`)
  }
  return (
    <>
    {data.map((data)=>(
      <div onClick={()=>OpenArgito(data._id)} key={data?._id} id='artigolist'  className='w-full py-2 flex flex-row justify-between items-end text-#666 cursor-pointer hover:bg-[#F5F5F5]'>
          <div className='flex flex-row justify-start items-center gap-2 pl-2'>
            <IoDocumentTextOutline  className='text-xl text-blue-700' />
            <b className='titleArtigoItemCss text-sm'>{data?.title}</b>
          </div>
          <div className='flex flex-row justify-end items-center gap-2'>
            <i className='text-xs'>{new  Date(data?.date).toDateString()}</i>
            <IoLockClosed size={28} color='gray' className='p-1 rounded-full bg-[#F5F5F5]' />
            <CiMenuKebab size={24} color='gray' className='cursor-pointer' />
          </div>
      </div>
    ))}
    {data.length === 0 && <div className='text-center'>Sem Artigo...</div>}
    </>
  )
}
