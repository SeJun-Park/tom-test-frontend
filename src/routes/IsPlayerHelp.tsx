import { Box, Button, Card, CardHeader, Flex, Heading, HStack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaArrowRight, FaComment, FaInstagram, FaQuestionCircle, FaYoutube } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import KakaoADBig from "../components/KakaoADBig";
import UserDeleteModal from "../components/UserDeleteModal";

export default function IsPlayerHelp() {

    const navigate = useNavigate();

    const onClickBack = () => {
        navigate(-1)
    }

    const { isOpen : isOpen, onOpen : onOpen, onClose : onClose } = useDisclosure()

    return (
        <>
            <Helmet>
                <title>삼오엠 | 고객센터</title>
            </Helmet>
            <HStack justifyContent={"space-between"} height={20} px={5}>
                <Button variant={"unstyled"} onClick={onClickBack}>
                    <FaArrowLeft />
                </Button>
            </HStack>
            <VStack alignItems={"flex-start"} padding={"5"} mb={2}>
                <Text fontSize={"xl"} as="b"> 플레이어 고객센터 </Text>
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
            <VStack>
                <Box w="320px" h="100px" my={10}>
                        <KakaoADBig />
                </Box>
            </VStack>
            <VStack alignItems={"flex-start"} padding={"5"}>
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
                <Button onClick={onOpen} size={"sm"} width="100%" color={"gray"} variant="ghost"> 회원 탈퇴 </Button>
                <UserDeleteModal isOpen={isOpen} onClose={onClose} />
            </HStack>
        </>
    )
}