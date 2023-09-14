import { VStack, Text, Tabs, TabList, Tab, TabPanels, TabPanel, Divider, HStack, Box, Badge, Image } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { FaArrowRight, FaFutbol, FaRunning, FaUserFriends, FaUserNinja } from "react-icons/fa"
import { Link } from "react-router-dom"
import { isPlayer, isPlayerGames, isPlayerGoals, isPlayerTeams, isPlayerTomGames } from "../api"
import BigDivider from "../components/BigDivider"
import Empty from "../components/Empty"
import Game from "../components/Game"
import KakaoADBig from "../components/KakaoADBig"
import NullGame from "../components/NullGame"
import ProtectedPage from "../components/ProtectedPage"
import SmallDivider from "../components/SmallDivider"
import Team from "../components/Team"
import { IGoals, IPlayerUser, ITinyGame, ITinyTeam } from "../types"

export default function IsPlayerHome() {

    const { isLoading : isPlayerLoading, data : isPlayerData, isError : isPlayerError } = useQuery<IPlayerUser>(["isPlayer"], isPlayer); 
    const { isLoading : isPlayerTeamsLoading, data : isPlayerTeamsData, isError : isPlayerTeamsError } = useQuery<ITinyTeam[]>(["isPlayerTeams"], isPlayerTeams);
    const { isLoading : isPlayerGamesLoading, data : isPlayerGamesData, isError : isPlayerGamesError } = useQuery<ITinyGame[]>(["isPlayerGames"], isPlayerGames);
    const { isLoading : isPlayerTomGamesLoading, data : isPlayerTomGamesData, isError : isPlayerTomGamesError } = useQuery<ITinyGame[]>(["isPlayerTomGames"], isPlayerTomGames);
    const { isLoading : isPlayerGoalsLoading, data : isPlayerGoalsData, isError : isPlayerGoalsError } = useQuery<IGoals>(["isPlayerGoals"], isPlayerGoals);

    const [tabIndex, setTabIndex] = useState(Number(localStorage.getItem('tabIndex')) || 0);

    useEffect(() => {
      localStorage.setItem('tabIndex', tabIndex.toString());
    }, [tabIndex]);

    return (
        <ProtectedPage>
            <Helmet>
                <title>{ isPlayerData ? ("3OM | Home") : "Loading.." }</title>
            </Helmet>
            <VStack>
                <Box w="320px" h="100px">
                        <KakaoADBig />
                </Box>
            </VStack>
            <VStack alignItems={"flex-start"} padding={"5"}>
                <VStack position="relative" width="320px" height="100">
                    <Link to={"/community"}>
                        <Box position="absolute" top={0} left={0} right={0} bottom={0}>
                            <Box
                            backgroundImage="url(https://imagedelivery.net/SbAhiipQhJYzfniSqnZDWw/3e881f4e-0d99-4087-77a2-236600d78700/public)"
                            backgroundSize="cover"
                            backgroundPosition="center"
                            width="100%"
                            height="100%"
                            borderRadius="xl"
                            textAlign={"center"}
                            display={"flex"}
                            flexDirection={"column"}
                            justifyContent={"flex-end"}
                            alignItems={"end"}
                            padding={2}
                            >
                                <HStack mr={2}>
                                    <Text fontSize="lg" color="white">
                                        COMMUNITY
                                    </Text>
                                    <Box color={"white"}>
                                        <FaArrowRight />
                                    </Box>
                                </HStack>
                            </Box>
                        </Box>
                    </Link>
                </VStack>
                <Empty />
                <Text fontSize={"xl"} as="b"> {isPlayerData?.username} </Text>
                <HStack>
                    <Badge ml={1} backgroundColor={"gray.100"} color={"black"}>
                        <HStack>
                            <FaUserFriends />
                            <Text>{isPlayerTeamsData ? isPlayerTeamsData.length : "0"}</Text>
                        </HStack>
                    </Badge>
                    <Badge ml={1} backgroundColor={"main.500"} color={"white"}>
                        <HStack>
                            <FaRunning />
                            <Text>{isPlayerGamesData ? isPlayerGamesData.length : "0"}</Text>
                        </HStack>
                    </Badge>
                    <Badge ml={1} backgroundColor={"point.500"} color={"black"}>
                        <HStack>
                            <FaUserNinja />
                            <Text>{isPlayerTomGamesData ? isPlayerTomGamesData.length : "0"}</Text>
                        </HStack>
                    </Badge>
                    <Badge ml={1} backgroundColor={"black"} color={"white"}>
                        <HStack>
                            <FaFutbol />
                            <Text>{isPlayerGoalsData ? isPlayerGoalsData.goals : "0"}</Text>
                        </HStack>
                    </Badge>
                </HStack>
            </VStack>
            <Tabs isFitted variant='enclosed' isLazy index={tabIndex} onChange={setTabIndex}>
                <TabList mb='1em'>
                    <Tab _selected={{color : "main.500"}}>나의 팀</Tab>
                    <Tab _selected={{color : "main.500"}}>나의 경기</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel p={"0"}>
                    {isPlayerTeamsData?.length !== 0 ?                          
                                                        <VStack alignItems={"flex-start"} px={3} spacing={3} mt={8}>
                                                            {isPlayerTeamsData?.map((team) => (
                                                                <Team 
                                                                    key={team.pk}
                                                                    pk={team.pk}
                                                                    avatar={team.avatar}
                                                                    name={team.name}
                                                                />
                                                            ))}
                                                        </VStack>
                                                        : 
                                                        <VStack py={3}>
                                                            <Text as="b">연결된 팀이 없습니다.</Text>
                                                            <Text as="b">상단 검색 버튼으로 나의 팀을 검색해보세요! </Text>
                                                        </VStack>}
                        <Empty />
                        <Empty />
                    </TabPanel>
                    <TabPanel p={"0"}>
                        <VStack alignItems={"flex-start"} px={3}>
                            <Text as="b" color={"main.500"} mt={10} fontSize={"md"}> 최근 경기 </Text>
                            {isPlayerGamesData ? (isPlayerGamesData[0] ? 
                                <Game 
                                    pk={isPlayerGamesData[0].pk} 
                                    date={isPlayerGamesData[0].date} 
                                    team={isPlayerGamesData[0].team} 
                                    vsteam={isPlayerGamesData[0].vsteam}
                                    team_score={isPlayerGamesData[0].team_score}
                                    vsteam_score={isPlayerGamesData[0].vsteam_score}
                                    /> 
                                    : <NullGame />) : <NullGame />}
                        </VStack>
                        <BigDivider />
                        <Link to={"/users/isplayer/games"}>
                            <VStack alignItems={"flex-start"} px={3} mt={8}>
                                <HStack width={"100%"} justifyContent={"space-between"}>
                                    <Text as="b" color={"main.500"} fontSize={"md"}> 경기 </Text>
                                    <FaArrowRight size={"10"}/>
                                </HStack>
                                <Divider />
                                <HStack width={"100%"} justifyContent={"space-between"}>
                                    <Text as="b" fontSize={"sm"}> TOTAL </Text>
                                    <Text as="b" fontSize={"sm"}> {isPlayerGamesData ? isPlayerGamesData.length : "0"} 경기 </Text>
                                </HStack>
                            </VStack>
                        </Link>
                        <SmallDivider />
                        <Link to={"/users/isplayer/votes"}>
                            <VStack alignItems={"flex-start"} px={3} mt={8}>
                                <HStack width={"100%"} justifyContent={"space-between"}>
                                    <Text as="b" color={"main.500"} fontSize={"md"}> 투표 </Text>
                                    <FaArrowRight size={"10"}/>
                                </HStack>
                                <Divider />
                                <HStack width={"100%"} justifyContent={"space-between"}>
                                    <Text as="b" fontSize={"sm"}> TOTAL </Text>
                                    <Text as="b" fontSize={"sm"}> {isPlayerTomGamesData ? isPlayerTomGamesData.length : "0"} 회 </Text>
                                </HStack>
                            </VStack>
                        </Link>
                        <SmallDivider />
                        <Link to={"/users/isplayer/goals"}>
                            <VStack alignItems={"flex-start"} px={3} mt={8}>
                                <HStack width={"100%"} justifyContent={"space-between"}>
                                    <Text as="b" color={"main.500"} fontSize={"md"}> 골 </Text>
                                    <FaArrowRight size={"10"}/>
                                </HStack>
                                <Divider />
                                <HStack width={"100%"} justifyContent={"space-between"}>
                                    <Text as="b" fontSize={"sm"}> TOTAL </Text>
                                    <Text as="b" fontSize={"sm"}> {isPlayerGoalsData ? isPlayerGoalsData.goals : "0"} 골 </Text>
                                </HStack>
                            </VStack>
                        </Link>
                        <Empty />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </ProtectedPage>
    )
}