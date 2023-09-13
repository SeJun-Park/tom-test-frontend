import { Avatar, Box, Button, Divider, HStack, Text, useDisclosure } from "@chakra-ui/react"
import { FaArrowRight, FaTrashAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import PlayerDailyDeleteModal from "./PlayerDailyDeleteModal"

interface IPlayerProps {
    pk : number,
    backnumber : number,
    avatar : string,
    name : string,
    is_connecting : boolean,
    is_connected : boolean,
    is_daily : boolean,
    is_spvsr : boolean
}

export default function Player ( props : IPlayerProps ) {

    const { isOpen : isDeleteOpen, onOpen : onDeleteOpen, onClose : onDeleteClose } = useDisclosure()
    return (
        <>
        {props.is_daily ? 
                                    <Box width={"100%"}>
                                        <HStack justifyContent={"space-between"} mb={4} px={3}>
                                            <HStack spacing={3}>
                                                <Avatar src={props.avatar}></Avatar>
                                                <Text as="b" fontSize={"xs"}>{props.backnumber}.</Text>
                                                <Text as="b" fontSize={"sm"}>{props.name}</Text>
                                            </HStack>
                                            {props.is_spvsr &&  <>
                                                                    <Button onClick={onDeleteOpen} size={"xs"} variant={"outline"}>
                                                                        <FaTrashAlt size={12} />
                                                                    </Button>
                                                                    <PlayerDailyDeleteModal playerPk={props.pk} isOpen={isDeleteOpen} onClose={onDeleteClose} />
                                                                </>
                                                                }
                                        </HStack>
                                        <Divider />
                                    </Box>
                                    :
                                    <Box width={"100%"}>
                                        <Link to={`/players/${props.pk}`}>
                                            <HStack justifyContent={"space-between"} mb={4} px={3}>
                                                <HStack spacing={3}>
                                                    <Avatar src={props.avatar}></Avatar>
                                                    <Text as="b" fontSize={"xs"}>{props.backnumber}.</Text>
                                                    <Text as="b" fontSize={"sm"}>{props.name}</Text>
                                                </HStack>
                                                <Box>
                                                    <FaArrowRight size={10} />
                                                </Box>
                                            </HStack>
                                            <Divider />
                                        </Link>
                                    </Box>
                                     }
        </>
    )
}