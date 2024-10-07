import React from 'react'
import './Detail.css'
import { auth, db } from '../../../lib/firebase';
import { useChatStore } from '../../../lib/chatStore';
import { useUserStore } from '../../../lib/userStore';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
const AvatarULR = "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"


export default function Detail() {
  const { user, isReceiverBlocked, changeBlock, isCurrentUserBlocked } = useChatStore()
  const { currentUser } = useUserStore()

  const handleBlock = async ()=>{
    if(!user) return;

    const userDocRef = doc(db, "users", currentUser.id)

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
      })

      changeBlock()

    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className='detail'>
      <div className="user">
        <img src={user?.avatar ? user?.avatar : AvatarULR } alt="" />
        <h2>{user.username}</h2>
        <p>Desenvolvedor de aplicações complexas.</p>
      </div>
      <div className="info">
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "Estás bloqueado!"
            : isReceiverBlocked
            ? "Usuário bloqueado"
            : "Bloquear usuário"
          }
        </button>
        <button className='logout' onClick={()=> auth.signOut()}>Logout</button>
      </div>
    </div>
  )
}
