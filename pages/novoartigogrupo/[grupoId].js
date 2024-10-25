import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api_base_url } from '@/Helper'
import { useRouter } from 'next/router'
import { v4 as uuidV4 } from "uuid"
import { useUserStore } from '@/lib/userStore'

export default function NovoArtGrup() {
  const [datas, setDatas] = useState({})
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const router = useRouter();
  const { grupoId } = router.query;

  const { currentUser, superUser } = useUserStore()

  useEffect(()=>{
    const getData = async ()=>{
        await fetch(api_base_url + "/getGrup", {
          mode:"cors",
          method: "POST",
          headers:{
            "Content-Type":"application/json",
          },
          body: JSON.stringify({
            grupId: grupoId,
          }),
        })
        .then((res)=> res.json())
          .then((data)=>{
              setDatas(data.grupo)
          })
        }
        getData()
}, [grupoId])

 

  const CreateDocument =()=>{

      if( title === "" || desc === "" ){
        toast.error("Título e o Resumo é Obrigatório!")
      }else{
        fetch(api_base_url + "/createDoc", {
          mode:"cors",
          method: "POST",
          headers:{
            "Content-Type":"application/json",
          },
          body: JSON.stringify({
            _id:`${uuidV4()}`,
            title:title,
            resumo:desc,
            uploadedBy: grupoId,
            autorId:currentUser.id,
            autorName:superUser.name,
            autorDesc:superUser.desc,
            colab:datas.membros, 
            autorPic:currentUser.avatar,
            private:true
          }),
        })
        .then((res)=> res.json())
          .then((data)=>{
              if(data.success){
                window.location.replace(`https://nexus-editor.vercel.app/documents/${data?.docId}`)
              }else{
                  toast.error("Erro ao criar o Documento")
              }
          })
      }

  }



  return (
    <div className='w-2/4 pb-3 mt-3 mx-auto flex flex-col justify-start items-center gap-3'>
      <div className='w-full flex justify-between items-center gap-3'>
        <p>Tema do Artigo</p>
        <input onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Tema' className='p-2 outline-none shadow-md rounded-md w-3/4 text-[#666]' />
      </div>
      <textarea onChange={(e)=>setDesc(e.target.value)} name=""  maxLength={500} className='w-full h-30 max-h-30 p-2 outline-none shadow-md rounded-md text-[#666]' placeholder='Breve Resumo...'></textarea>

      <div className='w-full flex justify-start items-center py-4'>
        <button className='px-4 py-2 bg-[#1f8ef1] text-bold text-white rounded-md bottom-0 shadow-md cursor-pointer' onClick={CreateDocument}>Criar Artigo</button>
      </div>
    </div>
  )
}

