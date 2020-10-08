import Head from "next/head";
import { MainLayout } from "../components/MainLayout";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { usePostsQuery } from "../generated/graphql";
import { useAlert } from "../utils/AlertContext";
import { CreatePostForm } from "../components/CreatePostForm";
import { Post } from "../components/Post";
import React, { useEffect, useState } from "react";
import { PostList } from "../components/PostList";
//import styles from "../styles/Home.module.css";

function Home() {
  const [postsQueryVariables, setPostsQueryVariables] = useState({
    limit: 10,
    cursor: null as string | null,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables: postsQueryVariables,
  });
  const { setWarningAlert, setErrorAlert, setSuccessAlert } = useAlert();

  return (
    <div>
      <MainLayout header="Home">
        <CreatePostForm></CreatePostForm>
        {data && (
          <PostList
            postsData={data}
            onLoadMore={() => {
              setPostsQueryVariables({
                ...postsQueryVariables,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
          ></PostList>
        )}
      </MainLayout>
    </div>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
