import { Box, Divider, HStack, VStack, Button, Text } from "@chakra-ui/react";
import { FaArrowDown, FaComment } from "react-icons/fa";

export default function SocialLogin() {

    const kakaoParamsObject = {
        client_id : "d2703f278acadc861b3685bb7368adfb",
        // 아마도 REST API KEY
        redirect_uri : "https://3manofthematch.com/kakaologin",
        response_type : "code",
            //response_type 은 "code" 로 고정
    }

    const kakaoParams = new URLSearchParams(kakaoParamsObject).toString()


    return (
        <Box mb={4}>
            <VStack>
                <Button as="a" href={`https://kauth.kakao.com/oauth/authorize?${kakaoParams}`} leftIcon={<FaComment />} backgroundColor={"point.500"} color={"black"} width={"100%"}> 카카오로 계속하기 </Button>
            </VStack>
            <HStack my={8}>
                {/* my는 margin top & bottom / mx는 margin left & right */}
                <Divider />
            </HStack>
        </Box>
    )
}