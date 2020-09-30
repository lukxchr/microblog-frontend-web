import React from "react";

type Props = {
  name: string;
  type?: string;
  label?: string;
  required?: boolean;
  error?: string;
};

export const FormField = React.forwardRef<HTMLInputElement, Props>(
  ({ name, type = "text", label, required = true, error }, ref) => (
    <div>
      <label
        htmlFor={name}
        className={`block text-sm font-medium leading-5 text-gray-700 ${
          !label && "capitalize"
        }`}
      >
        {label || name}
      </label>
      <div className="mt-1 rounded-md shadow-sm">
        <input
          id={name}
          type={type}
          name={name}
          ref={ref}
          required={required}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        />
      </div>
      <div className="absolute text-red-700 text-xs">{error}</div>
    </div>
  )
);
