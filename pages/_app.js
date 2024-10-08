import "@/styles/globals.css";

import { SocketProvider } from "@/context/socket";
import { Menu } from "@/components";

export default function App({ Component, pageProps }) {
  return (
    <SocketProvider>
      <Menu />
      <Component {...pageProps} />
    </SocketProvider>
  );
}
