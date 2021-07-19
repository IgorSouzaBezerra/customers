import { Container } from "./styles";

interface IPropsCheck {
  name?: string; 
  label?: string;
  disabled?: boolean;
  checked: boolean;
}

function CheckBox({ name, checked, label, disabled, ...rest }: IPropsCheck) {
  return (
    <Container>
      <div>
        <input type="checkbox" id={name} name={name} checked={checked} disabled={disabled} {...rest} />
        <label htmlFor={name}>{label}</label>
      </div>
    </Container>
  );
}

export { CheckBox };