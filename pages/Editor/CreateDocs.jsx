import { useNavigate, useParams } from 'react-router-dom'
import React, {useState, useRef, useEffect} from 'react';
// import JoditEditor from "jodit-pro-react";
import JoditEditor from 'jodit-react'
import { api_base_url } from '../../Helper';
import { useUserStore } from '../../lib/userStore';

export default function CreateDocs() {
    let {docsId} = useParams()
    const navigate = useNavigate();
    const editor = useRef(null)
    const [content, setContent] = useState('')
    const [error, setError] = useState("")
    const [showEditor, setShowEditor] = useState(false)
    const { currentUser } = useUserStore()


    const updateDoc = async ()=>{
        await fetch(api_base_url + "/uploadDoc", {
          mode:"cors",
          method: "POST",
          headers:{
            "Content-Type":"application/json",
          },
          body: JSON.stringify({
            userId: currentUser?.id,
            docId:docsId,
            content:content
          }),
        })
        .then((res)=> res.json())
          .then((data)=>{
              if(data.status === "success"){
                setError(data.message)
              }else{
                  setError("")
              }
          })
    }

    const getContent = async ()=>{
        fetch(api_base_url + "/getDoc", {
          mode:"cors",
          method: "POST",
          headers:{
            "Content-Type":"application/json",
          },
          body: JSON.stringify({
            userId: currentUser?.id,
            docId:docsId,
            content:content
          }),
        })
        .then((res)=> res.json())
          .then((data)=>{
              if(data.success === false){
                setError(data.message)
              }else{
                var colab = data?.doc?.colab;
                var verifyColab = colab.includes(currentUser?.id);
                
                if(verifyColab || data.doc.autorId === currentUser?.id){
                  setShowEditor(true)
                }else{
                  setTimeout(()=>{
                    navigate("/documentos")
                  }, 3000)
                }
                const PAGE_LIMIT = 3200; // Defina um limite de caracteres para a quebra de página

                let updatedContent = data.doc.content;
                const textLength = updatedContent.length;
                console.log(textLength)

                console.log(PAGE_LIMIT < textLength)

                if (textLength > PAGE_LIMIT) {
                  // Adiciona uma quebra de página após o limite
                  updatedContent = updatedContent.replace(new RegExp(`(.{${PAGE_LIMIT}})`, 'g'), '$1<!--pagebreak-->');
                }
                // setContent(data.doc.content)
                setContent(updatedContent)
              }
          })
    }

    useEffect(()=>{
      getContent();
    }, [currentUser?.id])

    const config = {
      readonly: false, // Defina como true para tornar o editor somente leitura
      // Adicione configurações adicionais conforme necessário
    };
    
  return (
    <>
    {showEditor ? (
      <div className='px-[100px] mt-3 mx-auto w-3/5  lg:w-1/2 md:w-3/4 sm:w-full sm:px-0'>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1} // tabIndex of textarea 
          // onChange={(e)=>{
          //   setContent(e.target.value)
          //   updateDoc()
          // }}
          onChange={(e)=>{setContent(e); updateDoc()}}
        />
      </div>
    ): <div className='w-full h-full flex justify-center items-start text-2xl pt-3'>Usuário Não Autorizado...</div>
    }

    </>
  )
}
