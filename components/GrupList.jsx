import React, { useEffect, useState } from 'react'
import { FaUsers } from "react-icons/fa";
import { useUserStore } from '../lib/userStore';
import { api_base_url } from '../Helper';
import { useRouter } from 'next/router';

export default function GrupList() {
  const [datas, setDatas] = useState([])
  const { currentUser } = useUserStore()
  const router = useRouter()

  useEffect(()=>{
    const getData = async ()=>{
        await fetch(api_base_url + "/mygrups", {
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
              setDatas(data.result)
          })
        }

        getData()
}, [currentUser.id])

  return (
    <>
    {datas?.map((data)=>(
      <div onClick={()=>{ router.push(`/grupo/${data._id}`)}} key={data?._id} className='w-full py-2 flex flex-row justify-between items-end text-#666 cursor-pointer hover:bg-[#F5F5F5]'>
          <div className='flex items-center justify-start gap-2 pl-2'>
              <FaUsers size={24} color='gray' />
              <b>{data?.name}</b>
          </div>
          <i className='text-sm'>{ new Date(data.date).toDateString()}</i>
      </div>
    ))}
    </>
  )
}
