import { Helmet } from "react-helmet";
import { Box, Divider, Heading, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaRunning, FaUserCog } from "react-icons/fa";
import Empty from "../components/Empty";
import SocialLogin from "../components/SocialLogin";
import { useQuery } from "@tanstack/react-query";
import { ITeam } from "../types";
import { getTeamsRecently } from "../api";
import Team from "../components/Team";
import KakaoADBig from "../components/KakaoADBig";
import { useEffect, useState } from "react";

export default function LogInRequired() {

    const { isLoading : teamsRecentlyLoading, data : teamsRecentlyData, isError : teamsRecentlyError } = useQuery<ITeam[]>(["teamsRecently"], getTeamsRecently);

    const [tabIndex, setTabIndex] = useState(Number(localStorage.getItem('tabIndex')) || 0);

    useEffect(() => {
      localStorage.setItem('tabIndex', tabIndex.toString());
    }, [tabIndex]);

    return (
            <>
                <Helmet>
                    <title>삼오엠 | 홈</title>
                </Helmet>              
                <Tabs variant='soft-rounded' isLazy align="center" index={tabIndex} onChange={setTabIndex}>
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
                            <Empty />
                            <Empty />
                            <VStack p={5}>
                                <HStack spacing={3}>
                                    <Heading as="b" size={"sm"}>로그인이 필요합니다.</Heading>
                                </HStack>
                                <Empty />
                                <SocialLogin />
                                <Empty />
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
                        </TabPanel>
                    </TabPanels>
                </Tabs>         
        </>
    )
}