import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthLayout } from "../components/AuthLayout";
import { useRouter } from "next/router";
import { useLoginMutation } from "../generated/graphql";
import { FormField } from "../components/FormField";
import { FormSubmit } from "../components/FormSubmit";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Link from "next/link";

type Inputs = {
  usernameOrEmail: string;
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
  const onSubmit = async (data: any) => {
    let response = await login(data);
    if (response.data?.login.errors) {
      response.data.login.errors.forEach(({ field, message }) => {
        setError(field as "usernameOrEmail" | "password", {
          type: "manual",
          message,
        });
      });
    } else if (response.data?.login.user) {
      router.push("/");
    }
  };

  return (
    <AuthLayout header="Sign in to your account">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="usernameOrEmail"
          label="Username or email"
          ref={register()}
          error={errors?.usernameOrEmail?.message}
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
            <Link href="/reset-password">
              <a className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                Forgot your password?
              </a>
            </Link>
          </div>
        </div>
        <FormSubmit title="Sign in" isSubmitting={formState.isSubmitting} />
      </form>
    </AuthLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
