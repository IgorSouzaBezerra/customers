import { useState, useEffect, useCallback } from "react";
import { Box, Button, Flex, Text, Checkbox } from "@chakra-ui/react";
import { useParams, useHistory } from "react-router-dom";
import { SubmitHandler, useForm } from 'react-hook-form';
// import * as yup from "yup"
// import { yupResolver } from "@hookform/resolvers/yup";
import { FaRegEdit } from "react-icons/fa";

import { Input } from "./Input";
import { Select } from "./Select";

import { getCustomer, getTypePerson } from "../../pages/Customers/customer";
import { ICustomer } from "../../interfaces/customers/ICustomer";
import { ITypePerson } from "../../interfaces/customers/ITypePerson";

interface IParams {
  id: string;
}

interface IPropsForm {
  disabled?: boolean;
}

export function Form({ disabled = false }: IPropsForm) {
  const { id } = useParams<IParams>();
  const history = useHistory();
  const { register, handleSubmit, formState, setValue } = useForm();

  const [customer, setCustomer] = useState<ICustomer>();
  const [typePerson, setTypePerson] = useState<ITypePerson[]>([]);

  const [car, setCar] = useState(false);
  const [truck, setTruck] = useState(false);
  const [motorcycle, setMotorcycle] = useState(false);

  const loadTypePerson = useCallback(async () => {
    const typePerson = await getTypePerson();
    setTypePerson(typePerson);
  }, []);

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
  }, [loadTypePerson, loadCustomer]);

  const submit: SubmitHandler<ICustomer> = async (values) => {    
    console.log(values)
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
          mt={10}
          mb={10}
          p={7}
          border="1px solid #dedfe3"
          borderRadius={4}
        >
          <Input 
            type="text" 
            isDisabled={disabled}
            label="CEP"
            {...register('zip_code')}
          />
          <Input 
            type="text" 
            isDisabled={disabled}
            label="Rua"
            {...register('street')}
          />
          <Input 
            type="text" 
            isDisabled={disabled}
            label="Número"
            {...register('number')}
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