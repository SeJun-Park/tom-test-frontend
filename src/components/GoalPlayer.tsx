import { HStack, Text } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query";
import { FaFutbol } from "react-icons/fa"
import { getPlayer } from "../api";
import { IPlayer } from "../types";

interface IGoalPlayerProps {
    playerPk : number
}

export default function GoalPlayer ( props : IGoalPlayerProps ) {

    const { isLoading : playerLoading, data : playerData, isError : playerError } = useQuery<IPlayer>(["player", props.playerPk], getPlayer);

    return (
            <HStack>
                <FaFutbol />
                <Text fontSize={"xs"}>{playerData?.name}</Text>
            </HStack> 
    )
}