import React from "react";
import { PostsQuery } from "../generated/graphql";
import { Post } from "./Post";

interface PostListProps {
  postsData: PostsQuery | undefined;
}

export const PostList: React.FC<PostListProps> = ({ postsData }) => {
  return (
    <>
      <div>
        {postsData?.posts.map((post) => (
          <Post
            key={post.id}
            text={post.textSnippet}
            comments={10}
            likes={55}
          />
        ))}
      </div>
      <div className="flex justify-center bg-gray-800 py-2">
        <button className="w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
          Load more posts...
        </button>
      </div>
    </>
  );
};
