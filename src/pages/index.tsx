import Head from "next/head";
import { MainLayout } from "../components/MainLayout";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { usePostsQuery } from "../generated/graphql";
//import styles from "../styles/Home.module.css";

function Home() {
  const [{ data }] = usePostsQuery();
  //console.log(data);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout></MainLayout>
    </div>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
