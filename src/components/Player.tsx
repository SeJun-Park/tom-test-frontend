import { Avatar, Box, Divider, HStack, Text } from "@chakra-ui/react"
import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"

interface IPlayerProps {
    pk : number,
    backnumber : number,
    avatar : string,
    name : string,
    is_connecting : boolean,
    is_connected : boolean
}

export default function Player ( props : IPlayerProps ) {
    return (
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
    )
}