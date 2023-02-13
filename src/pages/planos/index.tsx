import Head from "next/head";
import {
    Flex,
    Button,
    Heading,
    Text,
    useMediaQuery
} from '@chakra-ui/react'

import { Sidebar } from '../../components/sidebar'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { setupAPIClient } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'

interface PlanosProps{
    premium: boolean;
}

export default function Planos({ premium }:PlanosProps){

    const [isMobile] = useMediaQuery("(max-width: 500px)")

    const handleSubscribe = async () => {
        
        try{

            const apiclient = setupAPIClient();
            const response = await apiclient.post('/subscribe')

            const { sessionId } = response.data;

            const stripe = await getStripeJs();
            await stripe.redirectToCheckout({ sessionId: sessionId })

        }catch(err){
            console.log(err)
        }
    }

    async function handleCreatePortal(){
        
        try{

            if(!premium){
                return;
            }

            const apiClient = setupAPIClient();
            const response = await apiClient.post('/create-portal')

            const { sessionId } = response.data;

            window.location.href = sessionId;

        }catch(err){
            console.log(err.message)
        }
    }

    return(
        <>
          <Head>
            <title>BarberPRO - Sua assinatira Premium</title>
          </Head>

          <Sidebar>
            <Flex w="100%" direction="column" align="flex-start" justify="flex-start" mt={4}
             mb={4} mr={4}>
                <Heading color="#fff">Planos</Heading>
            </Flex>
            <Flex 
            pb={8} 
            maxW="780px" 
            w="100%" 
            direction="column" 
            align="flex-start" 
            justify="flex-start"
            >
                <Flex gap={4} w="100%" flexDirection={isMobile ? "column" : "row"}>
                    <Flex rounded={4} p={2} flex={1} bg="barber.400" flexDirection="column">
                        <Heading 
                        color="#fff"
                        textAlign="center"
                        fontSize="3xl"
                        mt={2} mb={4}
                        > 
                          Planos Grátis 
                        </Heading>

                        <Text color="#fff"ml={4} mb={2}>Registrar cortes.</Text>
                        <Text color="#fff"ml={4} mb={2}>Criar apenas 3 modelos de corte.</Text>
                        <Text color="#fff"ml={4} mb={2}>Editar dados do perfil.</Text>

                    </Flex>

                    <Flex rounded={4} p={2} flex={1} bg="barber.400" flexDirection="column">
                        <Heading 
                        color="#31fb6a"
                        textAlign="center"
                        fontSize="3xl"
                        mt={2} mb={4}
                        > 
                          Premium
                        </Heading>

                        <Text color="#fff"ml={4} mb={2}>Registrar cortes ilimitados.</Text>
                        <Text color="#fff"ml={4} mb={2}>Criar modelos ilimitados.</Text>
                        <Text color="#fff"ml={4} mb={2}>Editar dados do perfil.</Text>
                        <Text color="#fff"ml={4} mb={2}>Editar dados modelo de corte.</Text>
                        <Text color="#fff"ml={4} mb={2}>Receber todas atualizações.</Text>
                        <Text color="#31fb6a" fontSize="2xl" ml={4} mb={2}>R$ 9.99</Text>

                        <Button
                        bg={premium ? "transparent" : "button.cta"}
                        m={2}
                        color="white"
                        onClick={ handleSubscribe }
                        _hover={{ bg: premium ? "#ff4040" : "#31fb6a"}}
                        disabled={premium}
                        >
                            {premium ? (
                            "VOCÊ É PREMIUM"
                          ):(
                            "VIRA PREMIUM"
                          )}
                        </Button>

                        {premium &&(
                            <Button
                            m={2}
                            bg="white"
                            color="barber.900"
                            onClick={handleCreatePortal}
                            >
                                ALTERAR ASSINATURA
                            </Button>
                        )}

                    </Flex>

                    

                </Flex>
            </Flex>
          </Sidebar>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
   
    try{

        const apiClient = setupAPIClient(ctx)
        const response = await apiClient.get('/me')

        return{
            props:{
                premium: response.data?.subscriptions?.status === 'active' ? true : false
            }
        }

    }catch(err){
        console.log(err)
        return{
            redirect:{
                destination: '/dashboard',
                permanent: false
            }
        }
    }
})