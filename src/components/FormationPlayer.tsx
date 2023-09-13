import { HStack, Text } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query";
import { getPlayer } from "../api";
import { IPlayer } from "../types";

interface IFormationPlayerProps {
    playerPk : number
}

export default function FormationPlayer ( props : IFormationPlayerProps ) {

    const { isLoading : playerLoading, data : playerData, isError : playerError } = useQuery<IPlayer>(["player", props.playerPk], getPlayer);

    return (
        <>
            <HStack>
                <Text fontSize={"xs"}>{playerData?.backnumber}.</Text>
                <Text fontSize={"sm"}>{playerData?.name}</Text>
            </HStack> 
        </>
    )
}