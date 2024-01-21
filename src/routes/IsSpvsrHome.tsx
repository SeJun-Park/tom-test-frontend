import { VStack, Text, Tabs, TabList, Tab, TabPanels, TabPanel, Divider, HStack, Box, Badge, Image, Card, CardHeader, Flex, Heading, Avatar, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import { getTeamsRecently, isSpvsr, isSpvsrTeams } from "../api"
import Empty from "../components/Empty"
import KakaoADBig from "../components/KakaoADBig"
import Team from "../components/Team"
import { ISpvsrUser, ITeam, ITinyTeam } from "../types"
import { BsBoxArrowUp } from "react-icons/bs";
import { FaAndroid, FaApple, FaCaretRight, FaEllipsisV } from "react-icons/fa"

export default function IsSpvsrHome() {

    const { isLoading : teamsRecentlyLoading, data : teamsRecentlyData, isError : teamsRecentlyError } = useQuery<ITinyTeam[]>(["teamsRecently"], getTeamsRecently);
    const { isLoading : spvsrLoading, data : spvsrData, isError : spvsrError } = useQuery<ISpvsrUser>(["isSpvsr"], isSpvsr); 
    const { isLoading : spvsrTeamsLoading, data : spvsrTeamsData, isError : spvsrTeamsError } = useQuery<ITinyTeam[]>(["isSpvsrTeams"], isSpvsrTeams);

    const { isOpen, onOpen, onClose } = useDisclosure(); 

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
                        <VStack spacing={5} py={32}>
                            <Link to={"/introduce"}>
                                <Text as="b" fontSize="xl">
                                    WHAT IS THE
                                </Text>
                                <Text as="b" fontSize="xl" color={"main.500"} ml={2}>
                                    3OM?
                                </Text>
                            </Link>
                            <Link to={"/teams/search"}>
                                <Text as="b" fontSize="xl">
                                    TEAM SEARCH ⌕
                                </Text>
                            </Link>
                            <Button mt={5} onClick={onOpen} size={"xs"} width="100%" variant="ghost"> 
                                <Text as="b" color={"main.500"}>
                                ✓ 삼오엠을 홈 화면에 추가하는 방법
                                </Text>
                            </Button>
                            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <VStack padding={"5"} spacing="5">
                                            <HStack>
                                                <FaApple />
                                                <Text fontSize={"md"}>
                                                    아이폰에서는
                                                </Text>
                                            </HStack>
                                            <HStack spacing={3}>
                                                <VStack spacing={0}>
                                                    <Text fontSize={"md"}>
                                                        사파리로 
                                                    </Text>
                                                    <Text fontSize={"md"}>
                                                        삼오엠 접속
                                                    </Text>
                                                </VStack>
                                                <FaCaretRight/>
                                                <VStack pt={2} spacing={1}>
                                                    <BsBoxArrowUp />
                                                    <Text fontSize={"xs"} color={"gray"}>하단 중앙</Text>
                                                </VStack>
                                                <FaCaretRight/>
                                                <Text fontSize={"md"}>
                                                    홈 화면에 추가
                                                </Text>
                                            </HStack>
                                            <Divider />
                                            <HStack>
                                                <FaAndroid color="#A8CF45" />
                                                <Text fontSize={"md"}>
                                                    안드로이드 폰에서는
                                                </Text>
                                            </HStack>
                                            <HStack>
                                                <VStack spacing={0}>
                                                    <Text fontSize={"md"}>
                                                        크롬으로 
                                                    </Text>
                                                    <Text fontSize={"md"}>
                                                        삼오엠 접속
                                                    </Text>
                                                </VStack>
                                                <FaCaretRight/>
                                                <VStack pt={2} spacing={1}>
                                                    <FaEllipsisV />
                                                    <Text fontSize={"xs"} color={"gray"}>우측 상단</Text>
                                                </VStack>
                                                <FaCaretRight/>
                                                <Text fontSize={"md"}>
                                                    홈 화면에 추가
                                                </Text>
                                            </HStack>
                                        </VStack>
                                    </ModalBody>
                                </ModalContent>
                            </Modal>
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