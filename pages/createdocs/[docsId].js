"use client";

import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";
// Importa dinamicamente o JoditEditor
import { useUserStore } from "@/lib/userStore";
import { api_base_url } from "@/Helper";
import Socketeditor from "@/components/MyEditorComponents/Socketeditor";
import io from 'socket.io-client';

const socket = io.connect("https://editor-socket-back.onrender.com")
export default function CreateDocs() {
  const router = useRouter();
  const { docsId } = router.query;
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const { currentUser } = useUserStore();

  // Função para atualizar o documento
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
          docId: docsId,
          content: content,
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

        if (isColab || data.doc.autorId === currentUser?.id) {
          setShowEditor(true);
        } else {
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

        setContent(updatedContent);
      }
    } catch (error) {
      setError("Erro ao obter o documento.");
    }
  };

  // useEffect para buscar o conteúdo quando o usuário atual for definido
  useEffect(() => {
    if (currentUser?.id && docsId) {
      getContent();
    }
  }, [currentUser?.id, docsId]);

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    uploader: {
        url: 'https://xdsoft.net/jodit/finder/?action=fileUpload'
    },
    filebrowser: {
        ajax: {
            url: 'https://xdsoft.net/jodit/finder/'
        },
        height: 580,
    }
}

  return (
    <>
      {showEditor ? (
        <Socketeditor socket={socket} username={currentUser?.username} room={docsId} config={config} />
      ) : (
        <div className="w-full h-full flex justify-center items-start text-2xl pt-3">
          Usuário Não Autorizado...
        </div>
      )}
    </>
  );
}
