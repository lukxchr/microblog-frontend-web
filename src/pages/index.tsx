import Head from "next/head";
import { MainLayout } from "../components/MainLayout";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { usePostsQuery } from "../generated/graphql";
import { useAlert } from "../utils/AlertContext";
import { CreatePostForm } from "../components/CreatePostForm";
import { Post } from "../components/Post";
import React, { useEffect } from "react";
import { PostList } from "../components/PostList";
//import styles from "../styles/Home.module.css";

function Home() {
  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });
  const { setWarningAlert, setErrorAlert, setSuccessAlert } = useAlert();

  //console.log(data);
  return (
    <div>
      <MainLayout header="Home">
        <CreatePostForm></CreatePostForm>
        <PostList postsData={data}></PostList>
      </MainLayout>
    </div>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
