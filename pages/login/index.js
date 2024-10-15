"use client";
import { useState } from 'react'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore";
import { api_base_url } from '@/Helper'
import { auth, db } from '@/lib/firebase';
import upload from '@/lib/upload';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState({
    file: null,
    url: ""
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const imgUrl = await upload(avatar.file);

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
        grups: [],
      });

      await fetch(api_base_url + "/singUp", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          userId: res.user.uid,
          avatar: imgUrl
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === false) {
            toast.error(data.message);
          } else {
            toast.success("Conta criada com sucesso!");
          }
        });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      const dataResponse = await signInWithEmailAndPassword(auth, email, password);
      console.log(dataResponse);

      setTimeout(() => {
        console.log("Redirecionando...");
        router.push("/feed");
      }, 3000);

    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <div className="w-full h-full flex items-center gap-24">
        <div className="flex-1 flex flex-col items-center gap-5">
          <h2>Seja Bem-vindo.</h2>
          <form className='flex flex-col items-center justify-center gap-5' onSubmit={handleLogin}>
            <input className='p-5 border-none outline-none bg-[rgba(17, 25, 40, 0.6)] text-[#666] rounded-[5px]' type="email" placeholder='Email' name='email' required />
            <input className='p-5 border-none outline-none bg-[rgba(17, 25, 40, 0.6)] text-[#666]rounded-[5px]' type="password" placeholder='Senha' name='password' required />
            <button className='w-full p-5 border-none bg-[#1f8ef1] text-white rounded[5px] cursor-pointer font-semibold disabled:cursor-not-allowed bg-[#1f8ff18b] rounded-md' disabled={loading}>{loading ? "Loading..." : "Entrar"}</button>
          </form>
        </div>
        <div className="h-16 w-[2px] bg-[#dddddd35]"></div>
        <div className="flex-1 flex flex-col items-center gap-5">
          <h2>Criar conta.</h2>
          <form className='flex flex-col items-center justify-center gap-5' onSubmit={handleRegister}>
            <label className='w-full flex items-center justify-between cursor-pointer' htmlFor="file">
              <img className='w-10 h-10 rounded-full object-cover' src={avatar.url || "default-avatar.png"} alt="" />
              Adicionar foto do perfil
            </label>
            <input className='p-5 border-none outline-none bg-[rgba(17, 25, 40, 0.6)] text-[#666] rounded-[5px]' type="file" id='file' style={{ display: "none" }} onChange={handleAvatar} />
            <input className='p-5 border-none outline-none bg-[rgba(17, 25, 40, 0.6)] text-[#666] rounded-[5px]' type="text" placeholder='Username' name='username' required />
            <input className='p-5 border-none outline-none bg-[rgba(17, 25, 40, 0.6)] text-[#666] rounded-[5px]' type="email" placeholder='Email' name='email' required />
            <input className='p-5 border-none outline-none bg-[rgba(17, 25, 40, 0.6)] text-[#666] rounded-[5px]' type="password" placeholder='Senha' name='password' required />
            <button className='w-full p-5 border-none bg-[#1f8ef1] text-white rounded[5px] cursor-pointer font-semibold disabled:cursor-not-allowed' disabled={loading}>{loading ? "Loading..." : "Criar Conta"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
