import { Avatar, Box, Button, Center, Divider, Grid, Heading, HStack, Image, Modal, ModalBody, ModalContent, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaUserNinja } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getGame, getGameVote } from "../api";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import GameNoLink from "../components/GameNoLink";
import GameVote from "../components/GameVote";
import GoalPlayer from "../components/GoalPlayer";
import Player from "../components/Player";
import SmallDivider from "../components/SmallDivider";
import { formatDate } from "../lib/utils";
import { IGame, IGameVote } from "../types";
import "../video.css"

export default function GameVoteReadOnly() {

    const { gamePk } = useParams();

    const { isLoading : gameLoading, data : gameData, isError : gameError } = useQuery<IGame>(["game", gamePk], getGame);
    const { isLoading : gameVoteLoading, data : gameVoteData, isError : gameVoteError } = useQuery<IGameVote>(["gameVote", gamePk], getGameVote);

    const now = new Date()

    return (
        <>
            <Helmet>
                <title>{ gameData ? (`3OM | ${gameData.team.name} vs ${gameData.vsteam}`) : "Loading.." }</title>
            </Helmet>
            <HStack justifyContent={"center"} height={20} px={5}>
                <Text as="b" color="gray" fontSize={"xs"}>*본 페이지는 읽기 전용 페이지입니다.</Text>
            </HStack>
            <VStack alignItems={"flex-start"} px={3}>
                {gameData && 
                                <GameNoLink 
                                pk={gameData.pk} 
                                date={gameData?.date} 
                                team={gameData?.team} 
                                vsteam={gameData?.vsteam}
                                team_score={gameData?.team_score}
                                vsteam_score={gameData?.vsteam_score}
                                /> 
                            } 


                
            </VStack>
            <VStack px={5}>
                    <Text as="b" fontSize={"xx-small"} color="gray.500" mb={4} >{gameData?.location} | {gameData?.start_time.replace(/:\d{2}$/, '')}</Text>
            </VStack>
            <VStack spacing={4} px={7} justifyContent={"flex-start"} alignItems={"flex-start"}>
                    {gameData?.goals.map((goalplayer) => 
                                                        <GoalPlayer key={goalplayer.player.pk} playerPk={goalplayer.player.pk} />    )}
                    <Divider />
            </VStack>
            <VStack my={8}>
                <Box w="320px" h="100px" borderWidth="1px">
                        AD
                </Box>
            </VStack>
            <BigDivider />
            <HStack height={"10"} justifyContent={"center"} width={"100%"} p={10} spacing={10} my={2}>
                {gameData ? (gameData.toms.length !=0 ? gameData.toms.map((tom) => 
                                                <VStack key={tom.pk}>
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
                <Heading fontSize={"xl"}>3man Of the Match</Heading>
                {gameVoteData ? 
                (now < new Date(gameVoteData.start) ? 
                    <Heading fontSize={"xl"}> 투표 전입니다. </Heading> : (new Date(gameVoteData.start) < now && now < new Date(gameVoteData.end) ? 
                    <Heading fontSize={"xl"}> 투표중.. </Heading> : <Heading fontSize={"xl"}> 투표 종료. </Heading>)) : null}
                <Divider pt={3} />
                {gameVoteData && 
                                    <>
                                        <Text pt={2} fontSize={"sm"}>{formatDate(gameVoteData.start)}부터</Text>
                                        <Text fontSize={"sm"}>{formatDate(gameVoteData.end)}까지 </Text>
                                    </>
                }
                <Divider pt={3} />
            </VStack>
            <SmallDivider />
            <VStack px={5}>
                <Text py={5} as="b" color={"main.500"} fontSize={"md"} textDecoration={"underline"}> ⚽️ 삼오엠 투표 참여 방법 ⚽️ </Text>
                <Text fontSize={"sm"}> 1. 삼오엠에 가입하고 우리 팀을 검색한다. </Text>
                <Text fontSize={"sm"}> 2. 우리 팀 플레이어 중 내 이름을 찾아 연결한다. </Text>
                <Text fontSize={"sm"}> 3. 내가 참여한 경기를 찾아 삼오엠을 투표한다. </Text>
            </VStack>
            <Empty />
            <Empty />
            <VStack>
                <Box w="320px" h="50px" borderWidth="1px">
                        AD
                </Box>
            </VStack>
            <Empty />
            <Empty />
        </>
    )
}