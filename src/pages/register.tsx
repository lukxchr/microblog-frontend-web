import React, { useEffect } from "react";
import { ErrorOption, useForm } from "react-hook-form";
import { AuthLayout } from "../components/AuthLayout";
import { useRegisterMutation } from "../generated/graphql";
import { useRouter } from "next/router";

type Inputs = {
  username: string;
  password: string;
  confirmPassword: string;
};

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, registerUser] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState,
    watch,
  } = useForm<Inputs>();

  const password = watch("password");
  const onSubmit = async (data) => {
    let response = await registerUser(data);
    //console.log(response);
    if (response.data?.register.errors) {
      response.data.register.errors.forEach(({ field, message }) => {
        setError(field as "username" | "password", {
          type: "manual",
          message,
        });
      });
    } else if (response.data?.register.user) {
      router.push("/login");
    }
  };

  return (
    <AuthLayout header="Create new account">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Username
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input
              id="username"
              type="text"
              name="username"
              ref={register()}
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
          </div>
          <div className="absolute text-red-700 text-xs">
            {errors?.username?.message}
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Password
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input
              id="password"
              type="password"
              name="password"
              ref={register()}
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
          </div>
          <div className="absolute text-red-700 text-xs">
            {errors?.password?.message}
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Confirm Password
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              ref={register({
                validate: (value) =>
                  value === password || "Passwords don't match",
              })}
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
          </div>
          <div className="absolute text-red-700 text-xs">
            {errors?.confirmPassword?.message}
          </div>
        </div>

        <div>
          <span className="block w-full rounded-md shadow-sm">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              {formState.isSubmitting ? "Submitting..." : "Register"}
            </button>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
