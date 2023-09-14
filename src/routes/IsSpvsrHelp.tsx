import { Box, Button, Card, CardHeader, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaArrowRight, FaComment, FaInstagram, FaQuestionCircle, FaYoutube } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function IsSpvsrHelp() {

    const navigate = useNavigate();

    const onClickBack = () => {
        navigate(-1)
    }

    return (
        <>
            <Helmet>
                <title>3OM | 고객센터</title>
            </Helmet>
            <HStack justifyContent={"space-between"} height={20} px={5}>
                <Button variant={"unstyled"} onClick={onClickBack}>
                    <FaArrowLeft />
                </Button>
            </HStack>
            <VStack alignItems={"flex-start"} padding={"5"} mb={10}>
                <Text fontSize={"xl"} as="b"> 관리자 고객센터 </Text>
            </VStack>
            <VStack>
                <Link to={`http://pf.kakao.com/_VtbuG/chat`}>
                    <Card maxW='xs' minW='xs'>
                        <CardHeader>
                            <Flex gap="4" alignItems='center'>
                                <Box color={"#381c1b"}>
                                    <FaComment />
                                </Box>
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Box>
                                    <VStack alignItems={"flex-start"}>
                                        <Heading size='sm'>카카오톡 채널로 문의하기</Heading>
                                    </VStack>
                                    </Box>
                                </Flex>
                                <FaArrowRight size={"10"}/>
                            </Flex>
                        </CardHeader>
                    </Card>
                </Link>
                <Link to={`/help/faq`}>
                    <Card maxW='xs' minW='xs'>
                        <CardHeader>
                            <Flex gap="4" alignItems='center'>
                                <Box color={"#381c1b"}>
                                    <FaQuestionCircle />
                                </Box>
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Box>
                                    <VStack alignItems={"flex-start"}>
                                        <Heading size='sm'>자주 묻는 질문</Heading>
                                    </VStack>
                                    </Box>
                                </Flex>
                                <FaArrowRight size={"10"}/>
                            </Flex>
                        </CardHeader>
                    </Card>
                </Link>
            </VStack>
            <VStack alignItems={"flex-start"} padding={"5"} my={10}>
                <Text fontSize={"xl"} as="b"> 삼오엠 SNS </Text>
            </VStack>
            <VStack>
                <Link to={`https://www.instagram.com/3manofthematch/`}>
                    <Card maxW='xs' minW='xs'>
                        <CardHeader>
                            <Flex gap="4" alignItems='center'>
                                <Box color={"main.500"}>
                                    <FaInstagram />
                                </Box>
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Box>
                                    <VStack alignItems={"flex-start"}>
                                        <Heading size='sm'>삼오엠 인스타그램</Heading>
                                    </VStack>
                                    </Box>
                                </Flex>
                                <FaArrowRight size={"10"}/>
                            </Flex>
                        </CardHeader>
                    </Card>
                </Link>
                <Link to={`https://www.youtube.com/@3manofthematch/`}>
                    <Card maxW='xs' minW='xs'>
                        <CardHeader>
                            <Flex gap="4" alignItems='center'>
                                <Box color={"red"}>
                                    <FaYoutube />
                                </Box>
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Box>
                                    <VStack alignItems={"flex-start"}>
                                        <Heading size='sm'>삼오엠 유튜브</Heading>
                                    </VStack>
                                    </Box>
                                </Flex>
                                <FaArrowRight size={"10"}/>
                            </Flex>
                        </CardHeader>
                    </Card>
                </Link>
            </VStack>
            <HStack justifyContent={"flex-end"} my={10}>
                <Button size={"sm"} width="100%" color={"gray"} variant="ghost"> 회원 탈퇴 </Button>
            </HStack>
        </>
    )
}