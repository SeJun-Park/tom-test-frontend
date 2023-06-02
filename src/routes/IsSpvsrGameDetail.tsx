import { Box, Button, Divider, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getGame, isSpvsr } from "../api";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import GameNoLink from "../components/GameNoLink";
import GameVote from "../components/GameVote";
import GoalPlayer from "../components/GoalPlayer";
import Player from "../components/Player";
import { IGame, ISpvsrUser } from "../types";

export default function IsSpvsrGameDetail() {

    const { gamePk } = useParams();

    const { isLoading : spvsrLoading, data : spvsrData, isError : spvsrError } = useQuery<ISpvsrUser>(["isSpvsr"], isSpvsr);
    const { isLoading : gameLoading, data : gameData, isError : gameError } = useQuery<IGame>(["game", gamePk], getGame);

    const navigate = useNavigate();

    const onClickBack = () => {
        navigate(-1)
    }


    return (
        <>
            <Helmet>
                <title>{ gameData ? (`3OM | ${gameData.team.name} vs ${gameData.vsteam}`) : "Loading.." }</title>
            </Helmet>
            <HStack height={20} px={5}>
                <Button variant={"unstyled"} onClick={onClickBack}>
                    <FaArrowLeft />
                </Button>
            </HStack>
            <VStack alignItems={"flex-start"} px={5} pt={5} mb={10}>
                <Text fontSize={"xl"} as="b"> {gameData?.team.name} </Text>
                <HStack>
                    <Text fontSize={"xl"}> vs </Text>
                    <Text fontSize={"xl"} as="b"> {gameData?.vsteam}</Text>
                </HStack>
                <Box>
                        {spvsrData?.team.name === gameData?.team.name ? 
                                                            <Link to={`/games/${gamePk}/update`}>
                                                                <Button backgroundColor={"point.500"} color={"black"} size={"sm"}> Update </Button>
                                                            </Link> 
                                                                    : null}
                        
                </Box>
            </VStack>
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
            <BigDivider />
            <Tabs variant='soft-rounded' isLazy align={"center"}>
                <TabList>
                    <Tab _selected={{color : "black", bgColor : "point.500"}}>3OM</Tab>
                    <Tab _selected={{color : "black", bgColor : "point.500"}}>Line-ups</Tab>
                    <Tab _selected={{color : "black", bgColor : "point.500"}}>Related</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel p={0}>
                        <VStack alignItems={"flex-start"} px={3} spacing={4}>
                            <Divider mt={8}/>
                        </VStack>
                        { gamePk && <GameVote gamePk={gamePk} />}


                    </TabPanel>
                    <TabPanel p={0}>
                        <VStack alignItems={"flex-start"} px={3} spacing={4}>
                            <Divider mt={8}/>
                            {gameData?.participants.map((participant) => (
                                            <Player 
                                                key={participant.pk}
                                                pk={participant.pk}
                                                avatar={participant.avatar}
                                                backnumber={participant.backnumber}
                                                name={participant.name}
                                                is_connecting={participant.is_connecting}
                                                is_connected={participant.is_connected}
                                            />
                                        ))}
                        <Empty />
                        </VStack>
                    </TabPanel>
                    <TabPanel p={0}>

                    </TabPanel>
                </TabPanels>
            </Tabs>

        </>
    )
}