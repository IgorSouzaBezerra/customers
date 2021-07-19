import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { api } from "../../services/api";
import { InfoToast } from "../../components/Toast";
import { CheckBox } from "../../components/Form/CheckBox";

import { Input } from "../../components/Form/Input";
import { Radio } from "../../components/Form/Radio";
import { Select } from "../../components/Form/Select";
import { Container, FormArea } from "./styles";

import { Header } from "../../components/Header";

import { Options } from "../../components/Options";

interface IParams {
  id: string;
}

interface IVehicles {
  id: string;
  description: string;
}

interface IType {
  id: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface IAddress {
  id: string;
  zip_code: string;
  street: string;
  number: string;
  city: string;
  state: string;
}

interface ICustomer {
  name: string;
  active: boolean;
  surname: string;
  cpf: string;
  email: string;
  phone: string;
  type: IType;
  end_time:string;
  day_service: string;
  address: IAddress;
  vehicles: IVehicles[];
}

function ViewCustomer() {

  const [customer, stCustomer] = useState<ICustomer>();
  const [car, setCar] = useState(false);
  const [truck, setTruck] = useState(false);
  const [motorcycle, setMotorcycle] = useState(false);

  const params = useParams<IParams>();

  const loadCustomer = useCallback(async () => {
    const customer = await api.get<ICustomer>(`customers/${params.id}`);
    stCustomer(customer.data);

    const result1 = customer.data.vehicles?.map(v => v.description.includes("Carro"));
    const result2 = customer.data.vehicles?.map(v => v.description.includes("Caminhão"));
    const result3 = customer.data.vehicles?.map(v => v.description.includes("Moto"));

    setCar(result1.includes(true));
    setTruck(result2.includes(true));
    setMotorcycle(result3.includes(true));


    InfoToast("Visualizando " + customer.data.name + " " + customer.data.surname);
  }, [params]);

  useEffect(() => {
    loadCustomer()
  }, [loadCustomer]);

  return (
    <>
      <Header />
      <Options title="Visualização do Cliente" />
      <Container>
        <Select label="Tipo de Pessoa" defaultValue={customer?.type.id} disabled={true} />
        <Radio active={customer?.active} name="ativo" label="Ativo"  />
        <Radio active={!(customer?.active)} name="ivativo" label="Inativo"  />
        <Input 
          defaultValue={customer?.name} 
          label={customer?.type.description === "Pessoa Jurídica" ? "Nome Fantasia" : "Nome do Cliente"} 
          disabled={true} 
        />
        <Input 
          defaultValue={customer?.surname} 
          label={customer?.type.description === "Pessoa Jurídica" ? "Razão Social" : "Sobrenome do Cliente"} 
          disabled={true}
        />
        <Input 
          defaultValue={customer?.cpf} 
          label={customer?.type.description === "Pessoa Jurídica" ? "CNPJ" : "CPF"}  
          disabled={true} 
        />
        <Input defaultValue={customer?.email} label="CPF" disabled={true} />
        <Input defaultValue={customer?.phone} label="Telefone" disabled={true} />
        <Input defaultValue={customer?.end_time} label="Hora Final de Atendimento" disabled={true} />
        <Input defaultValue={customer?.day_service} label="Data do Atendimento" disabled={true} />
        <FormArea>
          <Input defaultValue={customer?.address.zip_code} label="CEP" disabled={true} />
          <Input defaultValue={customer?.address.street} label="Rua" disabled={true} />
          <Input defaultValue={customer?.address.number} label="Nº" disabled={true} />
          <Input defaultValue={customer?.address.city} label="Cidade" disabled={true} />
          <Input defaultValue={customer?.address.state} label="Estado" disabled={true} />
        </FormArea>
        <FormArea>
          <CheckBox name="car" checked={car} label="Carro" disabled={true}  />
          <CheckBox name="truck" checked={truck} label="Caminhão" disabled={true}  />
          <CheckBox name="motorcycle" checked={motorcycle} label="Moto" disabled={true}  />
        </FormArea>
      </Container>
    </>
  );
}

export { ViewCustomer };