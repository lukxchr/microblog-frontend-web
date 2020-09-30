import React from "react";
import { useForm } from "react-hook-form";
import { AuthLayout } from "../components/AuthLayout";
import { useRegisterUserMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { FormField } from "../components/FormField";
import { FormSubmit } from "../components/FormSubmit";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, registerUser] = useRegisterUserMutation();
  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState,
    watch,
  } = useForm<Inputs>();

  const password = watch("password");
  const onSubmit = async (data: any) => {
    let response = await registerUser({
      options: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    });
    if (response.data?.register.errors) {
      response.data.register.errors.forEach(({ field, message }) => {
        setError(field as "username" | "password" | "email", {
          type: "manual",
          message,
        });
      });
    } else if (response.data?.register.user) {
      router.push("/login");
    }
  };

  return (
    <AuthLayout
      header="Create new account"
      subheader={{
        text: "log in to your account",
        href: "/login",
        prefix: "Or ",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="username"
          ref={register()}
          error={errors?.username?.message}
        />
        <FormField
          name="email"
          type="email"
          ref={register()}
          error={errors?.email?.message}
        />
        <FormField
          name="password"
          type="password"
          ref={register()}
          error={errors?.password?.message}
        />
        <FormField
          name="confirmPassword"
          label="Confirm password"
          type="password"
          ref={register({
            validate: (value) => value === password || "Passwords don't match",
          })}
          error={errors?.confirmPassword?.message}
        />

        <FormSubmit title="Register" isSubmitting={formState.isSubmitting} />
      </form>
    </AuthLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
