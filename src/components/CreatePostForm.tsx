import React from "react";

interface CreatePostFormProps {}

export const CreatePostForm: React.FC<CreatePostFormProps> = ({}) => {
  return (
    <div className="flex-1 px-4 py-2 flex justify-between bg-gray-800">
      <form>
        <textarea className="bg-gray-700"></textarea>
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
