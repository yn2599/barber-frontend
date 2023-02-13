import { useState, ChangeEvent } from 'react'
import Head from "next/head";
import {
    Flex,
    Text,
    Heading,
    Button,
    Stack,
    Switch,
    useMediaQuery
} from '@chakra-ui/react';
import { Sidebar } from '../../components/sidebar';
import Link from "next/link";
import { IoMdPricetag } from 'react-icons/io';

import { canSSRAuth } from '../../utils/canSSRAuth';
import { setupAPIClient } from '../../services/api';


interface HaicurtsItem{
    id: string;
    name: string;
    price: number | string;
    status: boolean;
    user_id: string;
}

interface HaircutsProps{
    haircuts:HaicurtsItem[];
}


export default function Haircuts({ haircuts }:HaircutsProps){

    const [haircutList, setHaircutList ] = useState<HaicurtsItem[]>(haircuts || []);
    const [disableHaircut, setDisableHaircut] = useState("enabled");

    const [ isMobile ] = useMediaQuery("(max-width: 500px)")

    async function handleDisable(e: ChangeEvent<HTMLInputElement>){
        const apiClient = setupAPIClient();

        if(e.target.value === 'disabled'){

            setDisableHaircut("enabled")

            const response = await apiClient.get('/haircuts',{
                params:{
                    status: true
                }
            })

            setHaircutList(response.data)
            
        }else{
            setDisableHaircut('disabled')
            
            const response = await apiClient.get('/haircuts',{
                params:{
                    status: false
                }
            })

            setHaircutList(response.data)
        }
        

    }

    return(
        <>
            <Head>
                <title>BarberPRO - Meu cortes</title>
            </Head>
            <Sidebar>
                <Flex direction="column" alignItems="flex-start" justifyContent="flex-start">
                    
                    <Flex
                    direction={isMobile ? 'column' : 'row'}
                    w="100%"
                    alignItems={isMobile ? 'flex-start' : 'center'}
                    justifyContent="flex-start"
                    mb={0}
                    
                    >
                        <Heading
                        fontSize={isMobile ? '28px' : '3xl'}
                        mt={4}
                        mb={4}
                        mr={4}
                        color="orange.900"
                        >
                            Modelos de corte
                        </Heading>

                        <Link href="/haircuts/new">
                          <Button>
                            Cadastrar novo
                          </Button>
                        </Link>

                        <Stack ml="auto" align="center" direction="row">
                            <Text color="#fff">ATIVOS</Text>
                            <Switch
                            colorScheme="green"
                            size="lg"
                            value={disableHaircut}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleDisable(e)}
                            isChecked={disableHaircut === 'disabled' ? false : true}
                            />
                        </Stack>
                    </Flex>

                    {haircutList.map(haircut => (
                        <Link key={haircut.id} href={`/haircuts/${haircut.id}`}>
                        <Flex
                        cursor="pointer"
                        w="100%"
                        p={4}
                        bg="barber.400"
                        direction="row"
                        rounded="4"
                        mb={2}
                        justifyContent="space-between"
                        marginLeft="4"
                        
                        >
  
                          <Flex direction="row" justifyContent="center" alignItems="center" >
                              <IoMdPricetag size={28} color="#fba931"  />

                              <Text color="#fff" noOfLines={4} ml={4}>{haircut.name}</Text>
                          </Flex>
  
                          <Text color="#fff">
                              Preço: R$ {haircut.price}
                          </Text>
  
                        </Flex>
                      </Link>
                    ))}

                </Flex>
            </Sidebar>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    try{

        const apiClient = setupAPIClient(ctx);
        const response = await apiClient.get('/haircuts',{
            params:{
                status: true,
            }
        })

        if(response.data === null){
            return{
                redirect:{
                    destination: '/dashboard',
                    permanent: false,
                }
            }
        }    

        return{
            props:{
                haircuts: response.data
            }
        }

    }catch(err){
        console.log(err);
    }

    return {
        redirect:{
            destination: '/dashboard',
            permanent: false
        }
    }
})