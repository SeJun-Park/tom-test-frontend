import { Avatar, Badge, Box, Card, CardBody, CardHeader, Divider, Flex, Heading, HStack, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaArrowRight, FaReceipt, FaRunning, FaTasks, FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { getTeam, getTeamFeeds, getTeamGames, getTeamNotisByMonth, getTeamNotisMonth, getTeamPlayers, getTeamPlayersConnected, getTeamPlayersConnecting, getTeamSchedulesByMonth, getTeamSchedulesMonth, getTeamTomGames } from "../api";
import BigDivider from "../components/BigDivider";
import Capture from "../components/Capture";
import Empty from "../components/Empty";
import Feed from "../components/Feed";
import Game from "../components/Game";
import KakaoADBig from "../components/KakaoADBig";
import KakaoADSmall from "../components/KakaoADSmall";
import Noti from "../components/Noti";
import NullGame from "../components/NullGame";
import Schedule from "../components/Schedule";
import SmallDivider from "../components/SmallDivider";
import { IFeed, INoti, ISchedule, ISpvsrUser, ITeam, ITinyGame, ITinyPlayer } from "../types";
import IsPlayerTeamHomePlayerIsConnected from "./IsPlayerTeamHomePlayerIsConnected";
import IsPlayerTeamHomePlayerIsConnecting from "./IsPlayerTeamHomePlayerIsConnecting";
import IsPlayerTeamHomePlayerIsNotConnected from "./IsPlayerTeamHomePlayerIsNotConnected";

export default function IsPlayerTeamHome() {

    const { teamPk } = useParams();

    const { isLoading : teamLoading, data : teamData, isError : teamError } = useQuery<ITeam>(["team", teamPk], getTeam);
    const { isLoading : teamPlayersConnectedLoading, data : teamPlayersConnectedData, isError : teamPlayersConnectedError } = useQuery<ITinyPlayer[]>(["teamConnectedPlayers", teamPk], getTeamPlayersConnected);
    const { isLoading : teamPlayersConnectingLoading, data : teamPlayersConnectingData, isError : teamPlayersConnectingError } = useQuery<ITinyPlayer[]>(["teamConnectingPlayers", teamPk], getTeamPlayersConnecting);
    const { isLoading : teamGamesLoading, data : teamGamesData, isError : teamGamesError } = useQuery<ITinyGame[]>(["teamGames", teamPk], getTeamGames);
    const { isLoading : teamTomGamesLoading, data : teamTomGamesData, isError : teamTomGamesError } = useQuery<ITinyGame[]>(["teamTomGames", teamPk], getTeamTomGames);
    const { isLoading : teamPlayersLoading, data : teamPlayersData, isError : teamPlayersError } = useQuery<ITinyPlayer[]>(["teamPlayers", teamPk], getTeamPlayers);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const currentYearMonth = `${new Date().getFullYear()}년 ${(new Date().getMonth() + 1).toString().padStart(2, '0')}월`

    const { isLoading : teamNotisMonthLoading, data : teamNotisMonthData, isError : teamNotisMonthError } = useQuery<string[]>(["teamNotisMonth", teamPk], getTeamNotisMonth, {
        onSuccess: (data) => {
            if (!data.includes(currentYearMonth)) {
                setTeamNotisMonth([currentYearMonth, ...data]);
            } else {
                // 기존 data 배열에서 currentYearMonth를 제거
                const filteredData = data.filter(item => item !== currentYearMonth);
                // currentYearMonth를 맨 앞에 추가
                setTeamNotisMonth([currentYearMonth, ...filteredData]);
            }
        }
    });
    const { isLoading : teamSchedulesMonthLoading, data : teamSchedulesMonthData, isError : teamSchedulesMonthError } = useQuery<string[]>(["teamSchedulesMonth", teamPk], getTeamSchedulesMonth, {
        onSuccess: (data) => {
            if (!data.includes(currentYearMonth)) {
                setTeamSchedulesMonth([currentYearMonth, ...data]);
            } else {
                // 기존 data 배열에서 currentYearMonth를 제거
                const filteredData = data.filter(item => item !== currentYearMonth);
                // currentYearMonth를 맨 앞에 추가
                setTeamSchedulesMonth([currentYearMonth, ...filteredData]);
            }
        }
    });
    const { isLoading : teamFeedsLoading, data : teamFeedsData, isError : teamFeedsError } = useQuery<IFeed[]>(["teamFeeds", teamPk], getTeamFeeds);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [ teamNotisMonth, setTeamNotisMonth ] = useState<string[]>();
    const [ teamSchedulesMonth, setTeamSchedulesMonth ] = useState<string[]>();

    const [ selectedNotisDate, setSelectedNotisDate ] = useState<string>();
    const [ selectedSchedulesDate, setSelectedSchedulesDate ] = useState<string>();

    const [ teamNotisByMonth, setTeamNotisByMonth ] = useState<INoti[]>();
    const [ teamSchedulesByMonth, setTeamSchedulesByMonth ] = useState<ISchedule[]>();

    const teamNotisByMonthMutation = useMutation(getTeamNotisByMonth, 
        {
            onSuccess : (data) => {
                setTeamNotisByMonth(data)
            },
        }
    )

    useEffect(() => {

        setSelectedNotisDate(currentYearMonth)
        setSelectedSchedulesDate(currentYearMonth)

        const [ year, month ] = currentYearMonth.split('년 ').map((part, index) => index === 1 ? part.slice(0, -1) : part);
        if (teamPk) {
            teamNotisByMonthMutation.mutate({teamPk, year, month});
            teamSchedulesByMonthMutation.mutate({teamPk, year, month});
        }
    }, []);

    const handleChangeNotisDate = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedNotisDate(event.target.value);
        const [ year, month ] = event.target.value.split('년 ').map((part, index) => index === 1 ? part.slice(0, -1) : part);
        if(teamPk) {
            teamNotisByMonthMutation.mutate({teamPk, year, month})
        }
      };

    const teamSchedulesByMonthMutation = useMutation(getTeamSchedulesByMonth, 
        {
            onSuccess : (data) => {
                setTeamSchedulesByMonth(data)
            },
        }
    )

    const handleChangeSchedulesDate = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSchedulesDate(event.target.value);
        const [ year, month ] = event.target.value.split('년 ').map((part, index) => index === 1 ? part.slice(0, -1) : part);
        if(teamPk) {
            teamSchedulesByMonthMutation.mutate({teamPk, year, month})
        }
      };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
                <title>{ teamData ? (`3OM | ${teamData.name} Home`) : "Loading.." }</title>
            </Helmet>
            <HStack alignItems={"flex-start"} padding={"5"}>
                <Text fontSize={"xl"} as="b"> {teamData?.name} </Text>
                {teamData?.is_connected ? 
                                <Box justifyContent={"center"}>
                                    <Badge ml={1} bg={"point.500"} color={"black"}> 나의 팀 </Badge>
                                </Box> 
                                        : null}
            </HStack>
            <Tabs isFitted variant='enclosed' index={tabIndexThome} onChange={setTabIndexThome}>
            <TabList mb='1em' justifyContent={"center"}>
                <Tab _selected={{color : "main.500"}}> 팀 프로필 </Tab>
                <Tab _selected={{color : "main.500"}}> 나와 연결된 선수 </Tab>
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
                            <TabPanel p={"0"}>
                                <Link to={`/teams/${teamPk}/players`}>
                                    <VStack alignItems={"flex-start"} px={3} mt={8}>
                                        <HStack width={"100%"} justifyContent={"space-between"}>
                                            <HStack>
                                                <Text as="b" color={"main.500"} fontSize={"md"}> 선수 </Text>
                                            </HStack>
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
                            <TabPanel p={"0"}>
                                <Select mb={5} onChange={handleChangeNotisDate} value={selectedNotisDate}>
                                    {teamNotisMonth?.map((yearMonth) => <option key={yearMonth} value={yearMonth}>{yearMonth}</option>)}
                                </Select>
                                <VStack spacing={5}>
                                    {teamNotisByMonth && teamNotisByMonth.length !== 0 ? teamNotisByMonth.map((noti, index) => {
                                                                                            if (new Date(noti.dateTime) > new Date()) {
                                                                                                // noti.dateTime이 현재 시간보다 더 늦은 경우는 렌더링하지 않습니다.
                                                                                                return <Text padding={5} key={index}>예정된 알림이 있습니다.</Text>;
                                                                                              }

                                                                                            return (
                                                                                                    <Noti 
                                                                                                    key={index}
                                                                                                    name={noti.name}
                                                                                                    description={noti.description}
                                                                                                    dateTime={noti.dateTime}
                                                                                                    title={noti.title}
                                                                                                    category={noti.category}
                                                                                                    payload={noti.payload}
                                                                                                    plan={teamData ? teamData?.plan : ""}
                                                                                                    isspvsr={false}
                                                                                                    />
                                                                                                    )
                                                                                                })
                                                                                            
                                                                                                : <Text padding={5}>등록된 알림이 없습니다.</Text>}
                                </VStack>
                                <Empty />
                            </TabPanel>
                            <TabPanel p={"0"}>
                                <Select mb={5} onChange={handleChangeSchedulesDate} value={selectedSchedulesDate}>
                                    {teamSchedulesMonth?.map((yearMonth) => <option key={yearMonth} value={yearMonth}>{yearMonth}</option>)}
                                </Select>
                                <VStack alignItems={"flex-start"} px={3} spacing={4} mb={5}>
                                    <Divider />
                                    <HStack>
                                        <Text as="b" color={"black"} fontSize={"sm"} > {teamData?.name} </Text>
                                        <Text as="b" color={"main.500"} fontSize={"sm"} > | {selectedSchedulesDate} 일정 </Text>
                                    </HStack>
                                    <Divider />
                                </VStack>
                                <VStack spacing={5}>
                                    {teamData && teamSchedulesByMonth && teamSchedulesByMonth.length !== 0 ? teamSchedulesByMonth.map((schedule, index) => 
                                                                                                <Schedule
                                                                                                key={index}
                                                                                                pk={schedule.id}
                                                                                                avatar={teamData?.avatar}
                                                                                                dateTime={schedule.dateTime}
                                                                                                category={schedule.category}
                                                                                                title={schedule.title}
                                                                                                isspvsr={false}
                                                                                                />)
                                                                                                   : <Text padding={5}>등록된 일정이 없습니다.</Text>}
                                </VStack>
                                <Empty />
                                <Capture />
                            </TabPanel>
                            <TabPanel p={"0"}>
                            <VStack spacing={5}>
                                {teamData && teamFeedsData && teamFeedsData.length !== 0 ? teamFeedsData.map((feed, index) => 
                                                                                        <Feed 
                                                                                        key={index}
                                                                                        pk={feed.id}
                                                                                        avatar={teamData.avatar}
                                                                                        name={teamData.name}
                                                                                        created_at={feed.created_at}
                                                                                        title={feed.title}
                                                                                        payload={feed.payload}
                                                                                        photos={feed.photos}
                                                                                        isspvsr={false}
                                                                                        />
                                                                                    ) 
                                                                                : <Text padding={5}>새로운 소식이 없습니다.</Text>}
                                </VStack>
                                <Empty />
                            </TabPanel>
                            <TabPanel p={"0"}>
                                <VStack spacing={2} mt={8}>
                                    <Link to={`/teams/${teamPk}/dues/payment`}>
                                        <Card maxW='xs' minW='xs'>
                                            <CardHeader>
                                                <Flex gap="4" alignItems='center'>
                                                    <Box color={"main.500"}>
                                                        <FaTasks />
                                                    </Box>
                                                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                                        <Box>
                                                        <VStack alignItems={"flex-start"}>
                                                            <Heading size='sm'>회비 납부 현황</Heading>
                                                        </VStack>
                                                        </Box>
                                                    </Flex>
                                                    <FaArrowRight size={"10"}/>
                                                </Flex>
                                            </CardHeader>
                                        </Card>
                                    </Link>
                                    <Link to={`/teams/${teamPk}/dues/details`}>
                                        <Card maxW='xs' minW='xs'>
                                            <CardHeader>
                                                <Flex gap="4" alignItems='center'>
                                                    <Box color={"point.500"}>
                                                        <FaReceipt />
                                                    </Box>
                                                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                                        <Box>
                                                        <VStack alignItems={"flex-start"}>
                                                            <Heading size='sm'>회비 사용 내역</Heading>
                                                        </VStack>
                                                        </Box>
                                                    </Flex>
                                                    <FaArrowRight size={"10"}/>
                                                </Flex>
                                            </CardHeader>
                                        </Card>
                                    </Link>
                                </VStack>
                                <Empty />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    <Empty />
                </TabPanel>
                <TabPanel p={"0"}>
                    {teamPk ? 
                            (teamData?.is_connected ? 
                                <IsPlayerTeamHomePlayerIsConnected playerPk={teamData.is_connected_player_pk.toString()} />
                                    : (teamData?.is_connecting ? 
                                        <IsPlayerTeamHomePlayerIsConnecting playerPk={teamData.is_connecting_player_pk.toString()} /> 
                                                : <IsPlayerTeamHomePlayerIsNotConnected teamPk={teamPk} />
                                    )
                            ) : null}
                </TabPanel>
            </TabPanels>
        </Tabs>
        <Empty />
        <VStack>
            <Box w="320px" h="50px" >
                    <KakaoADSmall />
            </Box>
        </VStack>
        <Empty />
        <Empty />
    </>

    )
}