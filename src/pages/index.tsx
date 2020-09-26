import Head from "next/head";
import { MainLayout } from "../components/MainLayout";
//import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        {/* <div>Hello world</div>
        <div>Hello world</div> */}
      </MainLayout>
    </div>
  );
}
