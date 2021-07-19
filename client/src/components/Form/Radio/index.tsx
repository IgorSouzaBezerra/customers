import { Container } from "./styles";

interface IPropsRadio {
  label?: string;
  name?: string;
  defaultValue?: string;
  disabled?: boolean;
  active?: boolean;
}

function Radio({ label, name, active, disabled, ...rest }: IPropsRadio) {
  return (
    <Container>
      <div>
        <input type="radio" id={name} name={name} checked={active === true} disabled={disabled} {...rest} />
        <label htmlFor="active">{label}</label>
      </div>
    </ Container>
  );
}

export { Radio };