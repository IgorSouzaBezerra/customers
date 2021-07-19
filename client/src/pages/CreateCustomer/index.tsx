import { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { SubmitHandler, useForm } from 'react-hook-form';

import { Header } from "../../components/Header";
import { Options } from "../../components/Options";
import { SucessToast } from "../../components/Toast";
import { api } from "../../services/api";

import { Container, Label, Select, Input, FormArea, Button } from "./styles";

interface ITypePersons {
  id: string;
  description: string;
}

interface IVehicles {
  id: string;
  description: string;
}

interface IVehicles {
  id: string;
  description: string;
}

interface ICustomer {
  name: string;
  surname: string;
  email: string;
  cpf: string;
  phone: string;
  type: string;
  end_time:string;
  day_service: string;
  zip_code: string;
  street: string;
  state: string;
  number: string;
  city: string;
  vehicles: string[];
}

function CreateCustomer() {
  const { register, handleSubmit } = useForm();

  const createCustomer: SubmitHandler<ICustomer> = async (values) => {
    let vehiclesArray = [];

    if (car) {
      const carFilter = vehicles.filter(c => c.description === "Carro");
      vehiclesArray.push(carFilter[0].id);
    }
    
    if (truck) {
      const trukFilter = vehicles.filter(c => c.description === "Caminhão");
      vehiclesArray.push(trukFilter[0].id);
    }
    
    if (motorcycle) {
      const motorcycleFilter = vehicles.filter(c => c.description === "Moto");
      vehiclesArray.push(motorcycleFilter[0].id);
    }

    values.vehicles = vehiclesArray;


      await api.post("customers", { 
        name: values.name,
        surname: values.surname,
        email: values.email,
        cpf: values.cpf,
        phone: values.phone,
        type: values.type,
        end_time: values.end_time,
        day_service: values.day_service,
        vehicles: values.vehicles,
        address: {
          zip_code: values.zip_code,
          street: values.street,
          number: values.number,
          city: values.city,
          state: values.state,
        },
      })
    history.push("/");
    SucessToast("Cliente criado com sucesso!");
  }

  const history = useHistory();
  const [options, setOptions] = useState<ITypePersons[]>([]);
  const [vehicles, setVehicles] = useState<IVehicles[]>([]);

  const [car, setCar] = useState(false);
  const [truck, setTruck] = useState(false);
  const [motorcycle, setMotorCycle] = useState(false);

  const loadOptions = useCallback(async () => {
    const response = await api.get(`types`);
    setOptions(response.data)
  }, []);

  const loadVehicles = useCallback(async () => {
    const response = await api.get(`vehicles`);
    setVehicles(response.data)
  }, []);

  useEffect(() => {
    loadOptions();
    loadVehicles();
  }, [loadOptions, loadVehicles]);

  return (
    <>
      <Header />
      <Options title="Criar Cliente" />
      <Container onSubmit={handleSubmit(createCustomer)}>
        <Label>Tipo de Pessoa</Label>
        <Select {...register('type')}  >
          <option>Selecione uma opção</option>
          {options.map(o => (
          <option value={o.id} key={o.id}>{o.description}</option>
        ))}
        </Select>

        <Label>Nome</Label>
        <Input type="text" {...register('name')}  />

        <Label>Sobrenome</Label>
        <Input type="text" {...register('surname')}  />

        <Label>Email</Label>
        <Input type="text" {...register('email')}  />
        
        <Label>CPF</Label>
        <Input type="text" {...register('cpf')}  />
        
        <Label>Phone</Label>
        <Input type="text" {...register('phone')}  />
        
        <Label>Horário</Label>
        <Input type="time" {...register('end_time')}  />
        
        <Label>Data do Atendimento</Label>
        <Input type="date" {...register('day_service')}  />
        
        <FormArea>
          <Label>CEP</Label>
          <Input type="text" {...register('zip_code')}  />

          <Label>Rua</Label>
          <Input type="text" {...register('street')}  />

          <Label>Número</Label>
          <Input type="text" {...register('number')}  />

          <Label>Cidade</Label>
          <Input type="text" {...register('city')}  />

          <Label>Estado</Label>
          <Input type="text" {...register('state')}  />
        </FormArea>  
        
        <FormArea>
          <div>
            <input type="checkbox" checked={car} {...register('car')} onChange={e => setCar(e.target.checked)}  />
            <Label>Carro</Label>
          </div>
          
          <div>
            <input type="checkbox" checked={truck} {...register('truck')} onChange={e => setTruck(e.target.checked)}  />
            <Label>Caminhão</Label>
          </div>
          
          <div>
            <input type="checkbox" checked={motorcycle} {...register('motorcycle')} onChange={e => setMotorCycle(e.target.checked)}  />
            <Label>Motocicleta</Label>
          </div>
        </FormArea>

        <Button type="submit">Salvar</Button>
      </Container>
    </>
  );
}

export { CreateCustomer };