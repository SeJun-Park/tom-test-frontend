import { Avatar, Badge, Box, Divider, HStack, Text, VStack } from "@chakra-ui/react"
import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"

interface ISpvsrPlayerProps {
    pk : number,
    backnumber : number,
    avatar : string,
    name : string,
    is_connecting : boolean,
    is_connected : boolean,
    is_spvsr : boolean
}

export default function SpvsrPlayer ( props : ISpvsrPlayerProps ) {
    return (
        <Box width={"100%"}>
            <Link to={`/players/${props.pk}`}>
                <HStack justifyContent={"space-between"} mb={4} px={3}>
                    <HStack spacing={3}>
                        <Avatar src={props.avatar}></Avatar>
                        <VStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                            <HStack>
                                <Text as="b" fontSize={"xs"}>{props.backnumber}.</Text>
                                <Text as="b" fontSize={"xs"}>{props.name}</Text>
                            </HStack>
                                
                                {props.is_spvsr ? (props.is_connected ? 
                                                        <Badge ml={1} backgroundColor={"main.500"} color={"white"} variant={"outline"}> CNTD </Badge>
                                                                : (props.is_connecting ? <Badge ml={1} backgroundColor={"point.500"} color={"black"} variant={"outline"}> CNTING.. </Badge>
                                                                                : <Badge ml={1} backgroundColor={"white"} color={"gray.400"} variant={"outline"}> NOT CNTD </Badge>)) : null}
                        </VStack>
                    </HStack>
                    <Box>
                        <FaArrowRight size={10} />
                    </Box>
                </HStack>
                <Divider />
            </Link>
        </Box>
    )
}