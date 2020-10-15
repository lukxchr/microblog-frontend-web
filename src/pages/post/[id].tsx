import { withUrqlClient } from "next-urql";
import { Router, useRouter } from "next/router";
import React from "react";
import { MainLayout } from "../../components/MainLayout";
import { Post } from "../../components/Post";
import { usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

interface PostPageProps {}

const PostPage: React.FC<PostPageProps> = ({}) => {
  const router = useRouter();
  const id =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, error }] = usePostQuery({
    pause: id === -1,
    variables: { id },
  });

  return (
    <MainLayout header="Post">
      {data?.post ? (
        <Post post={data.post}></Post>
      ) : (
        <div className="text-gray-100 flex justify-center p-8">
          There is no such post. It might have been deleted.
        </div>
      )}
    </MainLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(PostPage);
