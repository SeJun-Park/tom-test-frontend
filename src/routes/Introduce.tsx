import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaArrowRight, FaYoutube } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Introduce() {

    const navigate = useNavigate();

    const onClickBack = () => {
        navigate(-1)
    }

    return (
        <>
            <Helmet>
                <title> 삼오엠 | 커뮤니티 </title>
            </Helmet>
            <HStack height={20} px={5}>
                <Button variant={"unstyled"} onClick={onClickBack}>
                    <FaArrowLeft />
                </Button>
            </HStack>
            <VStack padding={"5"}>
            <VStack position="relative" width="100%" height="100">
                    <Link to={"https://youtube.com/shorts/W5-esqol62k?si=SBwqBLqhnw_hWxpm"}>
                        <Box position="absolute" top={0} left={0} right={0} bottom={0}>
                            <Box
                            backgroundImage="url(https://imagedelivery.net/SbAhiipQhJYzfniSqnZDWw/cacc459f-cdee-4a64-afad-b437c1068300/public)"
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
                                    <Box color={"red"}>
                                        <FaYoutube />
                                    </Box>
                                    {/* <Text fontSize="lg" color="white">
                                        삼오엠 홍보 영상 보러가기
                                    </Text> */}
                                    <Box color={"white"}>
                                        <FaArrowRight />
                                    </Box>
                                </HStack>
                            </Box>
                        </Box>
                    </Link>
                </VStack>
                <Text fontSize={"md"} my={5}>
                    축구 좋아하세요? <br/>
                    삼오엠은 3manofthematch의 약자로, <br/>
                    플레이어의 가입이 필요 없는 <br/>
                    운영진 중심의 조기축구 팀 관리 서비스입니다. <br/><br/>
                    이름처럼, <br/>
                    경기 후 플레이어가 직접 <br/>
                    3명의 MOM을 뽑을 수 있습니다. <br/>
                    하지만 굳이 이 기능을 사용하지 않아도 됩니다. <br/><br/>
                    선수, 기록, 일정, 회비, 포메이션까지. <br/>
                    운영진만 있어도 모든 팀 관리가 가능하고, <br/>
                    팀원들에게 카카오톡으로 공유해 줄 수 있습니다. <br/><br/>
                    삼오엠을 팀 홈페이지로 쓰세요! <br/>
                    그리고 조기축구를 더 재밌게 즐기세요. <br/>
                    물론, 당연히 무료입니다. <br/>
                </Text>
            </VStack>
        </>
    )
}