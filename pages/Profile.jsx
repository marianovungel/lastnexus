import React, { useEffect, useState } from 'react'
import { FaBook } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { SobreProfileUser, ArtigoList, GrupList } from '../components/index';
import { FaUsers } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from "../lib/userStore";
import { api_base_url } from '../Helper';
const AvatarULR = "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"


export default function Profile() {
    const [show, setShow] = useState("sobre")
    const [datas, setDatas] = useState([])
    const { currentUser, superUser } = useUserStore()
    const location = useLocation();

    const path = location.hash.split("#")[1]

    useEffect(()=>{
        const CheckPath = ()=>{
            if(path === ""){
                setShow("sobre")
            }else{
                setShow(path)
            }
        }
        CheckPath()
    }, [path])
    console.log(path)

    const navigate = useNavigate();

    const goToDocuments = () => {
        navigate('/documentos');
    };

    const MenuSetting =(menuItems)=>{
        setShow(menuItems)

        setTimeout(()=>{
            console.log(show)
        }, 3000)
    }

    useEffect(()=>{
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

            getData()
    }, [currentUser.id])

  return (
    <div className='w-full py-0'>
        <div id='fullscreenProfile' className='w-full py-4 shadow-md'>
            <div id='rejectedContainer' className='w-3/4 mx-auto flex flex-row items-center justify-between bg-blend-lighten gap-3 py-2'>
                <div className='flex flex-row items-center justify-start gap-3 px-3'>
                    <img className='w-40 h-40  rounded-full object-cover' src={currentUser?.avatar ? currentUser?.avatar : AvatarULR } alt="" />
                    <div className='flex flex-col items-start justify-center gap-1'>
                        <b className='font-medium text-3xl'>{currentUser?.username}</b>
                        <p>{currentUser?.email}</p>
                        <small>Desde: <i>01/2024</i></small>
                    </div>
                </div>
                <div className='px-3 h-full flex flex-col items-end justify-center gap-3'>
                    <FaUsers size={24} color='gray' className='cursor-pointer hover:text-[#000]' />
                    <div className='flex flex-row items-center justify-end gap-3'>
                        <button onClick={goToDocuments} className='px-3 py-2 bg-[#23272F] text-white text-bold flex flex-row justify-center items-center rounded-lg gap-2 border-0'><FaBook size={24} /> Todos Artigos</button>
                        <button className='px-3 py-2 text-[#23272F] text-bold flex flex-row justify-center items-center rounded-lg border-1 gap-2 border-[#23272F]'><FaUserEdit size={24} /> Editar</button>
                    </div>
                </div>
            </div>
            
        </div>

        <section className='w-3/5 flex flex-row h-full items-start justify-between gap-2 mx-auto mt-3'>
            <div className='w-60 flex flex-col justify-start items-start'>
                <h3 className='w-full flex justify-start pl-6 items-center py-2 hover:bg-cyan-50 text-xl text-[#111] font-medium bg-cyan-50 rounded-md cursor-pointer' onClick={()=> MenuSetting("sobre")}> Sobre</h3>
                <h3 className='w-full flex justify-start pl-6 items-center py-2 hover:bg-cyan-50 text-xl text-[#111] font-medium cursor-pointer' onClick={()=> MenuSetting("artigo")}>Artigos</h3>
                <h3 className='w-full flex justify-start pl-6 items-center py-2 hover:bg-cyan-50 text-xl text-[#111] font-medium cursor-pointer' onClick={()=> MenuSetting("grupo")} >Grupos</h3>
                <h3 className='w-full flex justify-start pl-6 items-center py-2 hover:bg-cyan-50 text-xl text-[#111] font-medium cursor-pointer' onClick={()=> MenuSetting("colaborar")} >Colaborações</h3>
            </div>

            <div id='borderLerftProfile' className='w-5/6 h-full '>
                { show ==="artigo" && (<ArtigoList data={datas} />)}
                { show ==="colaborar" && (<ArtigoList data={datas} />)}
                { show ==="grupo" && (<GrupList />)}
                { show ==="sobre" && (<SobreProfileUser data={superUser}/>)}
            </div>
        </section>
    </div>
  )
}
