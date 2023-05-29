import { Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaFutbol } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { isPlayer, isPlayerGames, isPlayerGoalGames, isPlayerGoals } from "../api";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import Game from "../components/Game";
import ProtectedPage from "../components/ProtectedPage";
import SmallDivider from "../components/SmallDivider";
import { IGoals, IPlayerUser, ITinyGame, ITinyTeam } from "../types";

export default function IsPlayerMyAllGoalGameList() {
    const { isLoading : playerLoading, data : playerData, isError : playerError } = useQuery<IPlayerUser>(["isPlayer"], isPlayer);
    const { isLoading : playerGamesLoading, data : playerGamesData, isError : playerGamesError } = useQuery<ITinyGame[]>(["isPlayerGames"], isPlayerGames);
    const { isLoading : playerGoalsLoading, data : playerGoalsData, isError : playerGoalsError } = useQuery<IGoals>(["isPlayerGoals"], isPlayerGoals);
    const { isLoading : playerGoalGamesLoading, data : playerGoalGamesData, isError : playerGoalGamesError } = useQuery<ITinyGame[]>(["isPlayerGoalGames"], isPlayerGoalGames);

    const navigate = useNavigate();
    const onClickBack = () => {
        navigate(-1)
    }

    return (
        <ProtectedPage>
            <Helmet>
                <title>{ playerData ? ("3OM | GoalGameList") : "Loading.." }</title>
            </Helmet>
            <HStack height={20} px={5}>
                <Button variant={"unstyled"} onClick={onClickBack}>
                    <FaArrowLeft />
                </Button>
            </HStack>
            <VStack alignItems={"flex-start"} padding={"5"}>
                <Text fontSize={"xl"} as="b"> {playerData?.username} </Text>
                <HStack>
                    <Text fontSize={"xl"} > {playerGamesData ? playerGamesData.length : "0"} GAME {playerGoalsData ? playerGoalsData.goals : "0"} GOALS </Text>
                    {/* <FaFutbol /> */}
                </HStack>
            </VStack>
            <VStack alignItems={"flex-start"} px={3} mt={8}>
                <Text as="b" color={"main.500"} fontSize={"sm"}> GOAL </Text>
                <Divider />
                <HStack width={"100%"} justifyContent={"space-between"}>
                    <Text as="b" fontSize={"sm"}> TOTAL </Text>
                    <Text as="b" fontSize={"sm"}> {playerGoalsData ? playerGoalsData.goals : "0"} GOALS </Text>
                </HStack>
            </VStack>
            <SmallDivider />
            <VStack alignItems={"flex-start"} px={3} mt={8}>
                <Text as="b" color={"main.500"} fontSize={"sm"}> GOAL GAME </Text>
                <Divider />
                <HStack width={"100%"} justifyContent={"space-between"}>
                    <Text as="b" fontSize={"sm"}> TOTAL </Text>
                    <Text as="b" fontSize={"sm"}> {playerGoalGamesData ? playerGoalGamesData.length : "0"} GAMES </Text>
                </HStack>
            </VStack>
            <BigDivider />
            <VStack alignItems={"flex-start"} px={3} spacing={5}>
                <Text as="b" color={"main.500"} fontSize={"sm"}> ALL </Text>
                {playerGoalGamesData ? playerGoalGamesData.map((game) => 
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