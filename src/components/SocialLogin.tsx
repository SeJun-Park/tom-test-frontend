import { Box, Divider, HStack, VStack, Button } from "@chakra-ui/react";
import { FaComment } from "react-icons/fa";

export default function SocialLogin() {

    const kakaoParamsObject = {
        client_id : "1c4cb9fa293fd2cb3a132f04abaae253",
        // 아마도 REST API KEY
        redirect_uri : "https://3manofthematch.com/kakaologin",
        response_type : "code",
            //response_type 은 "code" 로 고정
    }

    const kakaoParams = new URLSearchParams(kakaoParamsObject).toString()


    return (
        <Box mb={4} w={"80%"}>
            <VStack>
                <Button as="a" href={`https://kauth.kakao.com/oauth/authorize?${kakaoParams}`} leftIcon={<FaComment />} backgroundColor={"#fae11c"} color={"#412423"} width={"100%"}> 카카오로 계속하기 </Button>
            </VStack>
        </Box>
    )
}