import { Avatar, Badge, Box, Divider, HStack, Text } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query";
import { FaFutbol } from "react-icons/fa"
import { getPlayerGoals } from "../api";
import { IGoals } from "../types";

interface IPlayerGoalStatsProps {
    pk : number,
    backnumber : number,
    avatar : string,
    name : string,
    is_connecting : boolean,
    is_connected : boolean
}

export default function PlayerGoalStats ( props : IPlayerGoalStatsProps ) {

    const { isLoading : playerGoalsLoading, data : playerGoalsData, isError : playerGoalsError } = useQuery<IGoals>(["playerGoals", props.pk], getPlayerGoals);

    return (
        <Box width={"100%"}>
                <HStack justifyContent={"center"} mb={4} px={3}>
                    <Badge ml={1} backgroundColor={"black"} color={"white"}>
                        <HStack>
                            <FaFutbol />
                            <Text>{playerGoalsData ? playerGoalsData.goals : "0"}</Text>
                        </HStack>
                    </Badge>
                    <HStack spacing={3}>
                        <Avatar src={props.avatar}></Avatar>
                        <Text as="b" fontSize={"xs"}>{props.backnumber}.</Text>
                        <Text as="b" fontSize={"xs"}>{props.name}</Text>
                    </HStack>
                </HStack>
                <Divider />
        </Box>
    )
}