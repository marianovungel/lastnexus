import React, { useEffect, useState } from 'react'
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import { Acepts, Rejected, Solicitation } from '@/components';
import { api_base_url } from '@/Helper';
import { useUserStore } from '@/lib/userStore';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UseContext';

export default function Notification() {
  const [show, setShow] = useState(false)
  const [datas, setDatas] = useState([])
  const { currentUser } = useUserStore()
  const router = useRouter()
  const { user } = useUser();
    
    useEffect(()=>{
        const VerifyUser =()=>{
        if(!user){
            router.push("/login");
        }
        }

        VerifyUser()
    }, [])

  const setGerenciar = () => {
    setShow(!show);
  }

  const getData = async () => {
    // Make sure currentUser is defined and has an ID
    if (!currentUser || !currentUser.id) {
      console.error("User not found or user data not loaded");
      return;
    }

    // Fetch notifications if the user ID is available
    await fetch(api_base_url + "/noticicadas", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser.id, // Safe to access currentUser.id here
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDatas(data.notification);
      })
      .catch((error) => console.error("Error fetching notifications:", error));
  }

  useEffect(() => {
    if (currentUser) {
      getData(); // Call getData only when currentUser is defined
    }
  }, [currentUser]); // The effect runs again if currentUser changes

  return (
    <div className='w-10/12 relative mx-auto mt-3 flex flex-row justify-center gap-10 items-start'>
      <section className='w-1/4 flex flex-col justify-center items-center border-2 border-[#f5f5f5] rounded-lg'>
        <div className='w-full rounded-t-lg py-3 flex flex-col gap-2 items-center justify-center'>
          <h3 className='text-black font-medium text-xl text-center'>Gerencie suas notificações</h3>
          <p onClick={setGerenciar} className='text-sky-700 font-medium text-lg cursor-pointer text-center'>Visualizar configurações</p>
        </div>
        {show && (
          <div style={{ border: "none", borderTopWidth: 2, borderTopColor: "#F5F5F5" }} className='w-full py-2 flex flex-col items-center justify-start gap-3'>
            <div className='w-4/5 flex flex-row items-center gap-3 justify-start cursor-pointer'>
              <FaArrowAltCircleDown size={24} color='gray' />
              <h4 className='text-lg font-medium text-[#666]'>Mais recente</h4>
            </div>
            <div className='w-4/5 flex flex-row items-center gap-3 justify-start cursor-pointer'>
              <FaArrowAltCircleUp size={24} color='gray' />
              <h4 className='text-lg font-medium text-[#666]'>Mais antigo</h4>
            </div>
          </div>
        )}
      </section>

      <section style={{ width: "70%" }} className='flex flex-col justify-start items-center gap-3'>
        <header className='w-full p-3 flex flex-row justify-start items-center gap-3 rounded-xl border-[#F5F5F5] border-1 bg-white'>
          <button className='text-white font-medium text-sm bg-sky-700 py-2 px-3 rounded-3xl '>Todos</button>
          <button className='text-[#23272F] hover:bg-cyan-50 font-medium text-sm bg-[#fff] py-2 px-3 rounded-3xl border-[#666] border-1'>Solicitação aceito</button>
          <button className='text-[#23272F] hover:bg-cyan-50 font-medium text-sm bg-[#fff] py-2 px-3 rounded-3xl border-[#666] border-1'>Solicitação recusada</button>
          <button className='text-[#23272F] hover:bg-cyan-50 font-medium text-sm bg-[#fff] py-2 px-3 rounded-3xl border-[#666] border-1'>Solicitação enviadas</button>
        </header>
        {datas.length > 0 ? datas.map((data) => (
          <div key={data?._id} className='w-full flex flex-col items-center justify-start border-2 rounded-xl border-[#f5f5f5]'>
            {data?.type === 1 && <Rejected data={data} />}
            {data?.type === 2 && <Acepts data={data} />}
            {data?.type === 3 && <Solicitation data={data} />}
          </div>
        )) : "Sem Notificações..."}
      </section>
    </div>
  )
}
