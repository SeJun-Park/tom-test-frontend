import { Avatar, Button, Divider, HStack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
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
                    <Text as="b" fontSize={"xl"}> Connecting.. </Text>
                    <Button backgroundColor={"point.500"} color={"black"} size={"sm"} onClick={onOpen}> CANCEL </Button>
                </VStack>
            </HStack>
            <VStack alignItems={"flex-start"} px={3}>
                <Text as="b" color={"main.500"} mt={10} fontSize={"sm"}> LATEST </Text>
                <NullGame />
            </VStack>
            <BigDivider />
            <VStack alignItems={"flex-start"} px={3} mt={8}>
                <HStack width={"100%"} justifyContent={"space-between"}>
                    <Text as="b" color={"main.500"} fontSize={"sm"}> GAME </Text>
                </HStack>
                <Divider />
                <HStack width={"100%"} justifyContent={"space-between"}>
                    <Text as="b" fontSize={"sm"}> TOTAL </Text>
                    <Text as="b" fontSize={"sm"}> 0 GAMES </Text>
                </HStack>
            </VStack>
            <SmallDivider />
            <VStack alignItems={"flex-start"} px={3} mt={8}>
                <HStack width={"100%"} justifyContent={"space-between"}>
                    <Text as="b" color={"main.500"} fontSize={"sm"}> 3OM </Text>
                </HStack>
                <Divider />
                <HStack width={"100%"} justifyContent={"space-between"}>
                    <Text as="b" fontSize={"sm"}> TOTAL </Text>
                    <Text as="b" fontSize={"sm"}> 0 TIMES </Text>
                </HStack>
            </VStack>
            <SmallDivider />
            <VStack alignItems={"flex-start"} px={3} mt={8}>
                <HStack width={"100%"} justifyContent={"space-between"}>
                    <Text as="b" color={"main.500"} fontSize={"sm"}> GOAL </Text>
                </HStack>
                <Divider />
                <HStack width={"100%"} justifyContent={"space-between"}>
                    <Text as="b" fontSize={"sm"}> TOTAL </Text>
                    <Text as="b" fontSize={"sm"}> 0 GOALS </Text>
                </HStack>
            </VStack>
            <Empty />
            <PlayerConnectingCancelModal isOpen={isOpen} onClose={onClose} playerPk={props.playerPk} />
        </>
    )
}