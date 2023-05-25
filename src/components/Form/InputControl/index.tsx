import React from "react";
import { Container, Error } from "./styles";
import { TextInputProps } from "react-native";
import { Control, Controller } from "react-hook-form";
import { Input } from "../Input";

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}
export const InputControl: React.FunctionComponent<Props> = ({
  control,
  name,
  error,
  ...otherProps
}) => {

  const preventUndefined = (errorMessage: string) => {
    return error === "undefined" ? error = "" : error = error;
  }

  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={onChange}
            value={value}
            {...otherProps}
          />
        )}
        name={name}
      />
      {error && <Error>{preventUndefined(error)}</Error>}
     
    </Container>
  );
};
