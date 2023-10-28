import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
            <VStack alignItems={"flex-start"} padding={"5"} mb={10}>
                <Text fontSize={"xl"} as="b"> 준비중입니다 🥹 </Text>
            </VStack>
        </>
    )
}