import { useQuery } from "@tanstack/react-query";
import { isSpvsr, isSpvsrTeams } from "../api";
import ProtectedPage from "../components/ProtectedPage"
import { ISpvsrUser, ITinyTeam } from "../types";
import { Helmet } from "react-helmet";
import SpvsrOnlyPage from "../components/SpvsrOnlyPage";
import { Avatar, Badge, Box, Button, Card, CardHeader, Flex, HStack, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure, VStack } from "@chakra-ui/react";
import KakaoADBig from "../components/KakaoADBig";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Empty from "../components/Empty";
import Team from "../components/Team";

export default function IsSpvsrHome() {
    const { isLoading : spvsrLoading, data : spvsrData, isError : spvsrError } = useQuery<ISpvsrUser>(["isSpvsr"], isSpvsr); 
    const { isLoading : spvsrTeamsLoading, data : spvsrTeamsData, isError : spvsrTeamsError } = useQuery<ITinyTeam[]>(["isSpvsrTeams"], isSpvsrTeams);

    return (
        <SpvsrOnlyPage>
            <ProtectedPage>
                <Helmet>
                    <title>{ spvsrData ? ("삼오엠 | 홈") : "Loading.." }</title>
                </Helmet>
                {!spvsrLoading ? 
                                    <>
                                        <VStack alignItems={"flex-end"} px={5}>
                                            <Box w="320px" h="100px">
                                                    <KakaoADBig />
                                            </Box>
                                        </VStack>
                                        <VStack alignItems={"flex-end"} padding={"5"}>
                                            <VStack position="relative" width="320px" height="75">
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
                                            <HStack>
                                                <Text fontSize={"xl"} as="b"> {spvsrData?.username} </Text> 
                                                <Box justifyContent={"center"}>
                                                    <Badge ml={1} bg={"main.500"} color={"white"}> 관리자 </Badge>
                                                </Box>
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
                                                    <Empty />
                                                    <Empty />
                                                    <Empty />
                                                </TabPanel>
                                            </TabPanels>
                                        </Tabs>
                                    </>
                                
                                : 
                                    <VStack justifyContent={"center"} my={60}>
                                        <Spinner size={"lg"} />
                                    </VStack>
                                }
                
            </ProtectedPage>
        </SpvsrOnlyPage>
    )
}