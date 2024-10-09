"use client";
import React, { useEffect, useState } from 'react';
import { MdNoteAdd, MdOutlineTitle } from "react-icons/md";
import { toast } from 'react-toastify';
import { api_base_url } from '@/Helper';
import { Docs } from '@/components';
import { useUserStore } from '@/lib/userStore';
import { useRouter } from 'next/router'; // Corrigido: uso do router

export default function Editor() {
  const [createModelShow, setCreateModelShow] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [datas, setDatas] = useState([]);
  const [allData, setAllData] = useState([]);
  const { currentUser } = useUserStore();
  const router = useRouter(); // Corrigido: inicializando o router

  console.log(allData);

  const createDoc = async () => {
    if (title === "") {
      setError("Digite o título");
      return;
    }

    if (!currentUser || !currentUser.id) {
      setError("Usuário não identificado.");
      return;
    }

    try {
      const response = await fetch(api_base_url + "/createDoc", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          docName: title,
          userId: currentUser.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCreateModelShow(false);
        router.push(`/createdocs/${data.docId}`); // Usando router para navegação
      } else {
        setError(data.message);
        toast.error(data.message); // Corrigido: exibir a mensagem de erro correta
      }
    } catch (err) {
      setError("Erro ao criar o documento.");
      console.error(err);
    }
  };

  const getData = async () => {
    if (!currentUser || !currentUser.id) return;

    try {
      const response = await fetch(api_base_url + "/getAllDocs", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.id,
        }),
      });

      const data = await response.json();
      setDatas(data.docs);
    } catch (err) {
      setError("Erro ao carregar os documentos.");
      console.error(err);
    }
  };

  const getDocCol = async () => {
    if (!currentUser || !currentUser.id) return;

    try {
      const response = await fetch(api_base_url + "/alldocs", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.id,
        }),
      });

      const data = await response.json();
      setAllData(data.docs);
    } catch (err) {
      setError("Erro ao carregar os documentos.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.id) {
      getData();
      getDocCol();
    }
  }, [currentUser]);

  return (
    <>
      <div className="flex items-center justify-between px-[100px]">
        <h3 className="mt-7 mb-3 text-3xl">Todos Artigos</h3>
        <button className="btnBlue bg-[#3b82f6] flex items-center justify-center gap-2 p-3 text-white border-2 rounded-md border-none cursor-pointer" onClick={() => router.push("/novoartigo")}>
          <i><MdNoteAdd /></i>
          Criar Novo Artigo
        </button>
      </div>

      <div className="allDocs px-[100px] mt-4">
        {datas.length > 0 ? (
          datas.map((el, index) => (
            <Docs key={`doc-${index}`} docs={el} docId={`doc-${index + 1}`} />
          ))
        ) : (
          <p>Sem Documentos...</p>
        )}
      </div>

      {createModelShow && (
        <div className="createDocsModelCon fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,.3)] w-screen h-screen flex flex-col items-center justify-center">
          <div className="createDocsModel bg-[#fff] rounded-lg w-[35vw] h-[25vh] p-[15px]">
            <h3 className="text-[20px]">Criar Novo Artigo</h3>

            <div className="inputCon mt-3">
              <p className="text-[14px] text-[#808080]">Título</p>
              <div className="inputBox w-[100%]">
                <i><MdOutlineTitle /></i>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  placeholder="Title"
                  id="title"
                  name="title"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2 justify-between w-full my-3">
              <div onClick={createDoc} className="btnBlue !min-w-[49%]">
                Criar Novo Artigo
              </div>
              <div
                onClick={() => setCreateModelShow(false)}
                className="p-[10px] bg-[#D1D5DB] text-black rounded-lg border-0 cursor-pointer min-w-[49%] flex justify-center items-center"
              >
                Cancelar
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
