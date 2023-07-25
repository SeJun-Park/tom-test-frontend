import { Avatar, Badge, Button, Divider, HStack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaArrowRight, FaFutbol, FaRunning, FaUserNinja } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getPlayer, getPlayerGames, getPlayerGoals, getPlayerTomGames } from "../api";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import PlayerConnectCancelModal from "../components/PlayerConnectCancelModal";
import SmallDivider from "../components/SmallDivider";
import { IGoals, IPlayer, ITinyGame } from "../types";

interface IsPlayerTeamHomePlayerIsConnectedProps {
    playerPk : string
}
export default function IsPlayerTeamHomePlayerIsConnected( props : IsPlayerTeamHomePlayerIsConnectedProps ) {

    const { isLoading : playerLoading, data : playerData, isError : playerError } = useQuery<IPlayer>(["player", props.playerPk], getPlayer);
    const { isLoading : playerGamesLoading, data : playerGamesData, isError : playerGamesError } = useQuery<ITinyGame[]>(["playerGames", props.playerPk], getPlayerGames);
    const { isLoading : playerGoalsLoading, data : playerGoalsData, isError : playerGoalsError } = useQuery<IGoals>(["playerGoals", props.playerPk], getPlayerGoals);
    const { isLoading : playerTomGamesLoading, data : playerTomGamesData, isError : playerTomGamesError } = useQuery<ITinyGame[]>(["playerTomGames", props.playerPk], getPlayerTomGames);

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <HStack p={5} justifyContent={"flex-start"} spacing={5} width={"100%"}>
                <Avatar size={"xl"} src={playerData?.avatar} />
                <VStack alignItems={"flex-start"}>
                    <Text fontSize={"xl"}>{playerData?.backnumber}.</Text>
                    <Text as="b" fontSize={"xl"}>{playerData?.name}</Text>
                </VStack>
            </HStack>
            <HStack justifyContent={"center"}>
                <Badge ml={1} backgroundColor={"main.500"} color={"white"}>
                    <HStack>
                        <FaRunning />
                        <Text>{playerGamesData ? playerGamesData.length : "0"}</Text>
                    </HStack>
                </Badge>
                <Badge ml={1} backgroundColor={"point.500"} color={"black"}>
                    <HStack>
                        <FaUserNinja />
                        <Text>{playerTomGamesData ? playerTomGamesData.length : "0"}</Text>
                    </HStack>
                </Badge>
                <Badge ml={1} backgroundColor={"black"} color={"white"}>
                    <HStack>
                        <FaFutbol />
                        <Text>{playerGoalsData ? playerGoalsData.goals : "0"}</Text>
                    </HStack>
                </Badge>
            </HStack>
            <VStack justifyContent={"center"} pt={5}>
                    <Button backgroundColor={"gray.100"} color={"black"} size={"sm"} onClick={onOpen}> disconnect </Button>
            </VStack>
            <BigDivider />
            <Link to={`/players/${playerData?.id}/games`}>
                <VStack alignItems={"flex-start"} px={3} mt={8}>
                    <HStack width={"100%"} justifyContent={"space-between"}>
                        <Text as="b" color={"main.500"} fontSize={"md"}> 경기 </Text>
                        <FaArrowRight size={"10"}/>
                    </HStack>
                    <Divider />
                    <HStack width={"100%"} justifyContent={"space-between"}>
                        <Text as="b" fontSize={"sm"}> TOTAL </Text>
                        <Text as="b" fontSize={"sm"}> {playerGamesData ? playerGamesData.length : "0"} 경기 </Text>
                    </HStack>
                </VStack>
            </Link>
            <SmallDivider />
            <Link to={`/players/${playerData?.id}/votes`}>
                <VStack alignItems={"flex-start"} px={3} mt={8}>
                    <HStack width={"100%"} justifyContent={"space-between"}>
                        <Text as="b" color={"main.500"} fontSize={"sm"}> 투표 </Text>
                        <FaArrowRight size={"10"}/>
                    </HStack>
                    <Divider />
                    <HStack width={"100%"} justifyContent={"space-between"}>
                        <Text as="b" fontSize={"sm"}> TOTAL </Text>
                        <Text as="b" fontSize={"sm"}> {playerTomGamesData ? playerTomGamesData.length : "0"} 회 </Text>
                    </HStack>
                </VStack>
            </Link>
            <SmallDivider />
            <Link to={`/players/${playerData?.id}/goals`}>
                <VStack alignItems={"flex-start"} px={3} mt={8}>
                    <HStack width={"100%"} justifyContent={"space-between"}>
                        <Text as="b" color={"main.500"} fontSize={"md"}> 골 </Text>
                        <FaArrowRight size={"10"}/>
                    </HStack>
                    <Divider />
                    <HStack width={"100%"} justifyContent={"space-between"}>
                        <Text as="b" fontSize={"sm"}> TOTAL </Text>
                        <Text as="b" fontSize={"sm"}> {playerGoalsData ? playerGoalsData.goals : "0"} 골 </Text>
                    </HStack>
                </VStack>
            </Link>
            <Empty />
            <PlayerConnectCancelModal isOpen={isOpen} onClose={onClose} playerPk={props.playerPk} />
        </>
    )
}