import React from "react";
import { Alert } from "../components/Alert";
import "../styles/tailwind.css";
import { AlertProvider } from "../utils/AlertContext";

function MyApp({ Component, pageProps }: any) {
  return (
    <AlertProvider>
      <Component {...pageProps} />
      <Alert />
    </AlertProvider>
  );
}

export default MyApp;
