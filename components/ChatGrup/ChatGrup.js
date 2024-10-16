"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'

export default function ChatGrup({ socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () =>{
        if(currentMessage !== ""){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" +
                new Date(Date.now()).getMinutes(),
            }

            await socket.emit("send", messageData);
            setMessageList((list)=> [...list, messageData])
            setCurrentMessage("");
        }
    }
    useEffect(()=>{
        socket.on("recive_message", (data)=>{
            setMessageList((list)=> [...list, data])
        })
    }, [socket])
  return (
    <div className='w-full h-5/6'>
        {/* <div className='h-45 bg-[#2da0da] relative cursor-pointer rounded-t-sm'>
            <p className='m-0 block px-3 text-white font-bold'>Vungel Chat</p>
        </div> */}
        <div className='h-full relative'>
            <ScrollToBottom className='.messageContainer w-full h-full overflow-y-scroll overflow-x-hidden'>
            {messageList.map((messageContent)=>{
                return (
                    <div className='messageContainermessage'
                    id={username === messageContent.author ? "other" :  "you"}
                    >
                        <div>
                            <div className='messageContent'>
                                <p>{messageContent.message}</p>
                            </div>
                            <div className='messageMeta'>
                            <p id="time" >{messageContent.time}</p>
                            <p id="author" >{messageContent.author}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
            </ScrollToBottom>
        </div>
        <div className='h-[40px] border-2 border-slate-950 flex'>
            <input 
            className='h-full w-10/12 border-0 px-2 text-base outline-none'
            type='text'
            value={currentMessage}
            placeholder='Digite sua mensagem: ' 
            onKeyPress={(e)=>{
                e.key === "Enter" && sendMessage()
            }} 
            onChange={(e)=>{
                setCurrentMessage(e.target.value)
            }} />
            <button className='text-[#43a047]' onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
  )
}

