import "@/styles/globals.css";

import { SocketProvider } from "@/context/socket";
import { Menu } from "@/components";
import { ContextProviderIo } from "@/contexts/SocketContext";
import { useUserStore } from "@/lib/userStore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";

export default function App({ Component, pageProps }) {

  const { 
    // isLoading,
    // supernotification,
    // currentUser, 
    fetchUserInfo 
  } = useUserStore()

  useEffect(()=>{
    const unSub = onAuthStateChanged(auth, (user)=>{
      fetchUserInfo(user?.uid)
    })

    return()=>{
      unSub();
    }
  }, [fetchUserInfo])

  // console.log(currentUser)


  return (
    <SocketProvider>
      <ContextProviderIo>
        <Menu />
        <Component {...pageProps} />
      </ContextProviderIo>
    </SocketProvider>
  );
}
