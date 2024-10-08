import React from 'react'
import { BsThreeDots } from "react-icons/bs";
import { FaRegCircleXmark } from "react-icons/fa6";
import { FaRegCircleCheck } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { api_base_url } from '../../Helper';
import { useUserStore } from '../../lib/userStore';
import Swal from 'sweetalert2';
import {db} from '../../lib/firebase'
import { arrayUnion, collection, doc,  serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import Image from 'next/image';
import Logo from '@/images/NEXUS.png';

export default function Solicitation({ data }) {
    const { currentUser, superUser } = useUserStore()
    // console.log(data)

    const handleAdd = async ()=>{
      const chatRef = collection(db, "chats")
      const userChatsRef = collection(db, "userchats")
  
      try {
        const newChatRef = doc(chatRef)
  
        const createdChat = await setDoc(newChatRef, {
          createdAt: serverTimestamp(),
          messages: []
        })
        console.log(createdChat)
  
        await updateDoc(doc(userChatsRef, data?.usernotify), {
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: currentUser.id,
            updatedAt: Date.now(),
          })
        })
        await updateDoc(doc(userChatsRef, currentUser.id), {
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: data?.usernotify,
            updatedAt: Date.now(),
          })
        })
        
  
      } catch (error) {
        toast.error("Erro ao criar chat ", error)
      }
    }

    const RecuseNotification = async ()=>{
      await fetch(api_base_url + "/colaborar", {
        mode:"cors",
        method: "POST",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          userNotificated: data.usernotify,  
          usernotifyName: superUser.name, 
          type: 1, 
          link: "", 
          ArtigoName: data.ArtigoName,
          usernotify: currentUser.id, 
          text: `Desta vez não foste aceite para ser colaborador do artigo ${data.ArtigoName}`, 
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
              // console.log(data)
            }
        })
      }
    
    const RegectSolicitation = async ()=>{
        await fetch(api_base_url + "/reject", {
          mode:"cors",
          method: "POST",
          headers:{
            "Content-Type":"application/json",
          },
          body: JSON.stringify({
            notifyId: data?._id,
          }),
        })
        .then((res)=> res.json())
          .then((data)=>{
              if(data.notification){
                toast.success("Solicitação Rejeitada com sucesso!")
              }
          })

          await RecuseNotification()
        }


        const AceitoNotification = async ()=>{
          await fetch(api_base_url + "/colaborar", {
            mode:"cors",
            method: "POST",
            headers:{
              "Content-Type":"application/json",
            },
            body: JSON.stringify({
              userNotificated: data.usernotify,  
              usernotifyName: superUser.name, 
              type: 2, 
              link: data?._id, 
              ArtigoName: data.ArtigoName,
              usernotify: currentUser.id, 
              text: `Tu foi aceito para ser colaborador do artigo Sobre ${data.ArtigoName}`, 
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
                  // console.log(data)
                }
            })

            await handleAdd()
          }

    const AceptSolicitation = async ()=>{
        await fetch(api_base_url + "/aceptcolab", {
          mode:"cors",
          method: "POST",
          headers:{
            "Content-Type":"application/json",
          },
          body: JSON.stringify({
            colaborador:data?.usernotify,
            docId: data?.link,
            notifyId:data?._id
          }),
        })
        .then((res)=> res.json())
          .then((data)=>{
              if(data.notification){
                toast.success("Solicitação Aceito com sucesso!")
              }
          })

          await AceitoNotification()
        }
  return (
    <div id='rejectedContainer' className='w-full flex flex-row items-center justify-between bg-blend-lighten gap-3 py-3 hover:bg-cyan-50'>
        <div className='flex flex-row items-center justify-start gap-3 px-3'>
            <Image src={Logo} alt='Logo Nexus plataform' className='w-20 h-20 rounded-full object-cover' />
            <div className='flex flex-col items-start justify-center gap-1'>
                <b className='font-medium'>{data.usernotifyName}</b>
                <p>{data.text}</p>
            </div>
        </div>
        <div className='px-3 h-full flex flex-col items-end justify-center gap-3'>
            <BsThreeDots size={24} color='gray' />
            <div className='flex flex-row items-center justify-end gap-3'>
                <FaRegCircleXmark size={35} onClick={RegectSolicitation} className='cursor-pointer' />
                <FaRegCircleCheck size={35} onClick={AceptSolicitation} className='text-sky-700 cursor-pointer' />
            </div>
        </div>
    </div>
  )
}
