import React from 'react'
import './Rejected.css'
import { BsThreeDots } from "react-icons/bs";

export default function Rejected() {
  return (
    <div id='rejectedContainer' className='w-full flex flex-row items-center justify-between bg-blend-lighten gap-3 py-3 hover:bg-cyan-50'>
        <div className='flex flex-row items-center justify-start gap-3 px-3'>
            <img className='w-20 h-20 rounded-full' src="./image/NEXUS.png" alt="" />
            <div className='flex flex-col items-start justify-center gap-1'>
                <b className='font-medium'>Nexus Artigo</b>
                <p>Desta vez não foste aceite para ser colaborador do artigo Sobre <b className='font-medium'>Desempennho computacional</b>...</p>
            </div>
        </div>
        <div className='px-3 h-full flex flex-col items-end justify-center gap-2'>
            <small className='w-full text-end'>32 min</small>
            <BsThreeDots size={24} color='gray' />
        </div>
    </div>
  )
}
