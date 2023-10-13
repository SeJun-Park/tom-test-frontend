import { Avatar, Badge, Box, Button, Card, CardBody, CardHeader, Divider, Flex, Heading, HStack, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaArrowRight, FaCamera, FaMinusCircle, FaReceipt, FaRunning, FaTasks, FaTrashAlt, FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getTeam, getTeamConnectingSpvsrs, getTeamFeeds, getTeamGames, getTeamNotisByMonth, getTeamNotisMonth, getTeamPlayers, getTeamPlayersConnected, getTeamPlayersConnecting, getTeamSchedulesByMonth, getTeamSchedulesMonth, getTeamSpvsrs, getTeamTomGames, isSpvsr } from "../api";
import { teamScheduleShareImageState } from "../atoms";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import Feed from "../components/Feed";
import FeedAddModal from "../components/FeedAddModal";
import Game from "../components/Game";
import KakaoADBig from "../components/KakaoADBig";
import KakaoADSmall from "../components/KakaoADSmall";
import KakaoShare from "../components/KakaoShare";
import Noti from "../components/Noti";
import NullGame from "../components/NullGame";
import Schedule from "../components/Schedule";
import ScheduleAddModal from "../components/ScheduleAddModal";
import SmallDivider from "../components/SmallDivider";
import TeamDeleteModal from "../components/TeamDeleteModal";
import TeamPhotoDeleteModal from "../components/TeamPhotoDeleteModal";
import TeamPhotoUploadModal from "../components/TeamPhotoUploadModal";
import TeamSpvsrsConnectCancelByFounderModal from "../components/TeamSpvsrsConnectCancelByFounderModal";
import TeamSpvsrsConnectCancelByOneselfModal from "../components/TeamSpvsrsConnectCancelByOneselfModal";
import TeamSpvsrsConnectingCancelByFounderModal from "../components/TeamSpvsrsConnectingCancelByFounderModal";
import TeamSpvsrsConnectingCancelByOneselfModal from "../components/TeamSpvsrsConnectingCancelByOneselfModal";
import TeamSpvsrsConnectingModal from "../components/TeamSpvsrsConnectingModal";
import TeamSpvsrsConnectModal from "../components/TeamSpvsrsConnectModal";
import TeamUpdateModal from "../components/TeamUpdateModal";
import { IFeed, INoti, ISchedule, ISpvsrUser, ITeam, ITinyGame, ITinyPlayer } from "../types";

