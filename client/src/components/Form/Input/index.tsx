import { Container, Input as InputStyles, Label } from "./styles";

interface IPropsInput {
  label?: string;
  placeholder?: string;
  name?: string;
  type?: string;
  defaultValue?: string;
  disabled?: boolean;
}

function Input({ label, placeholder, name, type, defaultValue, disabled, ...rest }: IPropsInput) {
  return (
    <Container>
      <Label>{label}</Label>
      <InputStyles 
        placeholder={placeholder} 
        defaultValue={defaultValue} 
        name={name} 
        type={type} 
        disabled={disabled}
        {...rest}
      />
    </Container>
  );
  
}

export { Input };