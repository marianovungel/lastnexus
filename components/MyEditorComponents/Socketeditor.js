"use client";
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dynamic from "next/dynamic";
import { api_base_url } from '@/Helper';
import { useUserStore } from '@/lib/userStore';

// Carrega o JoditEditor apenas no cliente, evitando o erro do lado do servidor
const JoditEditor = dynamic(() => import("jodit-pro-react"), {
    ssr: false, // Desabilita a renderização no lado do servidor
    loading: () => <p>Carregando editor...</p>, // Mostra um fallback enquanto o editor carrega
});

export default function Socketeditor({ socket, username, room, config }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const messagesEndRef = useRef(null); // Criar uma referência para o final do container de mensagens
  const { currentUser } = useUserStore();
  const editor = useRef(null);
  const [error, setError] = useState("");

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

      console.log(messageData)
      await socket.emit("send", messageData);
    }
  };

  useEffect(() => {
    console.log("chegou aqui")
    socket.on("recive_message", (data) => {
        setCurrentMessage(data);
        console.log("Este é a mensaem"+data)
    });
  }, [socket]);

  useEffect(() => {
    scrollToBottom(); // Sempre que uma nova mensagem for adicionada, rola para o fundo
  }, [messageList]);

  const updateDoc = async () => {
    try {
      const response = await fetch(`${api_base_url}/uploadDoc`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser?.id,
          docId: room,
          content: currentMessage,
        }),
      });

      const data = await response.json();
      if (data.status === "success") {
        setError(data.message);
      } else {
        setError("Erro ao atualizar o documento");
      }
    } catch (error) {
      setError("Erro na comunicação com o servidor.");
    }
  };

  useEffect(() => {
    if (currentUser?.id && room) {
      getContent();
    }
  }, [currentUser?.id, room]);

  // Função para obter o conteúdo do documento
  const getContent = async () => {
    try {
      const response = await fetch(`${api_base_url}/getDoc`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser?.id,
          docId: docsId,
        }),
      });

      const data = await response.json();

      if (data.success === false) {
        setError(data.message);
      } else {
        const colab = data?.doc?.colab || [];
        const isColab = colab.includes(currentUser?.id);

        if (!isColab || data.doc.autorId !== currentUser?.id) {
          setTimeout(() => {
            router.push("/documentos");
          }, 3000);
        }

        const PAGE_LIMIT = 3200;
        let updatedContent = data.doc.content || "";
        const textLength = updatedContent.length;

        if (textLength > PAGE_LIMIT) {
          // Adiciona uma quebra de página após o limite
          updatedContent = updatedContent.replace(
            new RegExp(`(.{${PAGE_LIMIT}})`, "g"),
            "$1<!--pagebreak-->"
          );
        }

        setCurrentMessage(updatedContent);
      }
    } catch (error) {
      setError("Erro ao obter o documento.");
    }
  };

  return (
    <div className="px-[100px] mt-3 mx-auto w-3/5 lg:w-1/2 md:w-3/4 sm:w-full sm:px-0">
        <JoditEditor
            ref={editor}
            value={currentMessage}
            config={config}
            tabIndex={1}
            onChange={(newContent) => {
                setCurrentMessage(newContent);
                updateDoc();
                sendMessage()
            }}
        />
    </div>
  );
}
