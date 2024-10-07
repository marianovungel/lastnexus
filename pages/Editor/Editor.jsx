import React, { useEffect, useState } from 'react'
import { MdNoteAdd } from "react-icons/md";
import { Docs } from '../../components/index';
import { MdOutlineTitle } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { api_base_url } from '../../Helper';
import { toast } from 'react-toastify';
import { useUserStore } from '../../lib/userStore';


export default function Editor() {
  const navigate = useNavigate()
  const [createModelShow, setCreateModelShow] = useState(false)
  const [title, setTitle] = useState("")
  const [error, setError] = useState("")
  const [datas, setDatas] = useState([])
  const [allData, setAllData] = useState([])
  const { currentUser } = useUserStore()
  console.log(allData)
  
  const createDoc = async ()=>{
    if(title === ""){
      setError("Digite o título")
    }else{
      fetch(api_base_url + "/createDoc", {
        mode:"cors",
        method: "POST",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          docName:title,
          userId: currentUser.id,
        }),
      })
      .then((res)=> res.json())
        .then((data)=>{
            if(data.success){
              setCreateModelShow(false)
              navigate(`/createDocs/${data.docId}`)
            }else{
                setError(data.message)
                toast.error(error)
            }
        })
    }
  }

  
  
  const getData = async ()=>{
    await fetch(api_base_url + "/getAllDocs", {
      mode:"cors",
      method: "POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        userId: currentUser.id,
      }),
    })
    .then((res)=> res.json())
      .then((data)=>{
          setDatas(data.docs)
      })
    }

  const getDocCol = async ()=>{
    await fetch(api_base_url + "/alldocs", {
      mode:"cors",
      method: "POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        userId: currentUser.id,
      }),
    })
    .then((res)=> res.json())
      .then((data)=>{
        console.log(data.docs)
        setAllData(data.docs)
      })
    }

useEffect(()=>{
  getData()
  getDocCol()
}, [])

  return (
    <>
      <div className="flex items-center justify-between px-[100px]">
        <h3 className="mt-7 mb-3 text-3xl">Todos Artigos</h3>
          <button className="btnBlue" onClick={()=>navigate("/novo-artigo")}>
            <i><MdNoteAdd /></i> 
            Criar Novo Artigo
          </button>
          {/* <button className="btnBlue" onClick={()=>{
            setCreateModelShow(true);
            document.getElementById('title').focus()
            }}>
            <i><MdNoteAdd /></i> 
            Create New Document
          </button> */}
      </div>

      <div key={1} className="allDocs px-[100px] mt-4">
        {
          datas? datas.map((el, index)=>{
            return (
              <>
                <Docs docs={el} docId={`doc-${index + 1}`} />
              </>
            )
          }) : "Sem Documentos..."
        }

        {
          datas.length < 1 && <p>Sem Documento...</p>
        }

      </div>

      {createModelShow 
      ? <>
        <div className="createDocsModelCon fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,.3)] w-screen h-screen flex flex-col items-center justify-center">
        <div className="createDocsModel bg-[#fff] rounded-lg w-[35vw] h[25vh] p-[15px]">
          <h3 className='text-[20px]'>Criar Novo Artigo</h3>

          <div className='inputCon mt-3'>
            <p className="text-[14px] text-[#808080]">Título</p>
            <div className="inputBox w-[100%]">
              <i><MdOutlineTitle /></i>
              <input onChange={(e)=>{setTitle(e.target.value)}} value={title} type="text" placeholder='Title' id='title' name='title' required />
            </div>
          </div>

          <div className="flex items-center gap-2 justify-between w-full my-3">
            <div onClick={createDoc} className="btnBlue !min-w-[49%]">Criar Novo Artigo</div>
            <div onClick={()=>{setCreateModelShow(false)}} className="p-[10px] bg-[#D1D5DB] text-black rounded-lg border-0 cursor-pointer min-w-[49%] flex justify-center items-center">Cancel</div>
          </div>
        </div>
      </div>
      </>
      :""
      }
      
    </>
  )
}