export default function IsSpvsrTeamHome() {

    const { teamPk } = useParams();

    const { isLoading : teamLoading, data : teamData, isError : teamError } = useQuery<ITeam>(["team", teamPk], getTeam);
    const { isLoading : teamSpvsrsLoading, data : teamSpvsrsData, isError : teamSpvsrsError } = useQuery<ISpvsrUser[]>(["teamSpvsrs", teamPk], getTeamSpvsrs);
    const { isLoading : teamConnectingSpvsrsLoading, data : teamConnectingSpvsrsData, isError : teamConnectingSpvsrsError } = useQuery<ISpvsrUser[]>(["teamConnectingSpvsrs", teamPk], getTeamConnectingSpvsrs);
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

    const [tabIndexThomeSub, setTabIndexThomeSub] = useState(Number(localStorage.getItem('tabIndexThomeSub')) || 0);

    useEffect(() => {
      localStorage.setItem('tabIndexThomeSub', tabIndexThomeSub.toString());
    }, [tabIndexThomeSub]);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const { isOpen : isScheduleOpen, onOpen : onScheduleOpen, onClose : onScheduleClose } = useDisclosure()
const { isOpen : isFeedOpen, onOpen : onFeedOpen, onClose : onFeedClose } = useDisclosure()

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const shareImage = useRecoilValue(teamScheduleShareImageState);

    
const [tabIndexThome, setTabIndexThome] = useState(Number(localStorage.getItem('tabIndexThome')) || 0);

useEffect(() => {
  localStorage.setItem('tabIndexThome', tabIndexThome.toString());
}, [tabIndexThome]);

const { isOpen : isOpen, onOpen : onOpen, onClose : onClose } = useDisclosure()
const { isOpen : isPhotoOpen, onOpen : onPhotoOpen, onClose : onPhotoClose } = useDisclosure()
const { isOpen : isPhotoDeleteOpen, onOpen : onPhotoDeleteOpen, onClose : onPhotoDeleteClose } = useDisclosure()
const { isOpen : isDeleteOpen, onOpen : onDeleteOpen, onClose : onDeleteClose } = useDisclosure()

const { isOpen : isTeamSpvsrsConnectingOpen, onOpen : onTeamSpvsrsConnectingOpen, onClose : onTeamSpvsrsConnectingClose } = useDisclosure()
const { isOpen : isTeamSpvsrsConnectingCancelByOneselfOpen, onOpen : onTeamSpvsrsConnectingCancelByOneselfOpen, onClose : onTeamSpvsrsConnectingCancelByOneselfClose } = useDisclosure()
const { isOpen : isTeamSpvsrsConnectingCancelByFounderOpen, onOpen : onTeamSpvsrsConnectingCancelByFounderOpen, onClose : onTeamSpvsrsConnectingCancelByFounderClose } = useDisclosure()
const { isOpen : isTeamSpvsrsConnectOpen, onOpen : onTeamSpvsrsConnectOpen, onClose : onTeamSpvsrsConnectClose } = useDisclosure()
const { isOpen : isTeamSpvsrsConnectCancelByFounderOpen, onOpen : onTeamSpvsrsConnectCancelByFounderOpen, onClose : onTeamSpvsrsConnectCancelByFounderClose } = useDisclosure()
const { isOpen : isTeamSpvsrsConnectCancelByOneselfOpen, onOpen : onTeamSpvsrsConnectCancelByOneselfOpen, onClose : onTeamSpvsrsConnectCancelByOneselfClose } = useDisclosure()

const [selectedUserName, setSelectedUserName] = useState<string>("");
const [selectedUserId, setSelectedUserId] = useState<number>(0);


const onMinusBtnClick = (username: string, userId: number) => {
    setSelectedUserName(username);
    setSelectedUserId(userId);
    // 기존 모달을 열기 위한 로직...
    onTeamSpvsrsConnectCancelByFounderOpen();
};

const [selectedRUserName, setSelectedRUserName] = useState<string>("");
const [selectedRUserId, setSelectedRUserId] = useState<number>(0);


const onAllowBtnClick = (username: string, userId: number) => {
    setSelectedRUserName(username);
    setSelectedRUserId(userId);
    // 기존 모달을 열기 위한 로직...
    onTeamSpvsrsConnectOpen();
};

const onDenyBtnClick = (username: string, userId: number) => {
    setSelectedRUserName(username);
    setSelectedRUserId(userId);
    // 기존 모달을 열기 위한 로직...
    onTeamSpvsrsConnectingCancelByFounderOpen();
};

    return (
        <>
            <Helmet>
                <title>{ teamData ? (`삼오엠 | ${teamData.name} 홈`) : "Loading.." }</title>
            </Helmet>
            <HStack padding={"5"} justifyContent={"space-between"}>            
                <HStack>
                    <Text fontSize={"xl"} as="b"> {teamData?.name} </Text>
                    {teamData?.is_spvsr && 
                                    <Box justifyContent={"center"}>
                                        <Badge ml={1} bg={"point.500"} color={"black"}> 나의 팀 </Badge>
                                    </Box>}
                    {teamData?.is_founder && 
                                    <Box justifyContent={"center"}>
                                        <Badge bg={"main.500"} color={"white"}> 최고 관리자 </Badge>
                                    </Box>}
                </HStack>
                {!teamData?.is_spvsr ? !teamData?.is_connecting_spvsr ?
                                        <>
                                            <Button onClick={onTeamSpvsrsConnectingOpen} backgroundColor={"main.500"} color={"white"} size={"xs"}> + 관리자 신청하기 </Button>
                                            <TeamSpvsrsConnectingModal isOpen={isTeamSpvsrsConnectingOpen} onClose={onTeamSpvsrsConnectingClose} teamName={teamData ? teamData.name : ""} />
                                        </>
                                        :
                                        <>
                                            <Button onClick={onTeamSpvsrsConnectingCancelByOneselfOpen} backgroundColor={"main.500"} color={"white"} size={"xs"}> - 관리자 신청 취소 </Button>
                                            <TeamSpvsrsConnectingCancelByOneselfModal isOpen={isTeamSpvsrsConnectingCancelByOneselfOpen} onClose={onTeamSpvsrsConnectingCancelByOneselfClose} teamName={teamData ? teamData.name : ""} />
                                        </>
                                        :
                                        null
                                        } 
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
                                                {teamPlayersConnectingData && teamPlayersConnectingData?.length !== 0 ?                             
                                                                                <Box justifyContent={"center"}>
                                                                                    <Badge ml={1} bg={"point.500"} color={"black"}> {teamPlayersConnectingData.length} </Badge>
                                                                                </Box>
                                                                            : null}
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
                                                                                                    isspvsr={teamData ? teamData.is_spvsr : false}
                                                                                                    />
                                                                                                    )
                                                                                                })
                                                                                            
                                                                                                : <Text padding={5}>등록된 알림이 없습니다.</Text>}
                                </VStack>
                                <Empty />
                            </TabPanel>
                            <TabPanel p={"0"}>
                                <VStack alignItems={"flex-end"} px={5} pb={5}>
                                    <Box>
                                        {teamData?.is_spvsr ? 
                                                                                <Button onClick={onScheduleOpen} backgroundColor={"point.500"} color={"black"} size={"xs"}> + 일정 추가하기 </Button>
                                                                                // onClick={onOpen} 
                                                                                    : null}
                                        
                                    </Box>
                                </VStack>
                                <Select mb={5} onChange={handleChangeSchedulesDate} value={selectedSchedulesDate}>
                                    {teamSchedulesMonth?.map((yearMonth) => <option key={yearMonth} value={yearMonth}>{yearMonth}</option>)}
                                </Select>
                                {/* <Box id="captureTarget"> */}
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
                                                                                                isspvsr={teamData ? teamData.is_spvsr : false}
                                                                                                />)
                                                                                                   : <Text padding={5}>등록된 일정이 없습니다.</Text>}
                                </VStack>
                                {teamPk && <ScheduleAddModal isOpen={isScheduleOpen} onClose={onScheduleClose} teamPk={teamPk} />}
                                <Empty />
                                {/* </Box> */}
                                <KakaoShare 
                                    title={`${teamData?.name} 일정`}
                                    description={`우리 팀 일정을 확인해보세요!`}
                                    imageUrl={shareImage}
                                    mobileWebUrl={`https://www.3manofthematch.com/teams/${teamPk}/schedules/readonly`}
                                    webUrl={`https://www.3manofthematch.com/teams/${teamPk}/schedules/readonly`}
                                    btnTitle={"보러 가기"}
                                />
                            </TabPanel>
                            <TabPanel p={"0"}>
                            {/* <Select mb={5}>
                                <option>전체</option>
                                {teamFeedsMonthData?.map((yearMonth) => <option key={yearMonth} value={yearMonth}>{yearMonth}</option>)}
                            </Select> */}
                            <VStack alignItems={"flex-end"} px={5} pb={5}>
                                    {teamData?.is_spvsr ? 
                                                                        <>
                                                                            <Button onClick={onFeedOpen} backgroundColor={"point.500"} color={"black"} size={"xs"}> + 피드 추가하기 </Button>
                                                                            <FeedAddModal isOpen={isFeedOpen} onClose={onFeedClose} />
                                                                        </>
                                                                            // onClick={onOpen} 
                                                                                : null}
                            </VStack>
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
                                                                                        isspvsr={teamData ? teamData.is_spvsr : false}
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
                {teamData?.is_spvsr ? 
                                            <TabPanel p={"0"}>
                                                <VStack spacing={5}>
                                                    <Text fontSize={"xl"} as="b" mt={3}> {teamData?.name} </Text>
                                                    <HStack>
                                                        <Avatar src={teamData ? teamData.avatar : ""} size={"2xl"} />
                                                        { teamData && 
                                                                            teamData.avatar ?
                                                                                                    <VStack justifyContent={"center"}>
                                                                                                        <Button onClick={onPhotoOpen} variant={"outline"} color={"gray"} size={"sm"}>
                                                                                                            <FaCamera size="15px" />
                                                                                                        </Button>
                                                                                                        <Button onClick={onPhotoDeleteOpen} variant={"outline"} color={"gray"} size={"sm"}>
                                                                                                            <FaTrashAlt size="15px" />
                                                                                                        </Button>
                                                                                                        <TeamPhotoUploadModal isOpen={isPhotoOpen} onClose={onPhotoClose} />
                                                                                                        <TeamPhotoDeleteModal isOpen={isPhotoDeleteOpen} onClose={onPhotoDeleteClose} />
                                                                                                    </VStack>  :
                                                                                                    <HStack justifyContent={"center"}>
                                                                                                        <Button onClick={onPhotoOpen} variant={"outline"} color={"gray"}>
                                                                                                            <FaCamera size="20px" />
                                                                                                        </Button>
                                                                                                        <TeamPhotoUploadModal isOpen={isPhotoOpen} onClose={onPhotoClose} />
                                                                                                    </HStack>
                                                                                                    }
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
                                                {/* <BigDivider /> */}
                                                <VStack alignItems={"flex-start"} px={3}>
                                                    <Text as="b" color={"main.500"} mt={10} fontSize={"sm"}> SINCE </Text>
                                                    {/* <Text fontSize={"sm"}> {teamData ? (formatDate_pl(teamData.created_at)) : "-"} </Text> */}
                                                    <Text fontSize={"sm"}> {teamData ? teamData.since : "-"} </Text>
                                                    <Divider />
                                                </VStack>
                                                {/* <BigDivider /> */}
                                                {/* <SmallDivider /> */}
                                                <Empty />
                                                    <VStack>
                                                        <Button onClick={onOpen} backgroundColor={"point.500"} color={"black"} width={"80%"}> 팀 정보 업데이트 </Button>
                                                        {teamData.is_founder && <>
                                                                                    <Button onClick={onDeleteOpen} backgroundColor={"black"} color={"white"} width={"80%"}> 팀 삭제하기 </Button>
                                                                                    <TeamDeleteModal isOpen={isDeleteOpen} onClose={onDeleteClose} teamName={teamData.name} />
                                                                                </>}
                                                    </VStack>
                                                    <BigDivider />
                                                    <VStack alignItems={"flex-start"} px={5} my={8}>
                                                        <Text as="b" color={"main.500"} fontSize={"md"}> 관리자 </Text>
                                                        <Divider />
                                                        {teamSpvsrsData?.map((spvsr) => 
                                                                                        <HStack mb={3} justifyContent={"space-between"}>
                                                                                            <HStack>
                                                                                                <HStack spacing={3}>
                                                                                                    <Avatar src={spvsr.avatar}></Avatar>
                                                                                                    <Text as="b" fontSize={"sm"}>{spvsr.username}</Text>
                                                                                                </HStack>
                                                                                            {spvsr.is_founder &&
                                                                                                                <Box justifyContent={"center"} ml={1}>
                                                                                                                    <Badge bg={"gray.100"} color={"main.500"}> 최고 관리자 </Badge>
                                                                                                                </Box>}
                                                                                            </HStack>
                                                                                            {!spvsr.is_founder && teamData.is_founder ?
                                                                                            <>
                                                                                                <Button onClick={() => onMinusBtnClick(spvsr.username, spvsr.id)} variant={"unstyled"}>
                                                                                                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} color={"black"}>
                                                                                                        <FaMinusCircle />
                                                                                                    </Box>
                                                                                                </Button>
                                                                                                <TeamSpvsrsConnectCancelByFounderModal isOpen={isTeamSpvsrsConnectCancelByFounderOpen} onClose={onTeamSpvsrsConnectCancelByFounderClose}  userName={selectedUserName} userId={selectedUserId}  />
                                                                                            </> : null
                                                                                                }
                                                                                        </HStack>)}
                                                    </VStack>
                                                    {!teamData.is_founder && 
                                                                                <>
                                                                                <VStack>
                                                                                    <Button onClick={onTeamSpvsrsConnectCancelByOneselfOpen} mt={10} backgroundColor={"black"} color={"white"} size={"xs"}> - 관리자 해제하기 </Button>
                                                                                </VStack>
                                                                                <TeamSpvsrsConnectCancelByOneselfModal isOpen={isTeamSpvsrsConnectCancelByOneselfOpen} onClose={onTeamSpvsrsConnectCancelByOneselfClose} userName={"나"} />
                                                                                </>
                                                                            }
                                                    {teamData.is_founder &&
                                                        <VStack alignItems={"flex-start"} px={5} my={8}>
                                                            <Text as="b" color={"main.500"} fontSize={"md"}> 관리자 요청 </Text>
                                                            <Divider />
                                                            {teamConnectingSpvsrsData && teamConnectingSpvsrsData?.length !== 0 ? 
                                                                                teamConnectingSpvsrsData.map((connectingSpvsr) => 
                                                                                        <HStack mb={3} justifyContent={"space-between"}>
                                                                                            <HStack>
                                                                                                <HStack spacing={3}>
                                                                                                    <Avatar src={connectingSpvsr.avatar}></Avatar>
                                                                                                    <Text as="b" fontSize={"sm"}>{connectingSpvsr.username}</Text>
                                                                                                </HStack>
                                                                                            </HStack>
                                                                                            <HStack ml={3} spacing={1}>
                                                                                                <Button onClick={() => onAllowBtnClick(connectingSpvsr.username, connectingSpvsr.id)} size={"xs"} bgColor={"main.500"} color={"white"}>
                                                                                                    수락
                                                                                                </Button>
                                                                                                <TeamSpvsrsConnectModal isOpen={isTeamSpvsrsConnectOpen} onClose={onTeamSpvsrsConnectClose} userName={selectedRUserName} userId={selectedRUserId} />
                                                                                                <Button onClick={() => onDenyBtnClick(connectingSpvsr.username, connectingSpvsr.id)} size={"xs"} bgColor={"black"} color={"white"}>
                                                                                                    거부
                                                                                                </Button>
                                                                                                <TeamSpvsrsConnectingCancelByFounderModal isOpen={isTeamSpvsrsConnectingCancelByFounderOpen} onClose={onTeamSpvsrsConnectingCancelByFounderClose} teamName={teamData.name} userId={selectedRUserId} />
                                                                                            </HStack>
                                                                                        </HStack>) : <Text fontSize={"sm"}>요청한 사용자가 없습니다.</Text>}
                                                        </VStack>
                                                    }
                                                <Empty />
                                                <TeamUpdateModal isOpen={isOpen} onClose={onClose} />
                                            </TabPanel>
                                            :
                                            <TabPanel p={"0"}>
                                                <VStack alignItems={"flex-start"} px={5} my={8}>
                                                    <Text>팀 관리자만 볼 수 있습니다.</Text>
                                                </VStack>
                                            </TabPanel>
                                        }
            </TabPanels>
        </Tabs>
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