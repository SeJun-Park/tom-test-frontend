import { Avatar, Badge, Box, Card, CardBody, Heading, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaRunning, FaUser, FaUserCog } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getTeamGames, getTeamPlayers, getTeamReadOnly } from "../api";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import KakaoADBig from "../components/KakaoADBig";
import KakaoADSmall from "../components/KakaoADSmall";
import NullGame from "../components/NullGame";
import SocialLogin from "../components/SocialLogin";
import { ITinyGame, ITinyPlayer, ITinyTeam } from "../types";

export default function IsNotLoggedInTeamHome() {

    const { teamPk } = useParams();

    const { isLoading : teamLoading, data : teamData, isError : teamError } = useQuery<ITinyTeam>(["teamReadOnly", teamPk], getTeamReadOnly);
    const { isLoading : teamGamesLoading, data : teamGamesData, isError : teamGamesError } = useQuery<ITinyGame[]>(["teamGames", teamPk], getTeamGames);
    const { isLoading : teamPlayersLoading, data : teamPlayersData, isError : teamPlayersError } = useQuery<ITinyPlayer[]>(["teamPlayers", teamPk], getTeamPlayers);

    
const [tabIndexThome, setTabIndexThome] = useState(Number(localStorage.getItem('tabIndexThome')) || 0);

useEffect(() => {
  localStorage.setItem('tabIndexThome', tabIndexThome.toString());
}, [tabIndexThome]);


const [tabIndexThomeSub, setTabIndexThomeSub] = useState(Number(localStorage.getItem('tabIndexThomeSub')) || 0);

useEffect(() => {
  localStorage.setItem('tabIndexThomeSub', tabIndexThomeSub.toString());
}, [tabIndexThomeSub]);

    return (
        <>
            <Helmet>
                <title>{ teamData ? (`삼오엠 | ${teamData.name} 홈`) : "Loading.." }</title>
            </Helmet>
            <HStack padding={"5"} justifyContent={"space-between"}>            
                <HStack>
                    <Text fontSize={"xl"} as="b"> {teamData?.name} </Text>
                </HStack>
            </HStack>
            <Tabs isFitted variant='enclosed' index={tabIndexThome} onChange={setTabIndexThome}>
            <TabList mb='1em' justifyContent={"center"}>
                <Tab _selected={{color : "main.500"}}> 팀 프로필 </Tab>
                <Tab _selected={{color : "main.500"}}> 팀 정보 </Tab>
            </TabList>
            <TabPanels>
                <TabPanel p={"0"}>
                    <VStack py={5}>
                        <HStack>
                            <VStack>
                                <Avatar src={teamData?.avatar} size={"2xl"} />
                            {/* <Avatar src={"https://prodigits.co.uk/thumbs/wallpapers/p2ls/drawings/26/5761411112242453.jpg"} size={"sm"} ml={-10} showBorder={true} /> */}
                            </VStack>
                            <VStack alignItems={"flex-end"}>
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
                            </VStack>
                        </HStack>
                    </VStack>
                    {teamData?.description && (
                        <VStack>
                            <Card my={4} width={"90%"} textAlign={"center"}>
                                <CardBody>
                                    <Text fontSize={"sm"}>{teamData.description}</Text>
                                </CardBody>
                            </Card>
                        </VStack>
                    )}
                    <VStack alignItems={"flex-start"} px={3}>
                        <Text as="b" color={"main.500"} mt={10} fontSize={"md"}> 최근 경기 </Text>
                        <NullGame />
                    </VStack>

                    <VStack>
                        <Box w="320px" h="100px" mt={3}>
                                <KakaoADBig />
                        </Box>
                    </VStack>

                    <BigDivider />

                    <Tabs isLazy align={"center"} variant='soft-rounded' index={tabIndexThomeSub} onChange={setTabIndexThomeSub}>
                        <TabList mb='1em'>
                            <Tab _selected={{color : "white", bg : "main.500"}}> 기록 </Tab>
                            <Tab _selected={{color : "white", bg : "main.500"}}> 알림 </Tab>
                            <Tab _selected={{color : "white", bg : "main.500"}}> 일정 </Tab>
                            <Tab _selected={{color : "white", bg : "main.500"}}> 피드 </Tab>
                            <Tab _selected={{color : "white", bg : "main.500"}}> 회비 </Tab>
                        </TabList>
                        <TabPanels>
                            {[0,1,2,3,4].map((index) =>
                            <TabPanel p={0}>
                                    <Empty />
                                <VStack p={5}>
                                    <HStack spacing={3}>
                                        <Heading as="b" size={"sm"} textAlign={"center"}>열람을 위해서 로그인이 필요합니다.</Heading>
                                    </HStack>
                                    <Empty />
                                    <SocialLogin />
                                    <HStack>
                                        <Box color={"main.500"}>
                                            <FaUserCog />
                                        </Box>
                                        <Text fontSize={"xs"}>운영진이라면 관리자로 로그인하세요!</Text>
                                    </HStack>
                                    <HStack>
                                        <Box color={"point.500"}>
                                            <FaRunning />
                                        </Box>
                                        <Text fontSize={"xs"}>일반 회원이라면 플레이어로 로그인하세요!</Text>
                                    </HStack>
                                </VStack>
                                <Empty />
                                <Empty />
                                <Empty />
                                <Empty />
                            </TabPanel>)}
                        </TabPanels>
                    </Tabs>
                    <Empty />
                </TabPanel>
                <TabPanel p={"0"}>
                    <VStack alignItems={"flex-start"} px={5} my={8}>
                        <Text>팀 관리자만 볼 수 있습니다.</Text>
                    </VStack>
                </TabPanel>
            </TabPanels>
        </Tabs>
                            <Empty />
        <Empty />
        <VStack>
            <Box w="320px" h="50px">
                    <KakaoADSmall />
            </Box>
        </VStack>
        <Empty />
        <Empty />
    </>

    )
}