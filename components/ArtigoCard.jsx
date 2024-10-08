import React, { useEffect, useState } from 'react'
// import { FaUsers } from "react-icons/fa";
// import { FaBook } from "react-icons/fa";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { api_base_url } from '../Helper';
import { useUserStore } from '../lib/userStore';
// import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ArtigoCard() {
    // const navigate = useNavigate()
    const [allText, setAllText] = useState("resumoDescArtigo")
    const [datas, setDatas] = useState([])
    const [fatchData, setFatchData] = useState(0)
    const { currentUser, superUser } = useUserStore()

    const setShowAllText =()=>{
        if(allText === "resumoDescArtigoall"){
            setAllText("resumoDescArtigo")
        }else{
            setAllText("resumoDescArtigoall")
        }
    }

    const getData = async () => {
    if (!currentUser || !currentUser.id) {
        console.error("Current user not found");
        return;
    }

    await fetch(api_base_url + "/docxs", {
        mode: "cors",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: currentUser.id,
        }),
    })
    .then((res) => res.json())
    .then((data) => {
        setDatas(data.docs);
    });
};

        // 1- Não Foi Aceito
        // 2- Foi Aceito
        // 1- Solicitação

    const SolicitarColaboracao = async (docId, title, autorName, autorId)=>{
        await fetch(api_base_url + "/colaborar", {
          mode:"cors",
          method: "POST",
          headers:{
            "Content-Type":"application/json",
          },
          body: JSON.stringify({
            userNotificated: autorId,  
            usernotifyName: autorName, 
            type: 3, 
            link: docId, 
            ArtigoName: title,
            usernotify: currentUser.id, 
            text: `${superUser.name} Solicitou Para Ser Colaborador No Seu Artigo ${title}`, 
          }),
        })
        .then((res)=> res.json())
          .then((data)=>{
              if(data){
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Colaboração Solicitado!",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  setFatchData((prov)=> prov + 1)
                // console.log(data)
              }
          })
        }

        useEffect(() => {
          if (currentUser) {
              getData();
          }
      }, [currentUser, fatchData]);

  return (
    <>
        {datas ? datas?.map((dt)=>(
            <div key={dt?._id} className='w-full flex flex-col items-center justify-start border-2 border-gray-100 rounded-md p-3 mb-3'>
                <div id='rejectedContainer' className='w-full mx-auto flex flex-row items-center justify-between bg-blend-lighten gap-3 py-3'>
                    <div className='flex flex-row items-center justify-start gap-3 px-3'>
                        <img className='w-20 h-20 rounded-full object-cover' src={dt?.autorPic} alt="" />
                        <div className='flex flex-col items-start justify-center gap-1'>
                            <b className='font-medium text-3xl '>{dt.autorName}</b>
                            <p>Atualizado: { new Date(dt?.lastUpdate).toDateString()}</p>
                            <small>Criando no dia: { new Date(dt?.date).toDateString()}</small>
                        </div>
                    </div>
                    {dt.autorId === currentUser.id ?
                    (
                        <button className='bg-[#004AAD] px-3 py-2 text-white text-md flex flex-row justify-center items-center rounded-lg border-0'>Acessar</button>
                    ) : (
                        <button onClick={()=> SolicitarColaboracao(dt?._id, dt?.title, dt?.autorName, dt?.autorId)} className='bg-[#004AAD] px-3 py-2 text-white text-md flex flex-row justify-center items-center rounded-lg border-0'>Colaborar</button>
                    )}
                </div>
                <h2 className='text-center text-2xl text-black py-2 w-full'>{dt?.title}</h2>
                <p className='resumoDescArtigo'>
                    {dt.resumo}
                </p>
                <p onClick={setShowAllText} className='text-sky-700 cursor-poiter text-xl flex flex-row justify-center items-center gap-2'>
                    ver mais
                    {allText === "resumoDescArtigo" ? (<IoIosArrowDropdownCircle size={24} color='gray' />) : <IoIosArrowDropupCircle size={24} color='gray' /> }
                </p>
            </div>

        )) : "Carregando..."}
    </>
  )
}
