import React from 'react'
import { IoSchoolSharp } from "react-icons/io5";
import { LiaSchoolSolid } from "react-icons/lia";
import { FaHeart } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiReadCvLogoFill } from "react-icons/pi";
import { TbWriting } from "react-icons/tb";
import { FaInstagramSquare, FaFacebookSquare, FaLinkedin, FaUserGraduate  } from "react-icons/fa";

export default function SobreProfileUser({ data }) {
  return (
    <div className='w-full py-3 flex flex-col justify-start items-start gap-3'>
        <div className='flex items-center justify-start gap-2 pl-2'>
            <TbWriting size={22} color='gray' />
            <p>Descrição: { data?.desc && data?.desc } </p>
        </div>
        <div className='flex items-center justify-start gap-2 pl-2'>
            <IoSchoolSharp size={22} color='gray' />
            <p>Formação Superior: { data?.formacaoSuperior && data?.formacaoSuperior } </p>
        </div>
        <div className='flex items-center justify-start gap-2 pl-2'>
            <LiaSchoolSolid size={22} color='gray' />
            <p>Grau máximo de formação: { data?.formacaoGrau && data?.formacaoGrau }</p>
        </div>
        <div className='flex items-center justify-start gap-2 pl-2'>
            <FaUserGraduate size={22} color='gray' />
            <p>Área de Formação: { data?.areaFormacao && data?.areaFormacao }</p>
        </div>
        <div className='flex items-center justify-start gap-2 pl-2'>
            <FaHeart size={22} color='gray' />
            <p>Área de Interece: { data?.interece && data?.interece }</p>
        </div>
        <div className='flex items-center justify-start gap-2 pl-2'>
            <MdEmail size={22} color='gray' />
            <p>Email: { data?.email && data?.email }</p>
        </div>
        <div className='flex items-center justify-start gap-2 pl-2'>
            <PiReadCvLogoFill size={22} color='gray' />
            <p>Lattes: { data?.littes && data?.littes }</p>
        </div>
        <div className='flex items-center justify-start gap-2 pl-2'>
            <FaInstagramSquare size={22} color='gray' />
            <p>Instagram: { data?.insta && data?.insta }</p>
        </div>
        <div className='flex items-center justify-start gap-2 pl-2'>
            <FaLinkedin  size={22} color='gray' />
            <p>Linkedin: { data?.linkedin && data?.linkedin }</p>
        </div>
        <div className='flex items-center justify-start gap-2 pl-2'>
            <FaFacebookSquare size={22} color='gray' />
            <p>Facebook: { data?.facebook && data?.facebook }</p>
        </div>
    </div>
  )
}
