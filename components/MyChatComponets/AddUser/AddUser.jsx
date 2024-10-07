import  './AddUser.css'
import {db} from '../../../lib/firebase'
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { useState } from 'react'
import { useUserStore } from '../../../lib/userStore'
const AvatarULR = "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"



export default function AddUser() {
  const [user, setUser] = useState(null)
  const { currentUser } = useUserStore()

  const handleSearch = async (e)=>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const username = formData.get("username")

    try {
      const userRef = collection(db, "users");

      const q = query(userRef, where("username", "==", username))
      const querySnapShat = await getDocs(q)

      if(!querySnapShat.empty){
        setUser(querySnapShat.docs[0].data())
      }


    } catch (error) {
      console.log(error)
    }

  }

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

      await updateDoc(doc(userChatsRef, user.id), {
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
          receiverId: user.id,
          updatedAt: Date.now(),
        })
      })
      

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='addUser'>
        <form onSubmit={handleSearch}>
            <input type="text" placeholder='Usuário' name='username' />
            <button>Search</button>
        </form>
        {user && (
          <div className="user">
              <div className="detail">
                  <img src={user?.avatar ? user?.avatar : AvatarULR } alt="" />
                  <span>{user.username}</span>
              </div>
              <button onClick={handleAdd}>Add User</button>
          </div>
        )}
    </div>
  )
}
