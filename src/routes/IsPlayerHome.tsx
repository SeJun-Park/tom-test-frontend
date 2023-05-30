import { Heading, VStack, Text, Tabs, TabList, Tab, TabPanels, TabPanel, Divider, HStack, Box, Button, Badge, Image } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { Helmet } from "react-helmet"
import { FaArrowRight, FaFutbol, FaRunning, FaSearch, FaUser, FaUserFriends, FaUserNinja } from "react-icons/fa"
import { Link } from "react-router-dom"
import { isPlayer, isPlayerGames, isPlayerGoals, isPlayerTeams, isPlayerTomGames } from "../api"
import BigDivider from "../components/BigDivider"
import Empty from "../components/Empty"
import Game from "../components/Game"
import NullGame from "../components/NullGame"
import ProtectedPage from "../components/ProtectedPage"
import SmallDivider from "../components/SmallDivider"
import Team from "../components/Team"
import { IGoals, IPlayerUser, ITinyGame, ITinyTeam } from "../types"

export default function IsPlayerHome() {

    const { isLoading : playerLoading, data : playerData, isError : playerError } = useQuery<IPlayerUser>(["isPlayer"], isPlayer); 
    const { isLoading : playerTeamsLoading, data : playerTeamsData, isError : playerTeamsError } = useQuery<ITinyTeam[]>(["isPlayerTeams"], isPlayerTeams);
    const { isLoading : playerGamesLoading, data : playerGamesData, isError : playerGamesError } = useQuery<ITinyGame[]>(["isPlayerGames"], isPlayerGames);
    const { isLoading : playerTomGamesLoading, data : playerTomGamesData, isError : playerTomGamesError } = useQuery<ITinyGame[]>(["isPlayerTomGames"], isPlayerTomGames);
    const { isLoading : playerGoalsLoading, data : playerGoalsData, isError : playerGoalsError } = useQuery<IGoals>(["isPlayerGoals"], isPlayerGoals);

    return (
        <ProtectedPage>
            <Helmet>
                <title>{ playerData ? ("3OM | Home") : "Loading.." }</title>
            </Helmet>
            <VStack alignItems={"flex-start"} padding={"5"}>
                <VStack position="relative" width="100%" height="75" mt={0}>
                    <Link to={"/"}>
                        <Box position="absolute" top={0} left={0} right={0} bottom={0}>
                            <Box
                            backgroundImage="url(https://www.pixelstalk.net/wp-content/uploads/2016/06/Nike-3D-Background.jpg)"
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
                                <HStack>
                                    <Text fontSize="xs" color="white">
                                        sponsored
                                    </Text>
                                    <Box color={"white"}>
                                    </Box>
                                </HStack>
                            </Box>
                        </Box>
                    </Link>
                </VStack>
                <VStack position="relative" width="100%" height="75">
                    <Link to={"/"}>
                        <Box position="absolute" top={0} left={0} right={0} bottom={0}>
                            <Box
                            backgroundImage="url(https://cdn.shopify.com/s/files/1/0425/7621/articles/what-is-the-official-soccer-ball-for-the-2022-world-cup-481526.jpg?v=1654357624)"
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
                
                {/* <VStack position="relative" width="100%" height="75" mt={0}>
                    <Link to={"/"}>
                        <Box position="absolute" top={0} left={0} right={0} bottom={0}>
                            <Box
                            backgroundImage="url(https://lf19-cdn-tos.tiktokcdn-us.com/obj/i18nblog-tx/tt4b_cms/ko/tipdilz7wysq-2g3mbzPxQ6s9ryhwnHUxkB.jpeg)"
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
                                <HStack>
                                    <Text fontSize="xs" color="white">
                                        sponsored
                                    </Text>
                                    <Box color={"white"}>
                                    </Box>
                                </HStack>
                            </Box>
                        </Box>
                    </Link>
                </VStack> */}
            
                {/* <HStack width={"100%"} height={"100"} border={"0"} borderRadius={"lg"} justifyContent={"center"} my={10} backgroundColor={"main.500"}>
                    <Box>
                        <Text fontSize={"3xl"} as="b" color={"white"}> GO COMMUNITY &rarr; </Text>
                    </Box>
                </HStack> */}
                <Empty />
                <Text fontSize={"xl"} as="b"> {playerData?.username} </Text>
                <HStack>
                    <Badge ml={1} backgroundColor={"gray.100"} color={"black"}>
                        <HStack>
                            <FaUserFriends />
                            <Text>{playerTeamsData ? playerTeamsData.length : "0"}</Text>
                        </HStack>
                    </Badge>
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
                {/* <Text fontSize={"xl"} > {playerTeamsData ? playerTeamsData.length : "0"} TEAM {playerGamesData ? playerGamesData.length : "0"} GAMES </Text> */}
            </VStack>
            <Tabs isFitted variant='enclosed' isLazy>
                <TabList mb='1em'>
                    <Tab _selected={{color : "main.500"}}>My Team</Tab>
                    <Tab _selected={{color : "main.500"}}>My Game</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel p={"0"}>
                        <VStack alignItems={"flex-start"} px={3} spacing={3} mt={8}>
                            {playerTeamsData?.map((team) => (
                                <Team 
                                    key={team.pk}
                                    pk={team.pk}
                                    avatar={team.avatar}
                                    name={team.name}
                                />
                            ))}
                        </VStack>
                        <Empty />
                        <Empty />
                        <VStack px={3}>
                            <Link to={"teams/search"}>
                                <Button variant={"ghost"}>
                                    <HStack>
                                        <Box >
                                            <FaSearch />
                                        </Box>
                                        {/* <Text> search </Text> */}
                                    </HStack>
                                </Button>
                            </Link>
                            <Empty />
                            <Empty />
                        </VStack>
                    </TabPanel>
                    <TabPanel p={"0"}>
                        <VStack alignItems={"flex-start"} px={3}>
                            <Text as="b" color={"main.500"} mt={10} fontSize={"sm"}> LATEST </Text>
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
                        <Link to={"/users/isplayer/games"}>
                            <VStack alignItems={"flex-start"} px={3} mt={8}>
                                <HStack width={"100%"} justifyContent={"space-between"}>
                                    <Text as="b" color={"main.500"} fontSize={"sm"}> GAME </Text>
                                    <FaArrowRight size={"10"}/>
                                </HStack>
                                <Divider />
                                <HStack width={"100%"} justifyContent={"space-between"}>
                                    <Text as="b" fontSize={"sm"}> TOTAL </Text>
                                    <Text as="b" fontSize={"sm"}> {playerGamesData ? playerGamesData.length : "0"} GAMES </Text>
                                </HStack>
                            </VStack>
                        </Link>
                        <SmallDivider />
                        <Link to={"/users/isplayer/toms"}>
                            <VStack alignItems={"flex-start"} px={3} mt={8}>
                                <HStack width={"100%"} justifyContent={"space-between"}>
                                    <Text as="b" color={"main.500"} fontSize={"sm"}> 3OM </Text>
                                    <FaArrowRight size={"10"}/>
                                </HStack>
                                <Divider />
                                <HStack width={"100%"} justifyContent={"space-between"}>
                                    <Text as="b" fontSize={"sm"}> TOTAL </Text>
                                    <Text as="b" fontSize={"sm"}> {playerTomGamesData ? playerTomGamesData.length : "0"} TIMES </Text>
                                </HStack>
                            </VStack>
                        </Link>
                        <SmallDivider />
                        <Link to={"/users/isplayer/goals"}>
                            <VStack alignItems={"flex-start"} px={3} mt={8}>
                                <HStack width={"100%"} justifyContent={"space-between"}>
                                    <Text as="b" color={"main.500"} fontSize={"sm"}> GOAL </Text>
                                    <FaArrowRight size={"10"}/>
                                </HStack>
                                <Divider />
                                <HStack width={"100%"} justifyContent={"space-between"}>
                                    <Text as="b" fontSize={"sm"}> TOTAL </Text>
                                    <Text as="b" fontSize={"sm"}> {playerGoalsData ? playerGoalsData.goals : "0"} GOALS </Text>
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