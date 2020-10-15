import React from "react";
import {
  PostFragment,
  PostSnippetFragment,
  PostSnippetFragmentDoc,
  User,
  useToggleLikeMutation,
} from "../generated/graphql";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface PostProps {
  post: PostSnippetFragment | PostFragment;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const [, toggleLike] = useToggleLikeMutation();
  return (
    <div className="bg-gray-800 text-gray-100 w-full border-gray-700 border-b-2 px-4 py-2">
      <div className="flex justify-between items-center">
        <div className="font-semibold">@{post.creator.username}</div>
        <div className="text-xs">
          {formatDistanceToNow(new Date(parseInt(post.createdAt))) + " ago"}
        </div>
      </div>
      <div className="my-1 text-justify">
        {post.hasOwnProperty("text")
          ? (post as PostFragment).text
          : (post as PostSnippetFragment).textSnippet}
      </div>
      <div className="flex justify-between">
        <Link href="/post/[id]" as={`/post/${post.id}`}>
          <div className="flex items-center hover:bg-gray-700 px-2 py-1 rounded-md cursor-pointer">
            <svg
              className="h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <p className="ml-1 text-lg">{99}</p>
          </div>
        </Link>
        <div className="hover:bg-gray-700 px-2 py-1 rounded-md cursor-pointer">
          <svg
            className="h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            />
          </svg>
        </div>
        <div>
          <div
            className="flex items-center hover:bg-gray-700 px-2 py-1 rounded-md cursor-pointer"
            onClick={() => toggleLike({ postId: post.id })}
          >
            <svg
              className="h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <p className="ml-1 text-lg">{post.likesCount}</p>
          </div>
        </div>
        <div className="hover:bg-gray-700 px-2 py-1 rounded-md cursor-pointer">
          <svg
            className="h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
