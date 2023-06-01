import { Avatar, Badge, Box, Divider, HStack, Text } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query";
import { FaUserNinja } from "react-icons/fa"
import { getPlayerTomGames } from "../api";
import { ITinyGame } from "../types";

interface IPlayerTOMStatsProps {
    index : number,
    pk : number,
    backnumber : number,
    avatar : string,
    name : string,
    is_connecting : boolean,
    is_connected : boolean
}

export default function PlayerTOMStats ( props : IPlayerTOMStatsProps ) {

    const { isLoading : playerTomGamesLoading, data : playerTomGamesData, isError : playerTomGamesError } = useQuery<ITinyGame[]>(["playerTomGames", props.pk], getPlayerTomGames);

    return (
        <Box width={"100%"}>
                <HStack justifyContent={"space-between"} mb={4} px={3}>
                    <HStack spacing={3}>
                        <Text as="b" fontSize={"xs"} color={"main.500"}>{props.index}.</Text>
                        <HStack spacing={3}>
                            <Avatar src={props.avatar}></Avatar>
                            <Text as="b" fontSize={"xs"}>{props.backnumber}.</Text>
                            <Text as="b" fontSize={"xs"}>{props.name}</Text>
                        </HStack>
                    </HStack>
                    <Badge ml={1} backgroundColor={"point.500"} color={"black"}>
                        <HStack>
                            <FaUserNinja />
                            <Text>{playerTomGamesData ? playerTomGamesData.length : "0"}</Text>
                        </HStack>
                    </Badge>
                </HStack>
                <Divider />
        </Box>
    )
}