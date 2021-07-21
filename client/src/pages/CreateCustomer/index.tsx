import { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Select, FormLabel, FormErrorMessage, FormControl } from "@chakra-ui/react";

import { Header } from "../../components/Header";
import { Options } from "../../components/Options";
import { Input } from "../../components/New/Input";

import { ErrorToast, SucessToast } from "../../components/Toast";
import { api } from "../../services/api";

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

interface IState {
  id: number,
  sigla: string,
  nome: string,
}

interface ICity {
  id: number,
  nome: string,
}

const createCustomerFormSchema = yup.object().shape({
  type: yup.string().required("O Tipo do Cliente é obrigatório"),
  name: yup.string().required("O Nome é obrigatório"),
  surname: yup.string().required("O Sobrenome é obrigatório"),
  email: yup.string().required("O E-mail é obrigatório").email("E-mail inválido"),
  cpf: yup.string().required("O CPF é obrigatório"),
  phone: yup.string().required("O Telefone é obrigatório"),
  end_time: yup.string().required("O Horário Final de Atendimento é obrigatório"),
  day_service: yup.string().required("A Data do Atendimento é obrigatória"),
  zip_code: yup.string().required("O CEP é obrigatório"),
  street: yup.string().required("A Rua é obrigatória"),
  number: yup.string().required("O Número é obrigatório"),
  city: yup.string().required("A Cidade é obrigatória"),
  state: yup.string().required("O Estado é obrigatório")
});

function CreateCustomer() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createCustomerFormSchema),
  });

  const createCustomer: SubmitHandler<ICustomer> = async (values) => {    
    await new Promise(resolve => setTimeout(resolve, 500));
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

    try {
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
      });

      history.push("/");
      SucessToast("Cliente criado com sucesso!");
    } catch {
      ErrorToast("Falha ao criar Cliente :(");
    }
  }

  const history = useHistory();
  const [options, setOptions] = useState<ITypePersons[]>([]);
  const [vehicles, setVehicles] = useState<IVehicles[]>([]);

  const [states, setStates] = useState<IState[]>([]);
  const [stateSelect, setStateSelect] = useState("");
  const [cities, setCities] = useState<ICity[]>([]);

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

  const loadStates = useCallback(async () => {
    const response = await api.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
    setStates(response.data)
  }, []);

  const loadCities = useCallback(async () => {
    const response = await api.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateSelect}/municipios`);
    setCities(response.data);
  }, [stateSelect]);

  useEffect(() => {
    loadOptions();
    loadVehicles();
    loadStates();
    loadCities();
  }, [loadOptions, loadVehicles, loadStates, loadCities]);

  return (
    <>
      <Header />
      <Options title="Criar Cliente" />

      <Box
        as="form"
        margin="0 auto"
        width="30%"
        bg="#FFF"
        p={30}
        borderRadius={4}
        onSubmit={handleSubmit(createCustomer)}
      >
        <FormControl isInvalid={!!formState.errors.type}>
          <FormLabel>Tipo do Cliente</FormLabel>
          <Select 
            padding="0 12"
            borderColor="#D7D7D7"
            bg="#E7E9EE"
            color="#000"
            {...register('type')}  
            placeholder="Selecione uma opção"
          >
            {options.map(o => (
            <option value={o.id} key={o.id}>{o.description}</option>
          ))}
          </Select>
          {!!formState.errors.type && (
            <FormErrorMessage>
              {formState.errors.type.message}
            </FormErrorMessage>
          )}
        </FormControl>

        <Input 
          type="text" 
          label="Nome"
          error={formState.errors.name} 
          {...register('name')}
        />

        <Input 
          type="text" 
          label="Sobrenome"
          error={formState.errors.surname} 
          {...register('surname')}
        />

        <Input 
          type="text" 
          label="E-mail"
          error={formState.errors.email} 
          {...register('email')}
        />
        
        <Input 
          type="text" 
          label="CPF"
          error={formState.errors.cpf} 
          {...register('cpf')}
        />
        
        <Input 
          type="text" 
          label="Telefone"
          error={formState.errors.phone} 
          {...register('phone')}
        />
        
        <Input 
          type="time" 
          label="Horário Final de Atendimento"
          error={formState.errors.end_time} 
          {...register('end_time')}
        />
        
        <Input 
          type="date" 
          label="Data do Atendimento"
          error={formState.errors.day_service} 
          {...register('day_service')}
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
            label="CEP"
            {...register('zip_code')}
            error={formState.errors.zip_code} 
          />

          <Input 
            type="text" 
            label="Rua"
            error={formState.errors.street} 
            {...register('street')}
          />

          <Input 
            type="text" 
            label="Número"
            error={formState.errors.number} 
            {...register('number')}
          />

          {/* <Input 
            type="text" 
            label="Cidade"
            error={formState.errors.city} 
            {...register('city')}
          /> */}

          {/* <Input 
            type="text" 
            label="Estado"
            error={formState.errors.state} 
            {...register('state')}
          /> */}

          <FormControl isInvalid={!!formState.errors.state}>
            <FormLabel>Estado</FormLabel>
            <Select 
              padding="0 12"
              borderColor="#D7D7D7"
              bg="#E7E9EE"
              color="#000"
              {...register('state')}  
              placeholder="Selecione uma opção"
              onChange={e => setStateSelect(e.target.value)}
            >
              {states.map(state => (
              <option value={state.sigla} key={state.id}>{state.nome}</option>
            ))}
            </Select>
            {!!formState.errors.state && (
              <FormErrorMessage>
                {formState.errors.state.message}
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!formState.errors.city}>
            <FormLabel>Cidade</FormLabel>
            <Select 
              padding="0 12"
              borderColor="#D7D7D7"
              bg="#E7E9EE"
              color="#000"
              {...register('city')}  
              placeholder="Selecione uma opção"
            >
              {cities.map(cities => (
              <option value={cities.nome} key={cities.id}>{cities.nome}</option>
            ))}
            </Select>
            {!!formState.errors.city && (
              <FormErrorMessage>
                {formState.errors.city.message}
              </FormErrorMessage>
            )}
          </FormControl>

        </Box>  

        <Box
          flexDir="column"
          mt={5}
          mb={5}
          p={5}
          border="1px solid #dedfe3"
          borderRadius={4}
        >
          <div>
            <input type="checkbox" checked={car} {...register('car')} onChange={e => setCar(e.target.checked)}  />
            <label>Carro</label>
          </div>
          
          <div>
            <input type="checkbox" checked={truck} {...register('truck')} onChange={e => setTruck(e.target.checked)}  />
            <label>Caminhão</label>
          </div>
          
          <div>
            <input type="checkbox" checked={motorcycle} {...register('motorcycle')} onChange={e => setMotorCycle(e.target.checked)}  />
            <label>Motocicleta</label>
          </div>

        </Box>

        <Button type="submit" mt="6" colorScheme="facebook" size="lg" w="100%" isLoading={formState.isSubmitting}>
          Entrar
        </Button>
      </Box>
    </>
  );
}

export { CreateCustomer };