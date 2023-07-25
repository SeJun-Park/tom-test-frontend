import { Avatar, Badge, Box, CircularProgress, CircularProgressLabel, Divider, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaArrowRight, FaRunning, FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { getTeam, getTeamGames, getTeamPlayers, getTeamPlayersConnected, getTeamTomGames, isSpvsr } from "../api";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import Game from "../components/Game";
import NullGame from "../components/NullGame";
import SmallDivider from "../components/SmallDivider";
import { ISpvsrUser, ITeam, ITinyGame, ITinyPlayer } from "../types";

export default function IsSpvsrTeamHome() {

    const { teamPk } = useParams();

    const { isLoading : spvsrLoading, data : spvsrData, isError : spvsrError } = useQuery<ISpvsrUser>(["isSpvsr"], isSpvsr); 
    const { isLoading : teamLoading, data : teamData, isError : teamError } = useQuery<ITeam>(["team", teamPk], getTeam);
    const { isLoading : teamPlayersConnectedLoading, data : teamPlayersConnectedData, isError : teamPlayersConnectedError } = useQuery<ITinyPlayer[]>(["teamConnectdPlayers", teamPk], getTeamPlayersConnected);
    const { isLoading : teamGamesLoading, data : teamGamesData, isError : teamGamesError } = useQuery<ITinyGame[]>(["teamGames", teamPk], getTeamGames);
    const { isLoading : teamTomGamesLoading, data : teamTomGamesData, isError : teamTomGamesError } = useQuery<ITinyGame[]>(["teamTomGames", teamPk], getTeamTomGames);
    const { isLoading : teamPlayersLoading, data : teamPlayersData, isError : teamPlayersError } = useQuery<ITinyPlayer[]>(["teamPlayers", teamPk], getTeamPlayers);

    return (
        <>
            <Helmet>
                <title>{ teamData ? (`3OM | ${teamData.name} Home`) : "Loading.." }</title>
            </Helmet>
            <HStack alignItems={"flex-start"} padding={"5"}>
                <Text fontSize={"xl"} as="b"> {teamData?.name} </Text>
                {spvsrData?.team.name === teamData?.name ? 
                                <Box justifyContent={"center"}>
                                    <Badge ml={1} bg={"point.500"} color={"black"}> myteam </Badge>
                                </Box> 
                                        : null}
            </HStack>
            <Tabs isFitted variant='enclosed'>
            <TabList mb='1em'>
                <Tab _selected={{color : "main.500"}}> 팀 프로필 </Tab>
            </TabList>
            <TabPanels>
                <TabPanel p={"0"}>
                    <VStack py={5}>
                        <Avatar src={teamData?.avatar} size={"2xl"} />
                    </VStack>
                    <HStack justifyContent={"center"}>
                        <Badge ml={1} backgroundColor={"gray.100"} color={"black"}>
                            <Text> since {teamData ? teamData.since : ""} </Text>
                        </Badge>
                        <Badge ml={1} backgroundColor={"black"} color={"white"}>
                            <HStack>
                                <FaUser />
                                <Text>{teamPlayersData ? teamPlayersData.length : "0"}</Text>
                            </HStack>
                        </Badge>
                        <Badge ml={1} backgroundColor={"main.500"} color={"white"}>
                            <HStack>
                                <FaRunning />
                                <Text>{teamGamesData ? teamGamesData.length : "0"}</Text>
                            </HStack>
                        </Badge>
                    </HStack>
                    <HStack justifyContent={"center"} mt={4}>
                        <Text fontSize={"xs"}> CNTD </Text>
                        <CircularProgress size={"65px"} thickness={"5px"} value={teamPlayersConnectedData && teamPlayersData && teamPlayersData && teamPlayersData.length !==0 ? Number(((teamPlayersConnectedData.length/teamPlayersData.length)*100).toFixed(1)) : 0} color='main.500'>
                                        <CircularProgressLabel fontSize={"xs"}>{teamPlayersConnectedData && teamPlayersData && teamPlayersData && teamPlayersData.length !==0 ? ((teamPlayersConnectedData.length/teamPlayersData.length)*100).toFixed(1) : "0"}%</CircularProgressLabel>
                        </CircularProgress>
                    </HStack>
                    <VStack alignItems={"flex-start"} px={3}>
                        <Text as="b" color={"main.500"} mt={10} fontSize={"md"}> 최근 경기 </Text>
                        {teamGamesData ? (teamGamesData[0] ? 
                            <Game 
                                pk={teamGamesData[0].pk} 
                                date={teamGamesData[0].date} 
                                team={teamGamesData[0].team} 
                                vsteam={teamGamesData[0].vsteam}
                                team_score={teamGamesData[0].team_score}
                                vsteam_score={teamGamesData[0].vsteam_score}
                                /> 
                                : <NullGame />) : <NullGame />}
                    </VStack>
                    <BigDivider />
                    <Link to={`/teams/${teamPk}/players`}>
                        <VStack alignItems={"flex-start"} px={3} mt={8}>
                            <HStack width={"100%"} justifyContent={"space-between"}>
                                <Text as="b" color={"main.500"} fontSize={"md"}> 선수 </Text>
                                <FaArrowRight size={"10"}/>
                            </HStack>
                            <Divider />
                            <HStack width={"100%"} justifyContent={"space-between"}>
                                <Text as="b" fontSize={"sm"}> TOTAL </Text>
                                <Text as="b" fontSize={"sm"}> {teamPlayersData ? teamPlayersData.length : "0"} 명 </Text>
                            </HStack>
                        </VStack>
                    </Link>
                    <SmallDivider />
                    <Link to={`/teams/${teamPk}/games`}>
                        <VStack alignItems={"flex-start"} px={3} mt={8}>
                            <HStack width={"100%"} justifyContent={"space-between"}>
                                <Text as="b" color={"main.500"} fontSize={"md"}> 경기 </Text>
                                <FaArrowRight size={"10"}/>
                            </HStack>
                            <Divider />
                            <HStack width={"100%"} justifyContent={"space-between"}>
                                <Text as="b" fontSize={"sm"}> TOTAL </Text>
                                <Text as="b" fontSize={"sm"}> {teamGamesData ? teamGamesData.length : "0"} 경기 </Text>
                            </HStack>
                        </VStack>
                    </Link>
                    <SmallDivider />
                    <Link to={`/teams/${teamPk}/votes`}>
                        <VStack alignItems={"flex-start"} px={3} mt={8}>
                            <HStack width={"100%"} justifyContent={"space-between"}>
                                <Text as="b" color={"main.500"} fontSize={"md"}> 투표 </Text>
                                <FaArrowRight size={"10"}/>
                            </HStack>
                            <Divider />
                            <HStack width={"100%"} justifyContent={"space-between"}>
                                <Text as="b" fontSize={"sm"}> TOTAL </Text>
                                <Text as="b" fontSize={"sm"}> {teamTomGamesData ? teamTomGamesData.length : "0"} 회 </Text>
                            </HStack>
                        </VStack>
                    </Link>
                    <Empty />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </>

    )
}