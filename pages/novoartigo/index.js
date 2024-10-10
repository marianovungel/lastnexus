import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useUserStore } from '@/lib/userStore'
import { api_base_url } from '@/Helper'
const AvatarULR = "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"

export default function NovoArtigo() {
  const router = useRouter();
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [colabItem, setColabItem] = useState("")
  const [colabs, setColabs] = useState([])
  const [colab, setColab] = useState([])
  const [publicc, setPublicc] = useState(true)

  const { currentUser, superUser } = useUserStore()

 

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
            uploadedBy: currentUser.id,
            autorId:currentUser.id,
            autorName:superUser.name,
            autorDesc:superUser.desc,
            colab:colab, 
            autorPic:currentUser.avatar,
            private:!publicc
          }),
        })
        .then((res)=> res.json())
          .then((data)=>{
              if(data.success){
                router.push(`/createDocs/${data.docId}`);
              }else{
                  toast.error("Erro ao criar o Documento")
              }
          })
      }

  }

  const getColaborador = ()=>{
    if(colabItem !== ""){
      fetch(api_base_url + "/search", {
        mode:"cors",
        method: "POST",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          key: colabItem,
        }),
      })
      .then((res)=> res.json())
        .then((data)=>{
            if(data.success){
              setColabs(data.users)
              console.log(data)
              setColabItem("")
            }else{
                toast.error("Erro ao criar o Documento")
            }
        })
    }
  }

  const AddColab = (userid)=>{
    var verifyId = colab.includes(userid);
    if(!verifyId){
      setColab([...colab, userid])
      toast.success("Colaborador Adicionado com Sucesso!")
      setColabs([])
      setColabItem("")
    }

  }

  return (
    <div className='w-2/4 pb-3 mt-3 mx-auto flex flex-col justify-start items-center gap-3'>
      <h1 className='text-xl font-semibold text-[#666] w-full border-[#ddd] border-b-2 text-center py-3'>Criar Novo Artigo</h1>
      <div className='w-full flex justify-between items-center gap-3'>
        <p>Tema do Artigo</p>
        <input onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Tema' className='p-2 outline-none shadow-md rounded-md w-3/4 text-[#666]' />
      </div>
      <textarea onChange={(e)=>setDesc(e.target.value)} name=""  maxLength={500} className='w-full h-52 max-h-52 p-2 outline-none shadow-md rounded-md text-[#666]' placeholder='Breve Resumo...'></textarea>
      {/* <div className='w-full flex flex-col items-center justify-start gap-3'>
        <p className='w-full text-start flex justify-start items-start'>Escolha o Tamplaite</p>
        <div className='w-full flex flex-row justify-start items-center gap-3 overflow-x-scroll'>
          <div className='w-44 min-w-44 h-36 bottom-0 shadow-md my-2 rounded-md relative cursor-pointer'>Template 1</div>
          <div className='w-44 min-w-44 h-36 bottom-0 shadow-md my-2 rounded-md relative cursor-pointer'>Template 2</div>
          <div className='w-44 min-w-44 h-36 bottom-0 shadow-md my-2 rounded-md relative cursor-pointer'>Template 2</div>
          <div className='w-44 min-w-44 h-36 bottom-0 shadow-md my-2 rounded-md relative cursor-pointer'>Template 2</div>
          <div className='w-44 min-w-44 h-36 bottom-0 shadow-md my-2 rounded-md relative cursor-pointer'>Template 3</div>
          <div className='w-44 min-w-44 h-36 bottom-0 shadow-md my-2 rounded-md relative cursor-pointer'>Template 4</div>
        </div>
      </div> */}
      <div className='w-full flex flex-col items-center justify-start gap-3 my-3'>
        <div className='w-full flex flex-row justify-between items-center gap-3'>
          <input onChange={(e)=>setColabItem(e.target.value)} type="text" placeholder='Nome ou E-mail' className='p-2 outline-none shadow-md rounded-md w-3/4 text-[#666]' />
          <button className='px-3 py-2 bg-[#23272F] text-white rounded-md bottom-0 shadow-md cursor-pointer' onClick={getColaborador}>Pesquisar</button>
        </div>

        
        {colabs?.map((colabMap)=>(
          <div key={colabMap.userid} className='w-full flex flex-row justify-between items-center gap-3 my-2 border-1 shadow-md rounded-lg py-3'>
            <div className='w-3/4 flex flex-row justify-start items-center gap-2'>
              <img src={colabMap.photo ? colabMap.photo : AvatarULR} alt="" className='w-10 h10 rounded-full border-none shadow-md' />
              <p className='w-full '>{colabMap.username}</p>
            </div>
            <button className='px-3 py-2 bg-[#23272F] text-white  bottom-0 shadow-md cursor-pointer' onClick={()=> AddColab(colabMap.userid)}>Adicionar</button>
          </div>
        ))}
        
      </div>
      <div className='w-full flex flex-row items-center justify-start gap-3'>
        <p>Público</p>
        <input checked={publicc} onChange={(e)=>setPublicc(e.target.checked)} className="" type="checkbox" name="" id=""  />
      </div>

      <div className='w-full flex justify-start items-center py-4'>
        <button className='px-4 py-2 bg-[#1f8ef1] text-bold text-white rounded-md bottom-0 shadow-md cursor-pointer' onClick={CreateDocument}>Criar Artigo</button>
      </div>
    </div>
  )
}
