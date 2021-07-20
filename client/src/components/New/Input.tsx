import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form"
import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps, FormErrorMessage } from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, placeholder, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
      <ChakraInput
        name={name}
        id={name}
        placeholder={placeholder}
        padding="0 12"
        borderColor="#D7D7D7"
        bg="#E7E9EE"
        color="#000"
        variant="filled"
        {...rest}
        ref={ref}
      />

      {!!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}

export const Input = forwardRef(InputBase);
