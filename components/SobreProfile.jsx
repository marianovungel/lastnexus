import React from 'react'
import { FaUsersLine } from "react-icons/fa6";
import { MdDriveFileRenameOutline } from "react-icons/md";

export default function SobreProfile({ data }) {
    
  return (
    <div className='w-full py-3 flex flex-col justify-start items-start gap-3'>
        <div className='flex items-center justify-start gap-2 pl-2'>
            <img className='w-20 h20 rounded-full object-cover border-2 border-slate-200' src={data?.admPic} alt={data?.admName}  />
            <p>Administrador: <b>{data?.admName}</b></p>
        </div>
        <div className='flex items-center justify-start gap-2 pl-2'>
            <MdDriveFileRenameOutline size={22} color='gray' />
            <p>Nome do Grupo: <b>{data?.name}</b></p>
        </div>
        <div className='flex items-center justify-start gap-2 pl-2'>
            <FaUsersLine size={22} color='gray' />
            <p>Descrição: <b>{data?.desc}</b></p>
        </div>
    </div>
  )
}
