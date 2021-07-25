import { useState, useEffect, useCallback } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useParams, useHistory } from "react-router-dom";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
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

  const loadTypePerson = useCallback(async () => {
    const typePerson = await getTypePerson();
    setTypePerson(typePerson);
  }, []);

  const loadCustomer = useCallback(async () => {
    const customer = await getCustomer(id);
    setCustomer(customer);

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

  }, [id, setValue]);

  useEffect(() => {
    loadTypePerson();
    loadCustomer();
  }, [loadTypePerson, loadCustomer]);

  return (
    <Box
      margin="0 auto"
      width="30%"
      bg="#FFF"
      p={30}
      borderRadius={4}
    >
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

      <Select 
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
          type="text" 
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
            label="Cidade"
            {...register('city')}
          />
          <Input 
            type="text" 
            isDisabled={disabled}
            label="Estado"
            {...register('state')}
          />
        </Box>
        {disabled ? (
          <Button type="submit" mt="6" colorScheme="facebook" size="lg" w="100%" isLoading={formState.isSubmitting}>
            Salvar
          </Button>
        ) : (
          null
        )}
        
    </Box>
  );
}