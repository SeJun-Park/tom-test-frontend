import { Helmet } from "react-helmet";
import { Box, Button, Divider, Heading, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaAndroid, FaApple, FaEllipsisV, FaRunning, FaUserCog } from "react-icons/fa";
import Empty from "../components/Empty";
import SocialLogin from "../components/SocialLogin";
import KakaoADBig from "../components/KakaoADBig";
import { useEffect, useState } from "react";
import { BsBoxArrowUp } from "react-icons/bs";

export default function LogInRequired() {

    const { isOpen, onOpen, onClose } = useDisclosure(); 

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
                                                <HStack>
                                                    <Text fontSize={"md"}>
                                                        사파리로 접속 &rarr; 
                                                    </Text>
                                                    <VStack spacing={1}>
                                                        <BsBoxArrowUp />
                                                        <Text fontSize={"xs"} color={"gray"}>하단 중앙</Text>
                                                    </VStack>
                                                    <Text fontSize={"md"}>
                                                        &rarr; 홈 화면에 추가
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
                                                    <Text fontSize={"md"}>
                                                        크롬으로 접속 &rarr; 
                                                    </Text>
                                                    <VStack spacing={1}>
                                                        <FaEllipsisV />
                                                        <Text fontSize={"xs"} color={"gray"}>우측 상단</Text>
                                                    </VStack>
                                                    <Text fontSize={"md"}>
                                                        &rarr; 홈 화면에 추가
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