import { Avatar, Box, Button, Divider, HStack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import KakaoADBig from "../components/KakaoADBig";
import KakaoADSmall from "../components/KakaoADSmall";
import NullGame from "../components/NullGame";
import PlayerConnectingCancelModal from "../components/PlayerConnectingCancelModal";
import SmallDivider from "../components/SmallDivider";

interface IsPlayerTeamHomePlayerIsConnectingProps {
    playerPk : string
}

export default function IsPlayerTeamHomePlayerIsConnecting( props : IsPlayerTeamHomePlayerIsConnectingProps ) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <HStack p={5} justifyContent={"flex-start"} spacing={5} width={"100%"}>
                <Avatar size={"xl"}/>
                <VStack alignItems={"flex-start"}>
                    <Text as="b" fontSize={"xl"}> 연결 요청중.. </Text>
                    <Button backgroundColor={"point.500"} color={"black"} size={"sm"} onClick={onOpen}> 취소하기 </Button>
                </VStack>
            </HStack>
            <VStack alignItems={"flex-start"} px={3}>
                <Text as="b" color={"main.500"} mt={10} fontSize={"md"}> 최근 경기 </Text>
                <NullGame />
            </VStack>
            <BigDivider />
            <VStack alignItems={"flex-start"} px={3} mt={8}>
                <HStack width={"100%"} justifyContent={"space-between"}>
                    <Text as="b" color={"main.500"} fontSize={"md"}> 경기 </Text>
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
            <Empty />
            <Empty />
            <PlayerConnectingCancelModal isOpen={isOpen} onClose={onClose} playerPk={props.playerPk} />
        </>
    )
}