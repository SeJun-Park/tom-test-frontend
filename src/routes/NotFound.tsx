import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <VStack bgColor={"gray.100"} justifyContent={"center"} minHeight={"100vh"}>
            <Heading> 페이지를 찾을 수 없습니다. </Heading>
            <Text> 알맞은 경로가 아닙니다. </Text>
            <Link to={"/"}>
                <Button variant={"solid"} bgColor={"main.500"} color={"white"}> 홈으로 가기 &rarr; </Button>
            </Link>
        </VStack>  
    )
}