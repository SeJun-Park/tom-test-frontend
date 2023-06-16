import { Avatar, Box, Divider, HStack, Text } from "@chakra-ui/react"
import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"

interface ITeamProps {
    pk : number,
    avatar : string,
    name : string,
}

export default function Team( props : ITeamProps ) {
    return (
        <Box width={"100%"}>
            <Link to={`/teams/${props.pk}`}>
                <HStack justifyContent={"space-between"} mb={4} px={3}>
                    <HStack spacing={3}>
                        <Avatar src={props.avatar}></Avatar>
                        <Text as="b" fontSize={"sm"}> {props.name} </Text>
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