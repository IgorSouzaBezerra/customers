import { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";

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

interface IAddress {
  zip_code: string;
  street: string;
  number: string;
  city: string;
  state: string;
}

interface ICustomer {
  name: string;
  surname: string;
  email: string;
  cpf: string;
  phone: string;
  type: string;
  end_time:string;
  vehicles: string[];
  day_service: string;
  address: IAddress;
}

function CreateCustomer() {
  const history = useHistory();
  const [options, setOptions] = useState<ITypePersons[]>([]);
  const [vehicles, setVehicles] = useState<IVehicles[]>([]);

  const [type, setTypePerson] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCPF] = useState("");
  const [phone, setPhone] = useState("");
  const [end_time, setEndTime] = useState("");
  const [day_service, setDayService] = useState("");

  const [zip_code, setZipCode] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

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

  const submitForm = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const customer: ICustomer  = {
      type,
      name,
      surname,
      email,
      cpf,
      phone,
      end_time,
      day_service,
      address: {
        zip_code,
        street,
        number,
        city,
        state
      },
      vehicles: [],
    }

    if (car) {
      const carFilter = vehicles.filter(c => c.description === "Carro");
      customer.vehicles.push(carFilter[0].id);
    }

    if (truck) {
      const trukFilter = vehicles.filter(c => c.description === "Caminhão");
      customer.vehicles.push(trukFilter[0].id);
    }

    if (motorcycle) {
      const motorcycleFilter = vehicles.filter(c => c.description === "Moto");
      customer.vehicles.push(motorcycleFilter[0].id);
    }

    console.log(customer);

    await api.post('customers', {
      customer
    });

    SucessToast("Cliente criado com sucesso!");
    history.push("/");
  }, [type, email, name, surname, cpf, phone, end_time, 
    day_service, zip_code, street, number, city, state, 
    car, truck, motorcycle, vehicles, history]);

  return (
    <>
      <Header />
      <Options title="Criar Cliente" />
      <Container onSubmit={submitForm}>
        <Label>Tipo de Pessoa</Label>
        <Select onChange={e => setTypePerson(e.target.value)} >
          <option>Selecione uma opção</option>
          {options.map(o => (
          <option value={o.id} key={o.id}>{o.description}</option>
        ))}
        </Select>

        <Label>Nome</Label>
        <Input type="text" name="name" onChange={e => setName(e.target.value)} />

        <Label>Sobrenome</Label>
        <Input type="text" name="surname" onChange={e => setSurname(e.target.value)} />

        <Label>Email</Label>
        <Input type="text" name="email" onChange={e => setEmail(e.target.value)} />
        
        <Label>CPF</Label>
        <Input type="text" name="cpf" onChange={e => setCPF(e.target.value)} />
        
        <Label>Phone</Label>
        <Input type="text" name="phone" onChange={e => setPhone(e.target.value)} />
        
        <Label>Horário</Label>
        <Input type="time" name="end_time" onChange={e => setEndTime(e.target.value)} />
        
        <Label>Data do Atendimento</Label>
        <Input type="date" name="day_service" onChange={e => setDayService(e.target.value)} />
        
        <FormArea>
          <Label>CEP</Label>
          <Input type="text" name="zip_code" onChange={e => setZipCode(e.target.value)} />

          <Label>Rua</Label>
          <Input type="text" name="street" onChange={e => setStreet(e.target.value)} />

          <Label>Número</Label>
          <Input type="text" name="number" onChange={e => setNumber(e.target.value)} />

          <Label>Cidade</Label>
          <Input type="text" name="city" onChange={e => setCity(e.target.value)} />

          <Label>Estado</Label>
          <Input type="text" name="state" onChange={e => setState(e.target.value)} />
        </FormArea>  
        
        <FormArea>
          <input type="checkbox" checked={car} onChange={e => setCar(e.target.checked)} />
          <Label>Carro</Label>

          <input type="checkbox" checked={truck} onChange={e => setTruck(e.target.checked)} />
          <Label>Caminhão</Label>

          <input type="checkbox" checked={motorcycle} onChange={e => setMotorCycle(e.target.checked)} />
          <Label>Motocicleta</Label>
        </FormArea>

        <Button type="submit">Salvar</Button>
      </Container>
    </>
  );
}

export { CreateCustomer };