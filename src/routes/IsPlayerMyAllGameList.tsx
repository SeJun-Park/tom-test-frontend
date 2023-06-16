import { Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaRunning } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { isPlayer, isPlayerGames, isPlayerTeams } from "../api";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import Game from "../components/Game";
import ProtectedPage from "../components/ProtectedPage";
import { IPlayerUser, ITinyGame, ITinyTeam } from "../types";

export default function IsPlayerMyAllGameList() {
    const { isLoading : playerLoading, data : playerData, isError : playerError } = useQuery<IPlayerUser>(["isPlayer"], isPlayer);
    const { isLoading : playerTeamsLoading, data : playerTeamsData, isError : playerTeamsError } = useQuery<ITinyTeam[]>(["isPlayerTeams"], isPlayerTeams);
    const { isLoading : playerGamesLoading, data : playerGamesData, isError : playerGamesError } = useQuery<ITinyGame[]>(["isPlayerGames"], isPlayerGames);

    const navigate = useNavigate();
    const onClickBack = () => {
        navigate(-1)
    }

    return (
        <ProtectedPage>
            <Helmet>
                <title>{ playerData ? ("3OM | GameList") : "Loading.." }</title>
            </Helmet>
            <HStack height={20} px={5}>
                <Button variant={"unstyled"} onClick={onClickBack}>
                    <FaArrowLeft />
                </Button>
            </HStack>
            <VStack alignItems={"flex-start"} padding={"5"}>
                <Text fontSize={"xl"} as="b"> {playerData?.username} </Text>
                <HStack>
                    <Text fontSize={"xl"} > {playerTeamsData ? playerTeamsData.length : "0"} TEAM {playerGamesData ? playerGamesData.length : "0"} GAMES </Text>
                    {/* <FaRunning /> */}
                </HStack>
            </VStack>
            <VStack alignItems={"flex-start"} px={3} mt={8}>
                <Text as="b" color={"main.500"} fontSize={"md"}> 경기 </Text>
                <Divider />
                <HStack width={"100%"} justifyContent={"space-between"}>
                    <Text as="b" fontSize={"sm"}> TOTAL </Text>
                    <Text as="b" fontSize={"sm"}> {playerGamesData ? playerGamesData.length : "0"} 경기 </Text>
                </HStack>
            </VStack>
            <BigDivider />
            <VStack alignItems={"flex-start"} px={3} spacing={5}>
                <Text as="b" color={"main.500"} fontSize={"sm"}> ALL </Text>
                {playerGamesData ? playerGamesData.map((game) => 
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
        </ProtectedPage>
    )
}