import { VStack, Text, Tabs, TabList, Tab, TabPanels, TabPanel, Divider, HStack, Box, Badge, Image, Card, CardHeader, Flex, Heading, Avatar, Button } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"
import { getTeamsRecently, isSpvsr, isSpvsrTeams } from "../api"
import Empty from "../components/Empty"
import KakaoADBig from "../components/KakaoADBig"
import Team from "../components/Team"
import { ISpvsrUser, ITeam, ITinyTeam } from "../types"

export default function IsSpvsrHome() {

    const { isLoading : teamsRecentlyLoading, data : teamsRecentlyData, isError : teamsRecentlyError } = useQuery<ITinyTeam[]>(["teamsRecently"], getTeamsRecently);
    const { isLoading : spvsrLoading, data : spvsrData, isError : spvsrError } = useQuery<ISpvsrUser>(["isSpvsr"], isSpvsr); 
    const { isLoading : spvsrTeamsLoading, data : spvsrTeamsData, isError : spvsrTeamsError } = useQuery<ITinyTeam[]>(["isSpvsrTeams"], isSpvsrTeams);

    const [tabIndexHome, setTabIndexHome] = useState(Number(localStorage.getItem('tabIndexHome')) || 0);

    useEffect(() => {
      localStorage.setItem('tabIndexHome', tabIndexHome.toString());
    }, [tabIndexHome]);

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
                            <VStack position="relative" width="90%" height="75">
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
                            <VStack position="relative" width="90%" height="75">
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
                        {/* <Image src="https://imagedelivery.net/SbAhiipQhJYzfniSqnZDWw/2dd3a302-1759-4888-9a07-520718726400/public" /> */}
                        <VStack mt={2}>
                            <Box w="320px" h="100px">
                                    <KakaoADBig />
                            </Box>
                        </VStack>
                        <Empty />
                        <VStack alignItems={"flex-start"} width={"90%"} mt={8}>
                            <Text as="b" color={"main.500"} fontSize={"md"}> 새로 올라온 팀 </Text>
                            <Divider />
                        </VStack>
                        <VStack alignItems={"flex-start"} px={3} spacing={3} my={10}>
                            {teamsRecentlyData?.map((team) => 
                                <Team  pk={team.pk} avatar={team.avatar} name={team.name} />
                            )}
                        </VStack>
                        <VStack alignItems={"flex-start"} width={"90%"} mt={8}>
                            <Text as="b" color={"main.500"} fontSize={"md"}> 삼오엠 베스트 </Text>
                            <Divider />
                        </VStack>
                        <VStack alignItems={"flex-start"} px={3} spacing={3} my={10}>
                        </VStack>
                    </TabPanel>
                    <TabPanel p={0}>
                        <VStack my={10} spacing={3}>
                            <HStack spacing={3}>
                                <Avatar src={spvsrData?.avatar}></Avatar>
                                <VStack spacing={0}>
                                    <Text fontSize={"lg"} as="b"> {spvsrData?.username} </Text>
                                    <Text fontSize={"sm"} as="b" color={"main.500"}> 관리자 </Text>
                                </VStack>
                            </HStack>
                        </VStack>
                        <Tabs isFitted variant='enclosed' isLazy>
                            <TabList mb='1em'>
                                <Tab _selected={{color : "main.500"}}>나의 팀</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel p={"0"}>
                                {spvsrTeamsData?.length !== 0 ? 
                                                <VStack alignItems={"flex-start"} px={3} spacing={3} mt={10}>
                                                    {spvsrTeamsData?.map((team) => 
                                                        <Team  pk={team.pk} avatar={team.avatar} name={team.name} />
                                                    )}
                                                </VStack>
                                                    :
                                                    <VStack px={3}  mt={8} py={3}>
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
                                                                            <Text as="b">상단 검색 버튼으로 나의 팀을 검색해보거나 </Text>
                                                                            <Text as="b">팀을 만들어 시작해보세요! </Text>
                                                                        </VStack>
                                                                        </Box>
                                                                    </Flex>
                                                                </Flex>
                                                            </CardHeader>
                                                        </Card>
                                                    </VStack>
                                                    }
                                            <VStack>
                                                <Link to={"/teams/register"}>
                                                    <Button mt={10} backgroundColor={"main.500"} color={"white"} size={"xs"}> + 팀 등록하기 </Button>
                                                </Link>
                                            </VStack>
                                            <Empty />
                                            <Empty />
                                            <Empty />
                                            <Empty />
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