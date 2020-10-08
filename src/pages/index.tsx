import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { CreatePostForm } from "../components/CreatePostForm";
import { MainLayout } from "../components/MainLayout";
import { PostList } from "../components/PostList";
import { usePostsQuery } from "../generated/graphql";
import { useAlert } from "../utils/AlertContext";
import { createUrqlClient } from "../utils/createUrqlClient";
//import styles from "../styles/Home.module.css";

function Home() {
  const [postsQueryVariables, setPostsQueryVariables] = useState({
    limit: 10,
    cursor: null as string | null,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables: postsQueryVariables,
  });

  return (
    <div>
      <MainLayout header="Home">
        <CreatePostForm></CreatePostForm>
        <PostList
          postsData={data}
          isFetching={fetching}
          onLoadMore={() => {
            setPostsQueryVariables({
              ...postsQueryVariables,
              cursor:
                data?.posts.posts[data.posts.posts.length - 1].createdAt ??
                null,
            });
          }}
        />
      </MainLayout>
    </div>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
