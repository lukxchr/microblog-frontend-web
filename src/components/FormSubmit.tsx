import React from "react";

interface FormSubmitProps {
  title?: string;
  isSubmitting?: boolean;
}

export const FormSubmit: React.FC<FormSubmitProps> = ({
  title = "Submit",
  isSubmitting = false,
}) => {
  return (
    <div>
      <span className="block w-full rounded-md shadow-sm">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
        >
          {isSubmitting ? "Submitting..." : `${title}`}
        </button>
      </span>
    </div>
  );
};
