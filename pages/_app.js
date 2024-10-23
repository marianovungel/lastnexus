import "@/styles/globals.css";

import { SocketProvider } from "@/context/socket";
import { Menu } from "@/components";
import { ContextProviderIo } from "@/contexts/SocketContext";
import { useUserStore } from "@/lib/userStore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from 'next/router';
import { UserProvider } from "@/context/UseContext";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  // Rotas que não requerem autenticação
  const noAuthRequired = ['/', '/login'];

  const { // isLoading, // supernotification, 
    currentUser,
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

  // useEffect(() => {
  //   // Simulando a verificação de autenticação
  //   const isAuthenticated = currentUser; // Função para checar se o usuário está logado

  //   if (!isAuthenticated && !noAuthRequired.includes(router.pathname)) {
  //     // Se o usuário não estiver logado e a rota não for pública, redireciona para login
  //     router.push('/login');
  //   }
  // }, [router.pathname]);



  console.log(currentUser)


  return (
    <SocketProvider>
      <ContextProviderIo>
        <UserProvider>
          <Menu />
          <Component {...pageProps} />
        </UserProvider>
      </ContextProviderIo>
    </SocketProvider>
  );
}
