import React, { useEffect } from "react";
import { ErrorOption, useForm } from "react-hook-form";
import { AuthLayout } from "../components/AuthLayout";
import { useRegisterMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { FormField } from "../components/FormField";
import { FormSubmit } from "../components/FormSubmit";

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
    console.log("submitting", data);
    let response = await registerUser(data);
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
        <FormField
          name="confirmPassword"
          label="Confirm Password"
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

export default Register;