import { Flex, Button, Stack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from '../../components/New/Input';
import { useAuth } from '../../contexts/AuthContext';

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail Obrigatório').email('E-mail inválido'),
  password: yup.string().required('senha obrigatória'),
});

export function LoginPage() {
  const { Login } = useAuth();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    await Login(values);
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack>
          <Input 
            type="email" 
            error={formState.errors.email} 
            label="E-mail" 
            placeholder="Digite seu e-mail"
            {...register('email')} 
          /> 

          <Input 
            type="password" 
            error={formState.errors.password} 
            label="Password" 
            placeholder="Digite sua senha"
            {...register('password')} 
          /> 
        </Stack>
        <Button type="submit" mt="6" colorScheme="facebook" size="lg" isLoading={formState.isSubmitting}>
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}