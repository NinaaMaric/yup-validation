import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "./components/Form";
import { Input } from "./components/Input";
import { useHistory } from "react-router-dom";
import { useData } from "./DataContext";
import { FormControlLabel } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MainContainer } from "./components/MainContainer";
import { PirmaryButton } from "./components/PirmaryButton";
import parsePhoneNumberFromString from "libphonenumber-js";

const normalizePhoneNumber = (value) => {
  const phoneNumber = parsePhoneNumberFromString(value);

  if(!phoneNumber){
      return value
  }
  return phoneNumber.formatInternational()
};

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("This field is required"),
});

export const Step2 = () => {
  const { data, setValues } = useData();
  const history = useHistory();

  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      email: data.email,
      hasPhone: data.hasPhone,
      phoneNumber: data.phoneNumber,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const hasPhone = watch("hasPhone");

  const onSubmit = (data) => {
    history.push("/step3");
    setValues(data);
  };

  return (
    <MainContainer>
      <h2>Step 2</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          type="email"
          label="Email"
          name="email"
          required
          error={!!errors.email}
          helperText={errors?.email?.message}
        />

        <FormControlLabel
          control={
            <Checkbox
              defaultValue={data.hasPhone}
              defaultChecked={data.hasPhone}
              color="primary"
              name="hasPhone"
              inputRef={register}
              name="hasPhone"
            />
          }
          label="Phone number"
        />

        {hasPhone && (
          <Input
            ref={register}
            id="phoneNumber"
            type="tel"
            label="Phone number"
            name="phoneNumber"
            onChange={(event) => {
              event.target.value = normalizePhoneNumber(event.target.value);
            }}
          />
        )}
        <PirmaryButton type="submit">Next </PirmaryButton>
      </Form>
    </MainContainer>
  );
};
