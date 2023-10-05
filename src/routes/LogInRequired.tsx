import { Helmet } from "react-helmet";
import { Box, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Empty from "../components/Empty";
import SocialLogin from "../components/SocialLogin";
import KakaoADBig from "../components/KakaoADBig";

export default function LogInRequired() {

    return (<>
                <Helmet>
                    <title>로그인이 필요합니다.</title>
                </Helmet>              
                                    <VStack alignItems={"flex-end"} px={5} >
                                        <Box w="90%" h="100px" borderWidth="1px">
                                                <KakaoADBig />
                                        </Box>
                                    </VStack>
                                    <VStack alignItems={"flex-end"} padding={5}>
                                        <VStack position="relative" width="90%" height="100">
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
                                            <Text fontSize={"xl"} as="b"> 로그인이 필요합니다. </Text>
                                        </HStack>
                                    </VStack>
                                    <Tabs isFitted variant='enclosed' isLazy>
                                        <TabList mb='1em'>
                                            <Tab _selected={{color : "main.500"}}>나의 팀</Tab>
                                        </TabList>
                                        <TabPanels>
                                            <TabPanel p={"0"}>
                                                <VStack px={3} mt={8} py={3}>
                                                    <Text as="b" mb={3}>3manofthematch</Text>
                                                    <SocialLogin />
                                                    <VStack mt={3} spacing={3}>
                                                      <Text textAlign={"center"}>운영진을 위한, <br/> 쉽고 편한 조기축구 팀 관리 서비스</Text>
                                                      <Text as="b" color={"gray"} fontSize={"xs"}>관리자 또는 플레이어로 로그인하여 <br/> 나의 팀을 등록하거나 검색해보세요!</Text>
                                                    </VStack>
                                                </VStack>
                                                <Empty />
                                            </TabPanel>
                                        </TabPanels>
                                    </Tabs>
                
        </>
    )
}