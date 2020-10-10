import React from "react";
import { useForm } from "react-hook-form";
import { FormSubmit } from "./FormSubmit";
import { useCreatePostMutation } from "../generated/graphql";
import { useAlert } from "../utils/AlertContext";

type Inputs = {
  text: string;
};
export const CreatePostForm: React.FC = ({}) => {
  const [, createPost] = useCreatePostMutation();
  const { setErrorAlert, setSuccessAlert } = useAlert();

  const { register, handleSubmit, formState, watch, reset } = useForm<Inputs>();
  const postText = watch("text");

  const onSubmit = async (data: any) => {
    if (!postText) {
      setErrorAlert("You can't add post without any content");
      return;
    }
    const { error } = await createPost({ text: data.text });
    if (error?.message.includes("not authenticated")) {
      setErrorAlert("You need to log in to add posts");
    } else {
      setSuccessAlert("Post added");
      reset();
    }
  };

  return (
    <div className="px-4 py-2 flex justify-between bg-gray-800 border-gray-700 border-b-2">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <textarea
            name="text"
            className="appearance-none min-w-0 w-full bg-gray-700 border border-transparent rounded-md py-2 px-4 mr-4 text-base leading-6 text-gray-100 placeholder-gray-500 focus:outline-none focus:shadow-outline-gray focus:placeholder-gray-400 transition duration-150 ease-in-out"
            rows={2}
            style={{ resize: "none" }}
            placeholder="Say something..."
            ref={register()}
          ></textarea>
          <FormSubmit
            title="Post"
            isSubmitting={formState.isSubmitting}
          ></FormSubmit>
        </div>
      </form>
    </div>
  );
};

{
  /* <label
htmlFor="about"
className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
>
About
</label>
<div className="mt-1 sm:mt-0 sm:col-span-2">
<div className="max-w-lg flex rounded-md shadow-sm">
  <textarea
    id="about"
    rows={3}
    className="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
  ></textarea>
</div>
<p className="mt-2 text-sm text-gray-500">
  Write a few sentences about yourself.
</p>
</div> */
}
