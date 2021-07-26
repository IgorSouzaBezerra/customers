import { useState, useEffect, useCallback } from "react";
import { Box, Button, Flex, Text, Checkbox } from "@chakra-ui/react";
import { useParams, useHistory } from "react-router-dom";
import { SubmitHandler, useForm } from 'react-hook-form';
// import * as yup from "yup"
// import { yupResolver } from "@hookform/resolvers/yup";
import { FaRegEdit } from "react-icons/fa";

import { Input } from "./Input";
import { Select } from "./Select";

import { getCustomer, getTypePerson, getVehicles } from "../../pages/Customers/customer";
import { ICustomer } from "../../interfaces/customers/ICustomer";
import { ITypePerson } from "../../interfaces/customers/ITypePerson";
import { IVehicles } from "../../interfaces/customers/IVehicles";
import { api } from "../../services/api";
import { ICustomerSend } from "../../interfaces/customers/ICustomerSend";
import { ErrorToast, SucessToast } from "../Toast";

interface IParams {
  id: string;
}

interface IPropsForm {
  disabled?: boolean;
}

export function Form({ disabled = false }: IPropsForm) {
  const { id } = useParams<IParams>();
  const history = useHistory();
  const { register, handleSubmit, formState, setValue, getValues } = useForm();

  const [customer, setCustomer] = useState<ICustomer>();
  const [typePerson, setTypePerson] = useState<ITypePerson[]>([]);
  const [vehicles, setVehicles] = useState<IVehicles[]>([]);

  const [car, setCar] = useState(false);
  const [truck, setTruck] = useState(false);
  const [motorcycle, setMotorcycle] = useState(false);

  const loadTypePerson = useCallback(async () => {
    const typePerson = await getTypePerson();
    setTypePerson(typePerson);
  }, []);

  const loadVehicles = useCallback(async () => {
    const vehicles = await getVehicles();
    setVehicles(vehicles);
  }, []);

  const handleCep = useCallback(async () => {
    const cep = getValues("zip_code");

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(response => {
        setValue("district", response.bairro);
        setValue("street", response.logradouro);
        setValue("city", response.localidade);
        setValue("state", response.uf);
      });
  }, [getValues, setValue]);

  const loadCustomer = useCallback(async () => {
    const customer = await getCustomer(id);
    setCustomer(customer);

    setValue("id", customer.id);
    setValue("type", customer.type.id);
    setValue("name", customer.name);
    setValue("surname", customer.surname);
    setValue("cpf", customer.cpf);
    setValue("email", customer.email);
    setValue("phone", customer.phone);
    setValue("end_time", customer.end_time);
    setValue("day_service", customer.day_service);

    setValue("zip_code", customer.address.zip_code);
    setValue("district", customer.address.district);
    setValue("street", customer.address.street);
    setValue("number", customer.address.number);
    setValue("city", customer.address.city);
    setValue("state", customer.address.state);


    const result1 = customer.vehicles?.map(v => v.description.includes("Carro"));
    const result2 = customer.vehicles?.map(v => v.description.includes("Caminhão"));
    const result3 = customer.vehicles?.map(v => v.description.includes("Moto"));

    setCar(result1.includes(true));
    setValue("car", result1.includes(true))
    setTruck(result2.includes(true));
    setValue("truck", result2.includes(true))
    setMotorcycle(result3.includes(true));
    setValue("motorcycle", result3.includes(true))

  }, [id, setValue]);

  useEffect(() => {
    loadCustomer();
    loadTypePerson();
    loadVehicles();
  }, [loadTypePerson, loadCustomer, loadVehicles]);

  const submit: SubmitHandler<ICustomerSend> = async (values) => {    
    console.log(values)

    let vehiclesArrayString = [];

    if (car) {
      const carFilter = vehicles.filter(c => c.description === "Carro");
      vehiclesArrayString.push(carFilter[0].id);
    }
    
    if (truck) {
      const trukFilter = vehicles.filter(c => c.description === "Caminhão");
      vehiclesArrayString.push(trukFilter[0].id);
    }
    
    if (motorcycle) {
      const motorcycleFilter = vehicles.filter(c => c.description === "Moto");
      vehiclesArrayString.push(motorcycleFilter[0].id);
    }


    const vehiclesObj = vehiclesArrayString.map(vehicle => {
      const result = vehicles.filter(v => v.id === vehicle);
      return result[0];
    });

    try {
      await api.put("customers", { 
        id: values.id,
        name: values.name,
        surname: values.surname,
        email: values.email,
        cpf: values.cpf,
        phone: values.phone,
        type: values.type,
        end_time: values.end_time,
        day_service: values.day_service,
        vehicles: vehiclesObj,
        address: {
          id: customer?.address.id,
          zip_code: values.zip_code,
          district: values.district,
          street: values.street,
          number: values.number,
          city: values.city,
          state: values.state,
        },
      });

      history.push(`/view/${values.id}`);
      SucessToast("Cliente criado com sucesso!");
    } catch {
      ErrorToast("Falha ao criar Cliente :(");
    }
  }

  return (
    <Box
      as="form"
      margin="0 auto"
      width="30%"
      bg="#FFF"
      p={30}
      borderRadius={4}
      onSubmit={handleSubmit(submit)}
    >
      {disabled ? (
        <Box 
          mb={5}
        >
          <Flex
            align="center"
            justify="center"
            _hover={{ color: "#007FFF" }}
            cursor="pointer"
            onClick={() => { history.push(`/edit/${customer?.id}`) }}
          >
            <FaRegEdit color="#969CB3" />
            <Text ml={1}>Editar Cliente</Text>
          </Flex> 
        </Box>
      ) : (
        null
      )}

      {disabled ? (
        <Input 
        type="text" 
        label="Id"
        isDisabled={disabled}
        error={formState.errors.id} 
        {...register('id')}
      />
      ) : 
      null}
      
      <Select 
        label="Tipo de Pessoa"
        options={typePerson} 
        {...register('type')} 
        isDisabled={disabled}
      />

      <Input 
          type="text" 
          label="Nome"
          error={formState.errors.name} 
          isDisabled={disabled}
          {...register('name')}
        />

        <Input 
          type="text" 
          label="Sobrenome"
          error={formState.errors.surname} 
          isDisabled={disabled}
          {...register('surname')}
        />

        <Input 
          type="text" 
          label="CPF" 
          error={formState.errors.cpf} 
          isDisabled={disabled}
          {...register('cpf')}
        />

        <Input 
          type="text" 
          label="E-mail" 
          error={formState.errors.email} 
          isDisabled={disabled}
          {...register('email')}
        />

        <Input 
          type="text" 
          label="Telefone"
          error={formState.errors.phone} 
          isDisabled={disabled}
          {...register('phone')}
        />

        <Input 
          type="text" 
          label="Horário Final de Atendimento"
          error={formState.errors.end_time} 
          isDisabled={disabled}
          {...register('end_time')}
        />

        <Input 
          type="date" 
          label="Data do Atendimento"
          error={formState.errors.day_service} 
          isDisabled={disabled}
          {...register('day_service')}
        />

        <Box
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="center"
        >
          <Input 
            type="text" 
            isDisabled={disabled}
            label="CEP"
            {...register('zip_code')}
          />
          <Button
            marginTop={8}
            colorScheme="facebook"
            onClick={handleCep}
          >Buscar</Button>
        </Box>

        <Box
          mt={10}
          mb={10}
          p={7}
          border="1px solid #dedfe3"
          borderRadius={4}
        >
          <Input 
            type="text" 
            isDisabled={disabled}
            label="Rua"
            {...register('street')}
          />
        
          <Input 
            type="text" 
            isDisabled={disabled}
            label="Bairro"
            {...register('district')}
          />

          <Input 
            type="text" 
            isDisabled={disabled}
            label="Estado"
            {...register('state')}
          />

          <Input 
            type="text" 
            isDisabled={disabled}
            label="Cidade"
            {...register('city')}
          />

          <Input 
            type="text" 
            isDisabled={disabled}
            label="Número"
            {...register('number')}
          />
        </Box>
        <Box
          mt={10}
          mb={10}
          p={7}
          border="1px solid #dedfe3"
          borderRadius={4}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Checkbox {...register("car")} isDisabled={disabled} isChecked={car} onChange={e => setCar(e.target.checked)} >Carro</Checkbox>
          <Checkbox {...register("truck")} isDisabled={disabled} isChecked={truck} onChange={e => setTruck(e.target.checked)} >Caminhão</Checkbox>
          <Checkbox {...register("motorcycle")} isDisabled={disabled} isChecked={motorcycle} onChange={e => setMotorcycle(e.target.checked)} >Moto</Checkbox>
        </Box>
        {!disabled ? (
          <Button type="submit" mt="6" colorScheme="facebook" size="lg" w="100%" isLoading={formState.isSubmitting}>
            Salvar
          </Button>
        ) : (
          null
        )}
        
    </Box>
  );
}