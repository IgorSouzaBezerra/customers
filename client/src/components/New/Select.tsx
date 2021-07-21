import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form"
import { FormControl, FormLabel, Select as ChakraSelect, SelectProps as ChakraSelectProps, FormErrorMessage } from "@chakra-ui/react";

interface Options {
  id: string;
  description: string;
}

interface InputProps extends ChakraSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  options?: Options[];
  error?: FieldError;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, InputProps> = ({ name, label, placeholder, options, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
      <ChakraSelect
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
      >
        {options?.map(option => (
          <option key={option.id} value={option.id}>{option.description}</option>
        ))}
      </ChakraSelect>

      {!!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}

export const Select = forwardRef(SelectBase);
