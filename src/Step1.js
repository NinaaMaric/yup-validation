import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Form } from "./components/Form";
import { PirmaryButton } from "./components/PirmaryButton";
import { Input } from "./components/Input";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useData } from "./DataContext";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name cannot be numbers")
    .required("First name filed is required"),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, "Last name cannot be numbers")
    .required("Last name filed is required"),
});

export const Step1 = () => {

  const {setValues, data} = useData()

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {firstName: data.firstName, lastName: data.lastName},
    mode: "onBlur",
    resolver: yupResolver(schema)
  });
  
  const history = useHistory();

  const onSubmit = (data) => {
    history.push("./step2");
    setValues(data)
  };

  return (
    <div className="container">
      <h2>Step 1</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          className="first-name"
          ref={register}
          name="firstName"
          type="text"
          label="First name"
          error={!!errors.firstName}
          helperText={errors?.firstName?.message}
        />
        <Input
          className="last-name"
          ref={register}
          name="lastName"
          type="text"
          label="Last name"
          error={!!errors.lastName}
          helperText={errors?.lastName?.message}
        />
        <PirmaryButton type="submit">Next </PirmaryButton>
      </Form>
    </div>
  );
};
