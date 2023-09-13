import { Avatar, Box, HStack, Text } from "@chakra-ui/react"

interface IPlayerNoLinkProps {
    pk : number,
    backnumber : number,
    avatar : string,
    name : string,
    is_connecting : boolean,
    is_connected : boolean
}

export default function PlayerNoLink ( props : IPlayerNoLinkProps ) {
    return (
        <Box width={"100%"}>
                <HStack justifyContent={"space-between"} mb={4} px={3}>
                    <HStack spacing={3}>
                        <Avatar src={props.avatar}></Avatar>
                        <Text as="b" fontSize={"xs"}>{props.backnumber}.</Text>
                        <Text as="b" fontSize={"sm"}>{props.name}</Text>
                    </HStack>
                </HStack>
        </Box>
    )
}