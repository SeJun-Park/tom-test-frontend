import { Avatar, HStack, Text, VStack } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query";
import { getPlayer } from "../api";
import { IPlayer } from "../types";

interface IFormationPlayerProps {
    playerPk : number
}

export default function FormationPlayer ( props : IFormationPlayerProps ) {

    const { isLoading : playerLoading, data : playerData, isError : playerError } = useQuery<IPlayer>(["player", props.playerPk], getPlayer, {
        enabled: !!props.playerPk
    });

    return (
        <VStack spacing={0}>
            <Avatar src={playerData ? playerData.avatar : "https://imagedelivery.net/SbAhiipQhJYzfniSqnZDWw/dcb04b4d-9480-47cc-1789-8cc39dcf0a00/public"} showBorder={true} borderColor={"white"}/>
            <Text as="b">{playerData?.name}</Text>
        </VStack>
    )
}