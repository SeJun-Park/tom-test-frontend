import { Avatar, Box, Button, Divider, HStack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import KakaoADBig from "../components/KakaoADBig";
import KakaoADSmall from "../components/KakaoADSmall";
import NullGame from "../components/NullGame";
import PlayerConnectModal from "../components/PlayerConnectModal";
import SmallDivider from "../components/SmallDivider";

interface IsPlayerTeamHomePlayerIsNotConnectedProps {
    teamPk : string
}

export default function IsPlayerTeamHomePlayerIsNotConnected( props : IsPlayerTeamHomePlayerIsNotConnectedProps ) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <HStack p={5} justifyContent={"flex-start"} spacing={5} width={"100%"}>
                <Avatar size={"xl"}/>
                <VStack alignItems={"flex-start"}>
                    <Text as="b" fontSize={"xl"}> 연결된 선수가 없습니다. </Text>
                    <Button onClick={onOpen} backgroundColor={"main.500"} color={"white"} size={"sm"}> 플레이어 연결하기 </Button>
                </VStack>
            </HStack>
            <VStack alignItems={"flex-start"} px={3}>
                <Text as="b" color={"main.500"} mt={10} fontSize={"md"}> 최근 경기 </Text>
                <NullGame />
            </VStack>
            <VStack>
                <Box w="320px" h="100px" mt={3}>
                        <KakaoADBig />
                </Box>
            </VStack>
            <BigDivider />
            <VStack alignItems={"flex-start"} px={3} mt={8}>
                <HStack width={"100%"} justifyContent={"space-between"}>
                    <Text as="b" color={"main.500"} fontSize={"sm"}> 경기 </Text>
                </HStack>
                <Divider />
                <HStack width={"100%"} justifyContent={"space-between"}>
                    <Text as="b" fontSize={"sm"}> TOTAL </Text>
                    <Text as="b" fontSize={"sm"}> 0 경기 </Text>
                </HStack>
            </VStack>
            <SmallDivider />
            <VStack alignItems={"flex-start"} px={3} mt={8}>
                <HStack width={"100%"} justifyContent={"space-between"}>
                    <Text as="b" color={"main.500"} fontSize={"md"}> 투표 </Text>
                </HStack>
                <Divider />
                <HStack width={"100%"} justifyContent={"space-between"}>
                    <Text as="b" fontSize={"sm"}> TOTAL </Text>
                    <Text as="b" fontSize={"sm"}> 0 회 </Text>
                </HStack>
            </VStack>
            <SmallDivider />
            <VStack alignItems={"flex-start"} px={3} mt={8}>
                <HStack width={"100%"} justifyContent={"space-between"}>
                    <Text as="b" color={"main.500"} fontSize={"md"}> 골 </Text>
                </HStack>
                <Divider />
                <HStack width={"100%"} justifyContent={"space-between"}>
                    <Text as="b" fontSize={"sm"}> TOTAL </Text>
                    <Text as="b" fontSize={"sm"}> 0 골 </Text>
                </HStack>
            </VStack>
            <Empty />
            <VStack>
                <Box w="320px" h="50px">
                        <KakaoADSmall />
                </Box>
            </VStack>
            <Empty />
            <Empty />
            <PlayerConnectModal isOpen={isOpen} onClose={onClose} teamPk={props.teamPk} />
        </>
    )
}