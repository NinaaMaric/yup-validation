import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { FileInput } from "./components/FileInput";
import { Form } from "./components/Form";
import { MainContainer } from "./components/MainContainer";
import { PirmaryButton } from "./components/PirmaryButton";
import { useData } from "./DataContext";

export const Step3 = () => {
  const history = useHistory();
  const { data, setValues } = useData();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      files: data.files,
    },
  });

  const onSubmit = (data) => {
    history.push("/result");
    setValues(data);
  };

  return (
    <MainContainer component="h2" variant="h5">
      <h2>Step 3</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FileInput name="files" control={control} />
        <PirmaryButton>Next</PirmaryButton>
      </Form>
    </MainContainer>
  );
};
