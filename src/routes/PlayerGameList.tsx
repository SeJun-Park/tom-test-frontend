import { Badge, Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaRunning } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getPlayer, getPlayerGames } from "../api";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import Game from "../components/Game";
import KakaoADBig from "../components/KakaoADBig";
import KakaoADSmall from "../components/KakaoADSmall";
import ProtectedPage from "../components/ProtectedPage";
import { IPlayer, ITinyGame } from "../types";

export default function PlayerGameList() {

    const { playerPk } = useParams();

    const { isLoading : playerLoading, data : playerData, isError : playerError } = useQuery<IPlayer>(["player", playerPk], getPlayer);
    const { isLoading : playerGamesLoading, data : playerGamesData, isError : playerGamesError } = useQuery<ITinyGame[]>(["playerGames", playerPk], getPlayerGames);

    const navigate = useNavigate();
    const onClickBack = () => {
        navigate(-1)
    }

    return (
        <ProtectedPage>
            <Helmet>
                <title>{ playerData ? (`삼오엠 | ${playerData.backnumber}.${playerData.name} 경기`) : "Loading.." }</title>
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
                    <Badge backgroundColor={"main.500"} color={"white"}>
                        <HStack>
                            <FaRunning />
                            <Text>{playerGamesData ? playerGamesData.length : "0"}</Text>
                        </HStack>
                    </Badge>
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
            <VStack>
                <Box w="320px" h="100px" mt={12}>
                        <KakaoADBig />
                </Box>
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