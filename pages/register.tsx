import React from "react";
import { useForm } from "react-hook-form";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <React.Fragment>
      <div className="bg-red-500">tailwind test</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="firstname" ref={register} /> {/* register an input */}
        <input name="lastname" ref={register({ required: true })} />
        {errors.lastname && "Last name is required."}
        <input name="age" ref={register({ pattern: /\d+/ })} />
        {errors.age && "Please enter number for age."}
        <input type="submit" />
      </form>
    </React.Fragment>
  );
};

export default Register;
