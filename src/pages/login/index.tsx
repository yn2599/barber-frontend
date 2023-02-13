import { useState, useContext } from "react";
import Head from "next/head"
import Image from "next/image";
import LogoImg from '../../../public/images/logo.svg'
import { Flex, Text, Center, Input, Button } from '@chakra-ui/react'

import Link from "next/link";

import { AuthContext } from '../../context/AuthContext'

import { canSSRGuest } from '../../utils/canSSRGuest'

export default function Login(){
    const { signIn } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


   async function handleLogin(){

    if(email === '' || password === ''){
      return;
    }

        await signIn({
          email,
          password,
        })
    }

  return(
    <>
     <Head>
      <title>BarberPRO - Faça o login para acessar</title>
     </Head>

      <Flex 
      backgroundColor="barber.900" 
      height="100vh" 
      alignItems="center" 
      justifyContent="center"
      >
        <Flex width={640} direction="column" p={14} rounded={8}>
            <Center p={4}>
                <Image
                src={LogoImg}
                quality={100}
                width={240}
                objectFit="fill"
                alt="Logo barberpro"
                />
            </Center>

            <Input
            backgroundColor="barber.400"
            variant="filled"
            size="lg"
            placeholder="email@email.com"
            type="email"
            mb={3}
            color="button.default"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

           <Input
            backgroundColor="barber.400"
            variant="filled"
            size="lg"
            placeholder="******"
            type="text"
            mb={6}
            color="button.default"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <Button
            backgroundColor="button.cta"
            mb={6}
            color="gray.900"
            _hover={{bg: "#ffb13e"}}
            onClick={handleLogin}
            >
                Acessar
            </Button>

            <Center>
                <Link href="/register">
                  <Text
                   color="button.default"
                   >
                    Ainda não possui conta? <strong>Cadastre-se</strong>
                  </Text>
                </Link>
            </Center>

        </Flex>
        
      </Flex>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return{
    props: {}
  }
})