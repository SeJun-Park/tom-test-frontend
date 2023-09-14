import { Badge, Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaRunning } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { isPlayer, isPlayerGames, isPlayerTeams } from "../api";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import Game from "../components/Game";
import KakaoADBig from "../components/KakaoADBig";
import KakaoADSmall from "../components/KakaoADSmall";
import ProtectedPage from "../components/ProtectedPage";
import { IPlayerUser, ITinyGame, ITinyTeam } from "../types";

export default function IsPlayerMyAllGameList() {
    const { isLoading : isPlayerLoading, data : isPlayerData, isError : isPlayerError } = useQuery<IPlayerUser>(["isPlayer"], isPlayer);
    const { isLoading : isPlayerTeamsLoading, data : isPlayerTeamsData, isError : isPlayerTeamsError } = useQuery<ITinyTeam[]>(["isPlayerTeams"], isPlayerTeams);
    const { isLoading : isPlayerGamesLoading, data : isPlayerGamesData, isError : isPlayerGamesError } = useQuery<ITinyGame[]>(["isPlayerGames"], isPlayerGames);

    const navigate = useNavigate();
    const onClickBack = () => {
        navigate(-1)
    }

    return (
        <ProtectedPage>
            <Helmet>
                <title>{ isPlayerData ? ("3OM | GameList") : "Loading.." }</title>
            </Helmet>
            <HStack height={20} px={5}>
                <Button variant={"unstyled"} onClick={onClickBack}>
                    <FaArrowLeft />
                </Button>
            </HStack>
            <VStack alignItems={"flex-start"} padding={"5"}>
                <Text fontSize={"xl"} as="b"> {isPlayerData?.username} </Text>
                <HStack>
                    <Badge ml={1} backgroundColor={"main.500"} color={"white"}>
                        <HStack>
                            <FaRunning />
                            <Text>{isPlayerGamesData ? isPlayerGamesData.length : "0"}</Text>
                        </HStack>
                    </Badge>
                </HStack>
            </VStack>
            <Divider />
            <VStack alignItems={"flex-end"} padding={"5"}>
                <Text fontSize={"xl"} > {isPlayerTeamsData ? isPlayerTeamsData.length : "0"} TEAM {isPlayerGamesData ? isPlayerGamesData.length : "0"} GAMES </Text>
                {/* <FaRunning /> */}
            </VStack>
            <VStack alignItems={"flex-start"} px={3} mt={8}>
                <Text as="b" color={"main.500"} fontSize={"md"}> 경기 </Text>
                <Divider />
                <HStack width={"100%"} justifyContent={"space-between"}>
                    <Text as="b" fontSize={"sm"}> TOTAL </Text>
                    <Text as="b" fontSize={"sm"}> {isPlayerGamesData ? isPlayerGamesData.length : "0"} 경기 </Text>
                </HStack>
            </VStack>
            <VStack>
                <Box w="320px" h="100px" mt={12}>
                        <KakaoADBig />
                </Box>
            </VStack>
            <BigDivider />
            <VStack alignItems={"flex-start"} px={3} spacing={5}>
                <Text as="b" color={"main.500"} fontSize={"sm"}> ALL </Text>
                {isPlayerGamesData ? isPlayerGamesData.map((game) => 
                                            <Game 
                                                key={game.pk}
                                                pk={game.pk}
                                                date={game.date}
                                                team={game.team}
                                                vsteam={game.vsteam}
                                                team_score={game.team_score}
                                                vsteam_score={game.vsteam_score}
                                                 />) : null}
            </VStack>
            <Empty />
            <VStack>
                <Box w="320px" h="50px" mt={3}>
                        <KakaoADSmall />
                </Box>
            </VStack>
            <Empty />
            <Empty />
        </ProtectedPage>
    )
}