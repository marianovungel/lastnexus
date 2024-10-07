import React, { useEffect, useState } from 'react'
import './ChatList.css'
import { IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";
import AddUser from '../AddUser/AddUser';
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useUserStore } from '../../../lib/userStore';
import { db } from '../../../lib/firebase';
import { useChatStore } from '../../../lib/chatStore';
import { toast } from 'react-toastify';
const AvatarULR = "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"


export default function ChatList() {
  const [chats, setChats] = useState([])
  const [addMode, setAddMode] = useState(false)
  const [input, setInput] = useState("")

  const { currentUser } = useUserStore()
  const { changeChat } = useChatStore()


  useEffect(()=>{
    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      const items = res.data().chats;
      const promises = items.map( async (item)=>{
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef)

        const user = userDocSnap.data()

        return { ...item, user };
      })

      const chatData = await Promise.all(promises)
      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt))
  });

  return ()=>{
    unSub()
  }
  }, [currentUser.id])

  const handleSelect = async (chat)=>{
    const userChats = chats.map((item)=>{
      const { user, ...rest} = item;
      return rest;
    })

    const chatIndex = userChats.findIndex(
      (item)=> item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.id)

    try {
      await updateDoc(userChatsRef, {
        chats: userChats
      })
      changeChat(chat.chatId, chat.user)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const filteredChats = chats.filter((c) => c.user.username.toLowerCase().includes(input.toLowerCase()))

  return (
    <div className='chatList'>
      <div className="search">
        <div className="searchBar">
          <IoSearchSharp size={20} color='white' />
          <input type="text" placeholder='Search' onChange={(e)=> setInput(e.target.value)} />
        </div>
        {addMode ? (
            <TiMinus size={40} color='white' className='add' 
              onClick={()=> setAddMode((prev)=> !prev)} />
          ): (
          <FaPlus size={40} color='white' className='add' 
          onClick={()=> setAddMode((prev)=> !prev)} />)}
      </div>
      {filteredChats?.map((chat)=>(
        <div className="item" style={{ backgroundColor: chat?.isSeen ? "transparent" : "#5183fe"}} key={chat.chatId} onClick={()=> handleSelect(chat)} >
          <img src={chat.user.blocked.includes(currentUser.id) ? chat.user?.avatar : AvatarULR } alt="" />
          <div className="texts">
            <span>
              {chat.user.blocked.includes(currentUser.id)
                ? "Usuário" : chat.user.username
              }
            </span>
            <p>{ chat.lastMessage}</p>
          </div>
        </div>
      ))}
      { addMode && <AddUser /> }
    </div>
  )
}
