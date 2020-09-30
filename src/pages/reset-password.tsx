import { withUrqlClient } from "next-urql";
import React from "react";
import { useForm } from "react-hook-form";
import { AuthLayout } from "../components/AuthLayout";
import { FormField } from "../components/FormField";
import { FormSubmit } from "../components/FormSubmit";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useResetPasswordMutation } from "../generated/graphql";

interface ResetPasswordProps {}

export const ResetPassword: React.FC<ResetPasswordProps> = ({}) => {
  const [, resetPassword] = useResetPasswordMutation();

  const { register, handleSubmit, formState } = useForm<{ email: string }>();

  const onSubmit = async (data: any) => {
    console.log(data);
    await resetPassword({ email: data.email });
  };

  return (
    <AuthLayout
      header="Reset your password"
      subheader="Enter email address linked with your account"
    >
      {formState.isSubmitted ? (
        <div className="mt-6 text-sm leading-5 text-orange-600">
          Your request has been submitted. If you entered valid email address,
          you will receive an email with further instructions.{" "}
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField name="email" type="email" ref={register()} />
          <FormSubmit
            title="Send"
            isSubmitting={formState.isSubmitting}
          ></FormSubmit>
        </form>
      )}
    </AuthLayout>
  );
};

export default withUrqlClient(createUrqlClient)(ResetPassword);
