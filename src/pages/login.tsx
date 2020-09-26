import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthLayout } from "../components/AuthLayout";
import { useRouter } from "next/router";
import { useLoginMutation } from "../generated/graphql";
import { FormField } from "../components/FormField";
import { FormSubmit } from "../components/FormSubmit";

type Inputs = {
  username: string;
  password: string;
  rememberMe: boolean;
};

interface registerProps {}

const Login: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  const { register, handleSubmit, errors, setError, formState } = useForm<
    Inputs
  >();
  const onSubmit = async (data) => {
    let response = await login(data);
    if (response.data?.login.errors) {
      response.data.login.errors.forEach(({ field, message }) => {
        setError(field as "username" | "password", {
          type: "manual",
          message,
        });
      });
    } else if (response.data?.login.user) {
      router.push("/");
    }
  };

  useEffect(() => console.log(errors), [errors]);
  return (
    <AuthLayout header="Sign in to your account">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="username"
          ref={register()}
          error={errors?.username?.message}
        />
        <FormField
          name="password"
          type="password"
          ref={register()}
          error={errors?.password?.message}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              name="remember_me"
              ref={register()}
              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <label
              htmlFor="remember_me"
              className="ml-2 block text-sm leading-5 text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm leading-5">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              Forgot your password?
            </a>
          </div>
        </div>
        <FormSubmit title="Sign in" isSubmitting={formState.isSubmitting} />
      </form>
    </AuthLayout>
  );
};

export default Login;
