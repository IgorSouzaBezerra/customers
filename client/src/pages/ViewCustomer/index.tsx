import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { Header } from "../../components/Header";
import { Options } from "../../components/Options";
import { Input } from "../../components/New/Input";

import { Select } from "../../components/Form/Select";
import { Radio } from "../../components/Form/Radio";
import { CheckBox } from "../../components/Form/CheckBox";

import { api } from "../../services/api";
import { InfoToast } from "../../components/Toast";


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
      <Box
        margin="0 auto"
        width="30%"
        bg="#FFF"
        p={30}
        borderRadius={4}
      >
        <Select label="Tipo de Cliente" defaultValue={customer?.type.id} disabled={true} />
        <Radio active={customer?.active} name="ativo" label="Ativo"  />
        <Radio active={!(customer?.active)} name="ivativo" label="Inativo"  />
        <Input 
          type="text" 
          name="name"
          defaultValue={customer?.name}
          isDisabled
          label={customer?.type.description === "Pessoa Jurídica" ? "Nome Fantasia" : "Nome do Cliente"}
        /> 
        <Input 
          type="text" 
          name="surname"
          defaultValue={customer?.surname}
          isDisabled
          label={customer?.type.description === "Pessoa Jurídica" ? "Razão Social" : "Sobrenome do Cliente"}
        />
        <Input 
          type="text" 
          name="cpf"
          defaultValue={customer?.cpf}
          isDisabled
          label={customer?.type.description === "Pessoa Jurídica" ? "CNPJ" : "CPF"} 
        />
        <Input 
          type="text" 
          name="email"
          defaultValue={customer?.email}
          isDisabled
          label="E-mail"
        />
        <Input 
          type="text" 
          name="phone"
          defaultValue={customer?.phone}
          isDisabled
          label="Telefone"
        />
        <Input 
          type="text" 
          name="end_time"
          defaultValue={customer?.end_time}
          isDisabled
          label="Hora Final de Atendimento"
        />
        <Input 
          type="text" 
          name="day_service"
          defaultValue={customer?.day_service}
          isDisabled
          label="Data do Atendimento"
        />
        <Box
          mt={10}
          mb={10}
          p={7}
          border="1px solid #dedfe3"
          borderRadius={4}
        >
          <Input 
            type="text" 
            name="zip_code"
            defaultValue={customer?.address.zip_code}
            isDisabled
            label="CEP"
          />
          <Input 
            type="text" 
            name="Rua"
            defaultValue={customer?.address.street}
            isDisabled
            label="Rua"
          />
          <Input 
            type="text" 
            name="number"
            defaultValue={customer?.address.number}
            isDisabled
            label="Número"
          />
          <Input 
            type="text" 
            name="city"
            defaultValue={customer?.address.city}
            isDisabled
            label="Cidade"
          />
          <Input 
            type="text" 
            name="state"
            defaultValue={customer?.address.state}
            isDisabled
            label="Estado"
          />
        </Box>
        <Box>
          <CheckBox name="car" checked={car} label="Carro" disabled={true}  />
          <CheckBox name="truck" checked={truck} label="Caminhão" disabled={true}  />
          <CheckBox name="motorcycle" checked={motorcycle} label="Moto" disabled={true}  />
        </Box>
      </Box>
    </>
  );
}

export { ViewCustomer };