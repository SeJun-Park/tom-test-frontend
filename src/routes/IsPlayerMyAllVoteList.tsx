import { Badge, Box, Button, Divider, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaUserNinja } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { isPlayer, isPlayerGames, isPlayerSuperplayers, isPlayerTomGames } from "../api";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import KakaoADBig from "../components/KakaoADBig";
import KakaoADSmall from "../components/KakaoADSmall";
import ProtectedPage from "../components/ProtectedPage";
import SmallDivider from "../components/SmallDivider";
import TomGame from "../components/TomGame";
import { IPlayerUser, ISuperplayer, ITinyGame } from "../types";

export default function IsPlayerMyAllVoteList() {
    const { isLoading : isPlayerLoading, data : isPlayerData, isError : isPlayerError } = useQuery<IPlayerUser>(["isPlayer"], isPlayer);
    const { isLoading : isPlayerGamesLoading, data : isPlayerGamesData, isError : isPlayerGamesError } = useQuery<ITinyGame[]>(["isPlayerGames"], isPlayerGames);
    const { isLoading : isPlayerTomGamesLoading, data : isPlayerTomGamesData, isError : isPlayerTomGamesError } = useQuery<ITinyGame[]>(["isPlayerTomGames"], isPlayerTomGames);
    const { isLoading : isPlayerSuperplayersLoading, data : isPlayerSuperplayersData, isError : isPlayerSuperplayersError } = useQuery<ISuperplayer[]>(["isPlayerSuperplayers"], isPlayerSuperplayers);

    const navigate = useNavigate();
    const onClickBack = () => {
        navigate(-1)
    }

    return (
        <ProtectedPage>
            <Helmet>
                <title>{ isPlayerData ? ("삼오엠 | 투표") : "Loading.." }</title>
            </Helmet>
            <HStack height={20} px={5}>
                <Button variant={"unstyled"} onClick={onClickBack}>
                    <FaArrowLeft />
                </Button>
            </HStack>
            <VStack alignItems={"flex-start"} padding={"5"}>
                <Text fontSize={"xl"} as="b"> {isPlayerData?.username} </Text>
                <HStack>
                    <Badge ml={1} backgroundColor={"point.500"} color={"black"}>
                        <HStack>
                            <FaUserNinja />
                            <Text>{isPlayerTomGamesData ? isPlayerTomGamesData.length : "0"}</Text>
                        </HStack>
                    </Badge>
                </HStack>
            </VStack>
            <VStack>
                <Box w="320px" h="100px" my={3}>
                        <KakaoADBig />
                </Box>
            </VStack>
            <Tabs isFitted my={5} isLazy>
                <TabList mb='1em'>
                    <Tab _selected={{color : "main.500"}}> 3OM </Tab>
                    <Tab _selected={{color : "main.500"}}> 다른 투표 </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel p={0}>
                        <VStack padding={"5"} alignItems={"flex-end"}>
                            <Text fontSize={"xl"} > {isPlayerGamesData ? isPlayerGamesData.length : "0"} GAME {isPlayerTomGamesData ? isPlayerTomGamesData.length : "0"} TIMES </Text>
                            {/* <FaUserNinja /> */}
                        </VStack>
                        <VStack alignItems={"flex-start"} px={3} mt={8}>
                            <Text as="b" color={"main.500"} fontSize={"sm"}> 3OM </Text>
                            <Divider />
                            <HStack width={"100%"} justifyContent={"space-between"}>
                                <Text as="b" fontSize={"sm"}> TOTAL </Text>
                                <Text as="b" fontSize={"sm"}> {isPlayerTomGamesData ? isPlayerTomGamesData.length : "0"} 회 </Text>
                            </HStack>
                        </VStack>
                        <BigDivider />
                        <VStack alignItems={"flex-start"} px={3} spacing={5}>
                            <Text as="b" color={"main.500"} fontSize={"sm"}> ALL </Text>
                            {isPlayerTomGamesData ? isPlayerTomGamesData.map((tomGame) => 
                                                        <TomGame 
                                                            key={tomGame.pk}
                                                            pk={tomGame.pk}
                                                            date={tomGame.date}
                                                            team={tomGame.team}
                                                            vsteam={tomGame.vsteam}
                                                            team_score={tomGame.team_score}
                                                            vsteam_score={tomGame.vsteam_score}
                                                            toms={tomGame.toms}
                                                            />) : null}
                        </VStack>
                        <Empty />
                    </TabPanel>
                    <TabPanel p={0}>
                        <VStack alignItems={"flex-start"} padding={"5"} mb={10}>
                            <Text fontSize={"xl"} as="b"> 투표 등록 전입니다. </Text>
                        </VStack>
                        <Empty />
                        <Empty />
                        <Empty />
                        <Empty />
                        <Empty />
                        <Empty />
                        <Empty />
                        <Empty />
                    </TabPanel>
                </TabPanels>
            </Tabs>
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