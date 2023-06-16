import { Box, Divider, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import { FaUserNinja } from "react-icons/fa"
import { formatDate } from "../lib/utils";
import { IGameVote } from "../types";
import Empty from "./Empty";

interface IGameVoteBeforeProps {
    vote : IGameVote
}

export default function GameVoteBefore( props : IGameVoteBeforeProps) {

    // const start = new Date(props.vote.start);
    // start.setHours(start.getHours() - start.getTimezoneOffset() / 60);
    // const formattedStart = start.toLocaleString("ko-KR", {
    //     year: "numeric",
    //     month: "2-digit",
    //     day: "2-digit",
    //     hour: "2-digit",
    //     hour12: false,
    //     timeZone: "Asia/Seoul",
    //   });

    // const end = new Date(props.vote.end);
    // end.setHours(end.getHours() - end.getTimezoneOffset() / 60);
    // const formattedEnd = end.toLocaleString("ko-KR", {
    //     year: "numeric",
    //     month: "2-digit",
    //     day: "2-digit",
    //     hour: "2-digit",
    //     hour12: false,
    //     timeZone: "Asia/Seoul",
    //   });

    return (
        <>
            <HStack height={"10"} justifyContent={"center"} width={"100%"} p={10} spacing={10} my={2}>
                <Box color={"gray.400"}>
                    <FaUserNinja size={"25"} />
                </Box>
                <Box color={"gray.400"}>
                    <FaUserNinja size={"25"} />
                </Box>
                <Box color={"gray.400"}>
                    <FaUserNinja size={"25"} />
                </Box>
            </HStack>
            <VStack>
                <Heading fontSize={"xl"}>3man Of the Match Vote</Heading>
                <Divider pt={2} />
                <Text pt={2} fontSize={"sm"}>{formatDate(props.vote.start)}부터</Text>
                <Text fontSize={"sm"}>{formatDate(props.vote.end)}까지 </Text>
            </VStack>
            <Empty />
        </>
    )
}