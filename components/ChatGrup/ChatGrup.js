"use client";
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function ChatGrup({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const messagesEndRef = useRef(null); // Criar uma referência para o final do container de mensagens

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" +
          new Date(Date.now()).getMinutes(),
        id: uuidv4(),
      };

      await socket.emit("send", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("recive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    scrollToBottom(); // Sempre que uma nova mensagem for adicionada, rola para o fundo
  }, [messageList]);

  return (
    <div className='w-full h-5/6'>
      <div className='h-full relative'>
        <div className='messageContainer w-full h-full overflow-y-scroll overflow-x-hidden'>
          {messageList.map((messageContent) => {
            return (
              <div
                className='messageContainermessage'
                key={messageContent.id}
                id={username === messageContent.author ? "other" : "you"}
              >
                <div>
                  <div className='messageContent'>
                    <p>{messageContent.message}</p>
                  </div>
                  <div className='messageMeta'>
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} /> {/* Referência para o fim da lista de mensagens */}
        </div>
      </div>
      <div className='h-[40px] border-2 border-[#999] flex'>
        <input
          className='h-full w-10/12 border-0 px-2 text-base outline-none'
          type='text'
          value={currentMessage}
          placeholder='Digite sua mensagem: '
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage();
          }}
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
        />
        <button className='bg-[#1f8ef1] px-3' onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
