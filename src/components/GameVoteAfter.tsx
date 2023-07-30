import { Avatar, Box, Divider, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query";
import { FaUserNinja } from "react-icons/fa";
import { getGame } from "../api";
import { IGame } from "../types";
import Empty from "./Empty";

interface IGameVoteAfterProps {
    gamePk : string
}

export default function GameVoteAfter( props : IGameVoteAfterProps) {

    const { isLoading : gameLoading, data : gameData, isError : gameError } = useQuery<IGame>(["game", props.gamePk], getGame);

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
                {gameData ? (gameData.toms.length !=0 ? gameData.toms.map((tom) => 
                                            <VStack>
                                                <Avatar src={tom.avatar} />
                                                <Text fontSize={"xx-small"}>{tom.name}</Text>
                                            </VStack>
                                                ) : 
                                                <>
                                                    <Box color={"main.500"}>
                                                        <FaUserNinja size={"25"} />
                                                    </Box>
                                                    <Box color={"main.500"}>
                                                        <FaUserNinja size={"25"} />
                                                    </Box>
                                                    <Box color={"main.500"}>
                                                        <FaUserNinja size={"25"} />
                                                    </Box>
                                                </>
                                                ) : null  }
            </HStack> 
            <VStack>
                <Heading fontSize={"xl"}>3man Of the Match </Heading>
                <Divider pt={2} />
            </VStack>
            <Empty />
        </>
    )
}