import React from "react";

interface FormFieldProps {
  name: string;
  type: "text" | "password" | "email";
  ref: React.LegacyRef<HTMLInputElement>;
  errorMessage?: string;
  required: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  type,
  ref = null,
  errorMessage,
  required = false,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-5 text-gray-700"
      >
        {name}
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
      <div className="absolute text-red-700 text-xs">{errorMessage}</div>
    </div>
  );
};
