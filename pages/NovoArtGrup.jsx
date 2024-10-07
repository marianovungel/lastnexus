import React, { useEffect, useState } from 'react'
import { api_base_url } from '../Helper'
import { useUserStore } from '../lib/userStore'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
const AvatarULR = "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"

export default function NovoArtGrup() {
  const navigate = useNavigate()
  const [datas, setDatas] = useState({})
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const location = useLocation();

    const path = location.pathname.split("/")[2]

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
            grupId: path,
          }),
        })
        .then((res)=> res.json())
          .then((data)=>{
              setDatas(data.grupo)
          })
        }
        getData()
}, [path])

 

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
            title:title,
            resumo:desc,
            uploadedBy: path,
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
                navigate(`/createDocs/${data.docId}`)
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

