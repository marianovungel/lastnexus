"use client";
import { useRouter } from "next/router";
import { FaBook } from "react-icons/fa";


export default function WellCome() {
  const router = useRouter()
  const goTo = ()=>{
    router.push("/novoartigo")
  }
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
          <div onClick={goTo} className='px-7 py-3 bg-[#23272F] text-white text-bold flex flex-row justify-center items-center gap-2 rounded-lg border-0 cursor-pointer'><FaBook size={24} /> Novo Artigo</div>
          <button className='px-7 py-3 text-[#23272F] text-bold flex flex-row justify-center items-center gap-2 rounded-lg border-2 border-slate-800'>
            {/* <FcGoogle size={24} /> */}
            Fazer login
          </button>
        </div>
      </section>
    </div>
  )
}


