import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";

type Inputs = {
  username: string;
  password: string;
  confirmPassword: string;
};

interface registerProps {}

const REGISTER_MUT = `
mutation($username: String!, $password: String!) {
  register(options: {username: $username, password: $password}) {
    user {
      id
      username
    }
    errors {
      field
      message
    }
  }
}
`;

const Register: React.FC<registerProps> = ({}) => {
  const [, registerUser] = useMutation(REGISTER_MUT);
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const onSubmit = (data) => {
    registerUser(data);
    console.log("submit: ", data);
  };

  useEffect(() => {
    if (Object.keys(errors).length !== 0) console.log("errors: ", errors);
  }, [errors]);

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img
              className="h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
              Create new account
            </h2>
          </div>

          <div className="mt-0">
            <div>
              <div>
                <div className="mt-1 grid grid-cols-3 gap-3"></div>
              </div>
            </div>

            <div className="mt-6">
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
                      ref={register({
                        required: true,
                        minLength: {
                          value: 3,
                          message: "username must have at least 3 characters",
                        },
                        maxLength: {
                          value: 30,
                          message: "username must have at most 30 characters",
                        },
                        pattern: {
                          value: /^[A-Za-z0-9-_]+$/i,
                          message: "Allowed characters: letters, numbers, _-",
                        },
                      })}
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
                      ref={register({
                        required: true,
                        minLength: {
                          value: 6,
                          message: "Password must have at least 6 characters",
                        },
                        maxLength: {
                          value: 99,
                          message: "Password must have at most 99 characters",
                        },
                        pattern: {
                          value: /^[A-Za-z0-9-_!@#$%^&*()_-]+$/i,
                          message:
                            "Allowed characters: letters, numbers, !@#$%^&*()_-",
                        },
                      })}
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
                          value === "abc" || "Passwords don't match",
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
                      Register
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
};

export default Register;
