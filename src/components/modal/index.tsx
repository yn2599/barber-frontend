import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Flex,
    Text,
    Button,
} from '@chakra-ui/react';

import { FiUser, FiScissors } from 'react-icons/fi';
import { FaMoneyBillWaveAlt } from 'react-icons/fa';
import { ScheduleItem } from '../../pages/dashboard'

interface ModalInfoProps{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    data: ScheduleItem;
    finishService: () => Promise<void>;
}

export  function ModalInfo({isOpen, onOpen, onClose, data, finishService}:ModalInfoProps){
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent bg="barber.400">
                <ModalHeader color="#fff" >Próximo</ModalHeader>
                <ModalCloseButton color="#fff"/>

                <ModalBody>
                    <Flex align="center"mb={3}>
                        <FiUser size={28} color="#ffb13e"/>
                        <Text color="#fff" ml={3}>{data?.customer}</Text>
                    </Flex>

                    <Flex align="center"mb={3}>
                        <FiScissors size={28} color="#ffF"/>
                        <Text color="#fff" ml={3}>{data?.haircut.name}</Text>
                    </Flex>

                    <Flex align="center"mb={3}>
                        <FaMoneyBillWaveAlt size={28} color="#46ef75"/>
                        <Text color="#fff" ml={3}>R$ {data?.haircut.price}</Text>
                    </Flex>

                    <ModalFooter>
                        <Button
                        bg="button.cta"
                        _hover={{  bg: "#ffb13e"}}
                        color="#fff"
                        mr={3}
                        onClick={ () => finishService()}
                        >
                            Finalizar Serviço
                        </Button>
                    </ModalFooter>
                </ModalBody>

            </ModalContent>
        </Modal>
    )
}