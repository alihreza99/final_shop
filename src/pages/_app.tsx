import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { CartProvider } from "react-use-cart";
import { CookiesProvider } from "react-cookie";
import Head from "next/head";

import "react-toastify/dist/ReactToastify.css";
import "../assets/css/form.css";
import "../assets/css/home.css";
import "../assets/css/nav.css";
import "../assets/css/banner.css";
import "../assets/css/font.css";
import "../assets/css/card.css";
import "../assets/css/item.css";
import "../assets/css/done.css";
import "../assets/css/shop.css";
import "../assets/css/globals.css";
import "../assets/css/notfound.css";
import "../assets/css/box.css";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>shop</title>
        <meta name="description" content="Best PWA app in the world!" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="mask-icon" href="/icons/mask-icon.svg" color="#FFFFFF" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="256x256" href="/icon-256x256.png" />
        <link rel="apple-touch-icon" sizes="384x384" href="/icon-384x384.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* add the following only if you want to add a startup image for Apple devices. */}
      </Head>
      <CookiesProvider>
        <CartProvider>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <Component {...pageProps} />
            </PersistGate>
          </Provider>
        </CartProvider>
      </CookiesProvider>
    </>
  );
}
