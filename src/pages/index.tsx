import Head from "next/head"
import { Flex, Text } from '@chakra-ui/react'

export default function Home(){
  return(
    <>
     <Head>
      <title>BarberPRO - Seu sistema completo</title>
     </Head>

      <Flex 
      backgroundColor="barber.900" 
      height="100vh" 
      alignItems="center" 
      justifyContent="center">

        <Text color="button.default" fontSize={30}>Pagina Home</Text>
      </Flex>
    </>
  )
}
