import { Provider } from "react-redux";
import { store, persistor } from "../services/redux/store";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout/Layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import { PersistGate } from "redux-persist/integration/react";
import "../../public/fonts/fonts.css";
import "../../public/normalize.css";
import "../globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Provider store={store}>
      {isClient ? (
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Head>…</Head>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      ) : (
        // на сервере и до первой гидрации:
        <Layout>
          <Head>…</Head>
          <Component {...pageProps} />
        </Layout>
      )}
    </Provider>
  );
}


export default MyApp;
