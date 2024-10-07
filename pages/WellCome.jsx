import React from 'react'
import { FaBook } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function WellCome() {
  return (
    <div className='m-0 p-0 w-screen'>
      <section className='w-3/4 py-28 mx-auto flex flex-col items-center justify-center'>
        <h1 id='headerWellcome'>Plataforma colaborativa</h1>
        <h1 id='headerWellcome'>para escrever artigos científico</h1>
        <p 
          style={{color:"#666"}}
          className=' font-medium text-3xl py-8'>
          Crie grupos, participe de reuniões e colabore na escrita de artigos acadêmicos.
        </p>
        <div className='flex flex-row items-center justify-center gap-8 py-8'>
          <Link to="/novo-artigo" className='px-7 py-3 bg-[#23272F] text-white text-bold flex flex-row justify-center items-center gap-2 rounded-lg border-0'><FaBook size={24} /> Novo Artigo</Link>
          <button className='px-7 py-3 text-[#23272F] text-bold flex flex-row justify-center items-center gap-2 rounded-lg border-1 border-[#23272F]'>
            {/* <FcGoogle size={24} /> */}
            Fazer login
          </button>
        </div>
      </section>
    </div>
  )
}


