import { Badge, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaFutbol } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getPlayer, getPlayerGames, getPlayerGoalGames, getPlayerGoals } from "../api";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import Game from "../components/Game";
import ProtectedPage from "../components/ProtectedPage";
import { IGoals, IPlayer, ITinyGame } from "../types";

export default function PlayerGoalGameList() {

    const { playerPk } = useParams();

    const { isLoading : playerLoading, data : playerData, isError : playerError } = useQuery<IPlayer>(["player", playerPk], getPlayer);
    const { isLoading : playerGamesLoading, data : playerGamesData, isError : playerGamesError } = useQuery<ITinyGame[]>(["playerGames", playerPk], getPlayerGames);
    const { isLoading : playerGoalsLoading, data : playerGoalsData, isError : playerGoalsError } = useQuery<IGoals>(["playerGoals", playerPk], getPlayerGoals);
    const { isLoading : playerGoalGamesLoading, data : playerGoalGamesData, isError : playerGoalGamesError } = useQuery<ITinyGame[]>(["playerGoalGames", playerPk], getPlayerGoalGames);

    const navigate = useNavigate();
    const onClickBack = () => {
        navigate(-1)
    }

    return (
        <ProtectedPage>
            <Helmet>
                <title>{ playerData ? (`3OM | ${playerData.backnumber}.${playerData.name} Goal Game List`) : "Loading.." }</title>
            </Helmet>
            <HStack height={20} px={5}>
                <Button variant={"unstyled"} onClick={onClickBack}>
                    <FaArrowLeft />
                </Button>
            </HStack>
            <VStack alignItems={"flex-start"} padding={"5"}>
                <Text fontSize={"xl"} as="b"> {playerData?.team.name} </Text>
                <HStack>
                    <Text fontSize={"xl"}> {playerData?.backnumber}.</Text>
                    <Text fontSize={"xl"}> {playerData?.name}</Text>
                </HStack>
                <HStack>
                    <Badge backgroundColor={"black"} color={"white"}>
                        <HStack>
                            <FaFutbol />
                            <Text>{playerGoalsData ? playerGoalsData.goals : "0"}</Text>
                        </HStack>
                    </Badge>
                </HStack>
            </VStack>
            <Divider />
            <VStack alignItems={"flex-end"} padding={"5"}>
                <Text fontSize={"xl"}> {playerGamesData ? playerGamesData.length : "0"} GAME {playerGoalsData?.goals} GOALS </Text>
            </VStack>
            <VStack alignItems={"flex-start"} px={3} mt={8}>
                <Text as="b" color={"main.500"} fontSize={"md"}> 골 넣은 경기 </Text>
                <Divider />
                <HStack width={"100%"} justifyContent={"space-between"}>
                    <Text as="b" fontSize={"sm"}> TOTAL </Text>
                    <Text as="b" fontSize={"sm"}> {playerGoalGamesData ? playerGoalGamesData.length : "0"} 경기 </Text>
                </HStack>
            </VStack>
            <BigDivider />
            <VStack alignItems={"flex-start"} px={3} spacing={5}>
                <Text as="b" color={"main.500"} fontSize={"sm"}> ALL </Text>
                {playerGoalGamesData ? playerGoalGamesData.map((goalGame) => 
                                            <Game 
                                                key={goalGame.pk}
                                                pk={goalGame.pk}
                                                date={goalGame.date}
                                                team={goalGame.team}
                                                vsteam={goalGame.vsteam}
                                                team_score={goalGame.team_score}
                                                vsteam_score={goalGame.vsteam_score}
                                                 />) : null}
            </VStack>
            <Empty />
        </ProtectedPage>
    )
}