import { VStack, Text, Tabs, TabList, Tab, TabPanels, TabPanel, Divider, HStack, Box, Badge, Image, Card, CardHeader, Flex, Heading, Avatar } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { FaArrowRight, FaFutbol, FaRunning, FaUserFriends, FaUserNinja } from "react-icons/fa"
import { Link } from "react-router-dom"
import { getTeamsRecently, isPlayer, isPlayerGames, isPlayerGoals, isPlayerTeams, isPlayerTomGames } from "../api"
import BigDivider from "../components/BigDivider"
import Empty from "../components/Empty"
import Game from "../components/Game"
import KakaoADBig from "../components/KakaoADBig"
import NullGame from "../components/NullGame"
import SmallDivider from "../components/SmallDivider"
import Team from "../components/Team"
import { IGoals, IPlayerUser, ITeam, ITinyGame, ITinyTeam } from "../types"

export default function IsPlayerHome() {

    const { isLoading : teamsRecentlyLoading, data : teamsRecentlyData, isError : teamsRecentlyError } = useQuery<ITinyTeam[]>(["teamsRecently"], getTeamsRecently);
    const { isLoading : isPlayerLoading, data : isPlayerData, isError : isPlayerError } = useQuery<IPlayerUser>(["isPlayer"], isPlayer); 
    const { isLoading : isPlayerTeamsLoading, data : isPlayerTeamsData, isError : isPlayerTeamsError } = useQuery<ITinyTeam[]>(["isPlayerTeams"], isPlayerTeams);
    const { isLoading : isPlayerGamesLoading, data : isPlayerGamesData, isError : isPlayerGamesError } = useQuery<ITinyGame[]>(["isPlayerGames"], isPlayerGames);
    const { isLoading : isPlayerTomGamesLoading, data : isPlayerTomGamesData, isError : isPlayerTomGamesError } = useQuery<ITinyGame[]>(["isPlayerTomGames"], isPlayerTomGames);
    const { isLoading : isPlayerGoalsLoading, data : isPlayerGoalsData, isError : isPlayerGoalsError } = useQuery<IGoals>(["isPlayerGoals"], isPlayerGoals);

    const [tabIndexHome, setTabIndexHome] = useState(Number(localStorage.getItem('tabIndexHome')) || 0);

    useEffect(() => {
      localStorage.setItem('tabIndexHome', tabIndexHome.toString());
    }, [tabIndexHome]);

    const [tabIndexHomeSub, setTabIndexHomeSub] = useState(Number(localStorage.getItem('tabIndexHomeSub')) || 0);

    useEffect(() => {
      localStorage.setItem('tabIndexHomeSub', tabIndexHomeSub.toString());
    }, [tabIndexHomeSub]);

    return (
        <>
            <Helmet>
                <title>삼오엠 | 홈</title>
            </Helmet>              
            <Tabs variant='soft-rounded' isLazy align="center" index={tabIndexHome} onChange={setTabIndexHome}>
                <TabList mb='1em'>
                    <Tab _selected={{color : "white", bgColor : "main.500"}}>홈</Tab>
                    <Tab _selected={{color : "white", bgColor : "main.500"}}>나</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel px={"5"}>
                        <VStack>
                            <VStack position="relative" width="100%" height="200">
                                <Link to={"/introduce"}>
                                    <Box position="absolute" top={0} left={0} right={0} bottom={0}>
                                        <Box
                                        backgroundImage="url(https://imagedelivery.net/SbAhiipQhJYzfniSqnZDWw/55da74ce-715c-4795-5746-c27ace4b5b00/public)"
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
                                                    삼오엠을 소개합니다
                                                </Text>
                                                <Box color={"white"}>
                                                    <FaArrowRight />
                                                </Box>
                                            </HStack>
                                        </Box>
                                    </Box>
                                </Link>
                            </VStack>
                            <VStack position="relative" width="100%" height="150">
                                <Link to={"/teams/search"}>
                                    <Box position="absolute" top={0} left={0} right={0} bottom={0}>
                                        <Box
                                        backgroundImage="url(https://imagedelivery.net/SbAhiipQhJYzfniSqnZDWw/38cd1e75-ab8a-4319-18b6-cc160a5d2100/public)"
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
                                                    팀 검색하기
                                                </Text>
                                                <Box color={"white"}>
                                                    <FaArrowRight />
                                                </Box>
                                            </HStack>
                                        </Box>
                                    </Box>
                                </Link>
                            </VStack>
                        </VStack>
                        <Empty />
                        <VStack mt={2}>
                            <Box w="320px" h="100px">
                                    <KakaoADBig />
                            </Box>
                        </VStack>
                        <Empty />
                    </TabPanel>
                    <TabPanel p={0}>
                        <VStack my={10} spacing={3}>
                            <HStack spacing={3}>
                                <Avatar src={isPlayerData?.avatar}></Avatar>
                                <VStack spacing={0}>
                                    <Text fontSize={"lg"} as="b"> {isPlayerData?.username} </Text>
                                    <Text fontSize={"sm"} as="b" color={"main.500"}> 플레이어 </Text>
                                </VStack>
                            </HStack>
                        </VStack>
                        <HStack justifyContent={"center"} mb={5}>
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
                        <Tabs isFitted variant='enclosed' isLazy index={tabIndexHomeSub} onChange={setTabIndexHomeSub}>
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
                                                                        <Card maxW='xs' minW='xs'>
                                                                            <CardHeader>
                                                                                <Flex gap="4" alignItems='center'>
                                                                                    {/* <Box color={"point.500"}>
                                                                                        <FaReceipt />
                                                                                    </Box> */}
                                                                                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                                                                        <Box>
                                                                                        <VStack>
                                                                                            {/* <Heading size='sm'>{props.title}</Heading> */}
                                                                                            <Text as="b">연결된 팀이 없습니다.</Text>
                                                                                            <Text as="b">상단 검색 버튼으로 나의 팀을 검색하고, </Text>
                                                                                            <Text as="b">나의 플레이어와 연결하세요!</Text>
                                                                                        </VStack>
                                                                                        </Box>
                                                                                    </Flex>
                                                                                </Flex>
                                                                            </CardHeader>
                                                                        </Card>
                                                                    </VStack>}
                                    <Empty />
                                    <Empty />
                                    <Empty />
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
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )

}