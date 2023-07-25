import { Avatar, Box, Button, Divider, Heading, HStack, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { FaCrown, FaQuestion, FaUserNinja } from "react-icons/fa"
import { getGame } from "../api"
import { formatDate } from "../lib/utils"
import { IGame, IGameVote } from "../types"
import Empty from "./Empty"
import TomVoteModal from "./TomVoteModal"

interface IGameVoteIngProps {
    vote : IGameVote,
    gamePk : string
}

export default function GameVoteIng( props : IGameVoteIngProps) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isLoading : gameLoading, data : gameData, isError : gameError } = useQuery<IGame>(["game", props.gamePk], getGame);

    return (
        <>
        {props.vote.is_candidate ? 
            <>
            {gameData ? (gameData.toms.length !=0 ? gameData.toms.map((tom) => 
                                        <VStack>
                                            <Avatar src={tom.avatar} />
                                            <Text fontSize={"xx-small"}>{tom.name}</Text>
                                        </VStack>
                                            ) : 
                                            <HStack height={"10"} justifyContent={"center"} width={"100%"} p={10} spacing={10} my={2}>
                                                <Box color={"main.500"}>
                                                    <FaUserNinja size={"25"} />
                                                </Box>
                                                <Box color={"main.500"}>
                                                    <FaUserNinja size={"25"} />
                                                </Box>
                                                <Box color={"main.500"}>
                                                    <FaUserNinja size={"25"} />
                                                </Box>
                                            </HStack>
                                              ) : null  }
            <VStack>
                <Heading fontSize={"xl"}>3man Of the Match</Heading>
                {props.vote.is_participant ? 
                                    <VStack width={"100%"}> 
                                        <Heading fontSize={"xl"}> 투표 완료. </Heading>
                                    </VStack>
                                         : 
                                    <VStack py={4} width={"100%"}> 
                                        <Button onClick={onOpen} width={"100%"} backgroundColor={"main.500"} color={"white"} > 투표하기 </Button>
                                        <Button width={"100%"} backgroundColor={"point.500"} color={"black"} > 카톡으로 공유하기 </Button>
                                    </VStack>
                                    }
                <Divider pt={2} />
                <Text pt={2} fontSize={"sm"}>{formatDate(props.vote.start)}부터</Text>
                <Text fontSize={"sm"}>{formatDate(props.vote.end)}까지 </Text>
            </VStack>
            <Empty />
            <TomVoteModal isOpen={isOpen} onClose={onClose} vote={props.vote} />
            </>
            :
            <>
            {gameData ? (gameData.toms.length !=0 ? gameData.toms.map((tom) => 
                                                    <VStack>
                                                        <Avatar src={tom.avatar} />
                                                        <Text fontSize={"xx-small"}>{tom.name}</Text>
                                                    </VStack>
                                                        ) : 
                                                        <HStack height={"10"} justifyContent={"center"} width={"100%"} p={10} spacing={10} my={2}>
                                                            <Box color={"main.500"}>
                                                                <FaUserNinja size={"25"} />
                                                            </Box>
                                                            <Box color={"main.500"}>
                                                                <FaUserNinja size={"25"} />
                                                            </Box>
                                                            <Box color={"main.500"}>
                                                                <FaUserNinja size={"25"} />
                                                            </Box>
                                                        </HStack>
                                                        ) : null  }
            <VStack>
                <Heading fontSize={"xl"}>3man Of the Match</Heading>
                <VStack width={"100%"}> 
                    <Heading fontSize={"xl"}> 투표중.. </Heading>
                </VStack>
                <Divider pt={2} />
                <Text pt={2} fontSize={"sm"}>{formatDate(props.vote.start)}부터</Text>
                <Text fontSize={"sm"}>{formatDate(props.vote.end)}까지 </Text>
            </VStack>
            <Empty />
        </>
            }
        </>
    )
}