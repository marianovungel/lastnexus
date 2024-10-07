import { useState } from 'react'
import './Login.css'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../lib/firebase'
import { doc, setDoc } from "firebase/firestore"; 
import upload from '../../lib/upload'
import {api_base_url}  from '../../Helper'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState({
    file:null,
    url:""
  })

  const handleAvatar = e =>{
    if(e.target.files[0]){
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  const handleRegister = async ( e ) =>{
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target)

    const { username, email, password} = Object.fromEntries(formData)

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      const imgUrl = await upload(avatar.file)


      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar:imgUrl,
        id:res.user.uid,
        blocked: [],
        grups: [],
      });

      await fetch(api_base_url + "/singUp", {
        mode:"cors",
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            username,
            email,
            userId:res.user.uid,
            avatar:imgUrl
        }),
    })
    .then((res)=> res.json())
    .then((data)=>{
        if(data.seccess === false){
            toast.error(data.message)
          }else{
          toast.success("..")
        }
    })



      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });
      toast.success("Conta criada com Sucesso!")

    } catch (error) {
      toast.error(error.message)
    } finally{
      setLoading(false)
    }
  }

  const hendleLogin = async ( e ) =>{
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target)
    const { email, password} = Object.fromEntries(formData)

    try {
      var dataResponse = await signInWithEmailAndPassword(auth, email, password)
      toast.success("Logado com sucesso")
      console.log("Passei e estou aqui")
      console.log(dataResponse)
      navigate("/feed")
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    } finally{
      setLoading(false)
    }
  }


  return (
    <div className='container'>
      <div className="login">
        <div className="item">
          <h2>Seja Bem-vindo.</h2>
          <form onSubmit={hendleLogin}>
            <input type="enail" placeholder='Email' name='email' />
            <input type="password" placeholder='Senha' name='password' />
            <button disabled={loading}>{ loading ? "Loading..." : "Entrar"}</button>
          </form>
        </div>
        <div className="separator"></div>
        <div className="item">
          <h2>Criar conta.</h2>
            <form onSubmit={handleRegister}>
              <label htmlFor="file">
                <img src={avatar.url || "data:image/png;base64,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"} alt="" />
                Adiciona foto do perfil</label>
              <input type="file" id='file' style={{display: "none"}} onChange={handleAvatar} />
              <input type="text" placeholder='Usuário' name='username' />
              <input type="email" placeholder='Email' name='email' />
              <input type="password" placeholder='Senha' name='password' />
              <button disabled={loading}>{ loading ? "Loading..." : "Criar Conta"}</button>
            </form>
        </div>
      </div>
    </div>
  )
}
