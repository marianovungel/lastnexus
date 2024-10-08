import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { FaFileCircleXmark } from "react-icons/fa6";
import { api_base_url } from '@/Helper';
import { useRouter } from 'next/router';

export default function Docs({ docs }) {
    const router = useRouter()
    const [deleteModelShow, setDeleteModelShow] = useState(false);
    const docId = docs._id;

    const deleteDoc = async (id) => {
        let doc = document.getElementById(docId);
        fetch(api_base_url + "/deleteDoc", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                docId: id,
                userId: localStorage.getItem("userId"),
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success === false) {
                alert(data.message);
            } else {
                setDeleteModelShow(false);
                alert(data.message);
                if (doc) {
                    doc.remove();
                }
            }
        });
    };

    return (
        <>
            <div id={docId} key={docId}  className='docs cursor-pointer rounded-lg flex items-center mt-2 justify-between p-[10px] bg-[#F0F0F0] transition-all hover:bg-[#F5F5F5]'>
                <div onClick={()=>{ router.push(`/createDocs/${docs._id}`)}} className='left flex items-center gap-2'>
                    <i className='text-blue-700 text-5xl'><IoDocumentText /></i>
                    <div>
                        <h3 className='text-[20px]'>{docs.title}</h3>
                        <p className='text-[14px] text-[#808080]'>Create In: { new Date(docs.date).toDateString()} | Last Update : { new Date(docs.lastUpdate).toDateString()}</p>
                    </div>
                </div>
                <div className='docsRight'>
                    <i onClick={() => { setDeleteModelShow(true) }} className='delete text-[30px] text-red-500 cursor-pointer transition-all hover:text-red-600'><MdDelete /></i>
                </div>
            </div>

            {deleteModelShow &&
                <div className="deleteDocsModelCon fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,.3)] w-screen h-screen flex flex-col items-center justify-center">
                    <div className="deleteModel flex items-center flex-col bg-[#fff] rounded-lg w-[30vw] h[29vh] p-[15px]">
                        <h3 className='text-[20px] text-start w-full pb-2'>Delete Document</h3>
                        <div className='flex items-center gap-3'>
                            <i className='text-7xl text-red-500'><FaFileCircleXmark /></i>
                            <div>
                                <h3 className='text-[17px]'>Do You Want Delete This Document</h3>
                                <p className='text-[14px] text-[#808080]'>Delete / cancel</p>
                            </div>
                        </div>

                        <div className="flex mt-4 items-center gap-2 justify-between w-full my-3">
                            <div onClick={() => { deleteDoc(docId) }} className="p-[10px] bg-red-500 text-white rounded-lg border-0 cursor-pointer min-w-[49%] flex justify-center items-center">Delete Document</div>
                            <div onClick={() => { setDeleteModelShow(false) }} className="p-[10px] bg-[#D1D5DB] text-black rounded-lg border-0 cursor-pointer min-w-[49%] flex justify-center items-center">Cancel</div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
