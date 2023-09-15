import { Divider, Text, VStack } from "@chakra-ui/react";

export default function Footer() {
    return (
        <>
            <Divider />
            <VStack alignItems={"flex-start"} px={5} py={10}>
                <Text fontSize={"xs"} >3manofthematch, 삼오엠</Text>
                <Text fontSize={"xs"} color={"gray.500"}>대표 메일 : 3manofthematch@kakao.com</Text>
                <Text fontSize={"xs"} color={"gray.500"}>운영사 : 위플 (WEFL)</Text>
            </VStack>
        </>
    )
}