import { useEffect } from "react";
import { useState, useCallback } from "react";
import { api } from "../../../services/api";
import { Label, Select as SelectStyle } from "./styles";

interface IPropsSelect {
  label?: string;
  placeholder?: string;
  name?: string;
  defaultValue?: string;
  disabled?: boolean;
}

interface ITypePersons {
  id: string;
  description: string;
}

function Select({ label, placeholder, name, defaultValue, disabled, ...rest }: IPropsSelect) {
  const [options, setOptions] = useState<ITypePersons[]>([]);

  const loadOptions = useCallback(async () => {
    const response = await api.get(`types`);
    setOptions(response.data)
  }, []);

  useEffect(() => {
    loadOptions();
  }, [loadOptions]);

  return (
    <>
      <Label>{label}</Label>
      <SelectStyle
        placeholder={placeholder} 
        name={name} 
        disabled={disabled} 
        defaultValue={defaultValue}
        value={defaultValue}
        {...rest}
      >
        <option>Selecione uma opção</option>
        {options.map(o => (
          <option value={o.id} key={o.id}>{o.description}</option>
        ))}
      </SelectStyle>
    </>
  );
}

export { Select };