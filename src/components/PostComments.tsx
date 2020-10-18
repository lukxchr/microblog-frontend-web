import React from "react";
import { useForm } from "react-hook-form";
import {
  useCommentsQuery,
  useCreateCommentMutation,
} from "../generated/graphql";
import { useAlert } from "../utils/AlertContext";
import { FormSubmit } from "./FormSubmit";

interface PostCommentsProps {
  postId: number;
}

export const PostComments: React.FC<PostCommentsProps> = ({ postId }) => {
  const [, createComment] = useCreateCommentMutation();
  const [{ data, error }] = useCommentsQuery({ variables: { postId } });
  const { setErrorAlert, setSuccessAlert } = useAlert();
  // console.log(data);
  // console.error(error);
  const { register, handleSubmit, formState, watch, reset } = useForm<{
    text: string;
  }>();
  const onSubmit = async (data: any) => {
    console.log(data);
    if (data.text) {
      await createComment({ postId: 227, text: data.text });
      setSuccessAlert("Comment added");
    } else {
      setErrorAlert("Comment can't be empty");
    }
  };
  return (
    <>
      <div className="px-4 py-2 flex justify-between bg-gray-800 border-gray-700 border-b-2">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center">
            <input
              className="appearance-none min-w-0 w-full bg-gray-700 border border-transparent rounded-md py-2 px-4 mr-4 text-base leading-6 text-gray-100 placeholder-gray-500 focus:outline-none focus:shadow-outline-gray focus:placeholder-gray-400 transition duration-150 ease-in-out"
              name="text"
              placeholder="Comment..."
              ref={register()}
            />
            <FormSubmit
              title="Add"
              isSubmitting={formState.isSubmitting}
            ></FormSubmit>
          </div>
        </form>
      </div>
      <div>
        {data?.comments.map((comment) => (
          <div
            className="w-full px-4 py-2 flex justify-between text-gray-100 border-gray-700 border-b-2 text-justify space-x-4"
            key={comment.id}
          >
            <div>{comment.text}</div>
            <div>~{comment.user.username}</div>
          </div>
        ))}
      </div>
    </>
  );
};
