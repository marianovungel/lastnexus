import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { io } from "socket.io-client";
import { useRouter } from "next/router";
import "quill/dist/quill.snow.css";

// Importação dinâmica da biblioteca Quill
const Quill = dynamic(() => import("quill").then((mod) => mod.default), { ssr: false });

const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

export default function TextEditor() {
  const router = useRouter();
  const { id: documentId } = router.query;
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  useEffect(() => {
    const s = io("https://nexuseditorb.onrender.com");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null || !documentId) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", documentId);
  }, [socket, quill, documentId]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null || !quill) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    
    // Instanciar Quill apenas quando estiver disponível
    if (Quill) {
      const q = new Quill(editor, {
        theme: "snow",
        modules: { toolbar: TOOLBAR_OPTIONS },
      });
      q.disable();
      q.setText("Loading...");
      setQuill(q);
    }
  }, [Quill]);

  return <div className="container" ref={wrapperRef}></div>;
}
