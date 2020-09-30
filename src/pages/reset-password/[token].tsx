import { NextPage } from "next";
import React from "react";
import { AuthLayout } from "../../components/AuthLayout";
import { FormField } from "../../components/FormField";
import { useForm } from "react-hook-form";
import { FormSubmit } from "../../components/FormSubmit";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { useChangePasswordMutation } from "../../generated/graphql";

interface Props {}

type Inputs = {
  password: string;
  confirmPassword: string;
};

export const ResetPassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();

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
    let response = await changePassword({
      token,
      newPassword: password,
    });

    if (response.data?.changePassword.errors) {
      response.data.changePassword.errors.forEach(({ field, message }) => {
        //show all errors from server under password field (might be also token error)
        setError("password", {
          type: "manual",
          message,
        });
      });
    } else if (response.data?.changePassword.user) {
      router.push("/");
    }
  };

  return (
    <AuthLayout header="Set your new password">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        <FormSubmit
          title="Set password"
          isSubmitting={formState.isSubmitting}
        ></FormSubmit>
      </form>
    </AuthLayout>
  );
};

ResetPassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ResetPassword);
