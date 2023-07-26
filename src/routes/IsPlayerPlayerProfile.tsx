import { Avatar, Badge, Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaArrowRight, FaFutbol, FaRunning, FaUser, FaUserNinja } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPlayer, getPlayerGames, getPlayerGoals, getPlayerTomGames } from "../api";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import Game from "../components/Game";
import NullGame from "../components/NullGame";
import ProtectedPage from "../components/ProtectedPage";
import SmallDivider from "../components/SmallDivider";
import useUser from "../lib/useUser";
import { IGoals, IPlayer, ITinyGame } from "../types";

export default function IsPlayerPlayerProfile() {

    const { playerPk } = useParams();

    const { isLoading : playerLoading, data : playerData, isError : playerError } = useQuery<IPlayer>(["player", playerPk], getPlayer);
    const { isLoading : playerGamesLoading, data : playerGamesData, isError : playerGamesError } = useQuery<ITinyGame[]>(["playerGames", playerPk], getPlayerGames);
    const { isLoading : playerGoalsLoading, data : playerGoalsData, isError : playerGoalsError } = useQuery<IGoals>(["playerGoals", playerPk], getPlayerGoals);
    const { isLoading : playerTomGamesLoading, data : playerTomGamesData, isError : playerTomGamesError } = useQuery<ITinyGame[]>(["playerTomGames", playerPk], getPlayerTomGames);

    const navigate = useNavigate();
    const onClickBack = () => {
        navigate(-1)
    }

    return (
        <ProtectedPage>
            <Helmet>
                <title>{ playerData ? (`3OM | ${playerData.team.name} / ${playerData.backnumber}.${playerData.name}`) : "Loading.." }</title>
            </Helmet>
            <HStack height={20} px={5}>
                <Button variant={"unstyled"} onClick={onClickBack}>
                    <FaArrowLeft />
                </Button>
            </HStack>
            <VStack alignItems={"flex-start"} padding={"5"}>
                <Text fontSize={"xl"} as="b"> {playerData?.team.name} </Text>
            </VStack>
            <HStack p={5} justifyContent={"flex-start"} spacing={5} width={"100%"}>
                <Avatar size={"xl"} src={playerData?.avatar} />
                <VStack alignItems={"flex-start"}>
                    <Text fontSize={"xl"}>{playerData?.backnumber}.</Text>
                    <Text as="b" fontSize={"xl"}>{playerData?.name}</Text>
                </VStack>
            </HStack>
            <VStack>
                <HStack>
                    {playerData?.connected_user ? <Badge ml={1} backgroundColor={"main.500"} color={"white"} variant={"outline"}> CNTD </Badge> : <Badge ml={1} backgroundColor={"white"} color={"gray.400"} variant={"outline"}> NOT CNTD </Badge>}
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
            </VStack>
            <VStack alignItems={"flex-start"} px={3}>
                <Text as="b" color={"main.500"} mt={10} fontSize={"md"}> 최근 경기 </Text>
                {playerGamesData ? (playerGamesData[0] ? 
                    <Game 
                        pk={playerGamesData[0].pk} 
                        date={playerGamesData[0].date} 
                        team={playerGamesData[0].team} 
                        vsteam={playerGamesData[0].vsteam}
                        team_score={playerGamesData[0].team_score}
                        vsteam_score={playerGamesData[0].vsteam_score}
                        /> 
                        : <NullGame />) : <NullGame />}
            </VStack>
            <BigDivider />
            <Link to={`/players/${playerPk}/games`}>
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
            <Link to={`/players/${playerPk}/votes`}>
                <VStack alignItems={"flex-start"} px={3} mt={8}>
                        <HStack width={"100%"} justifyContent={"space-between"}>
                            <Text as="b" color={"main.500"} fontSize={"md"}> 투표 </Text>
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
        </ProtectedPage>
    )
}