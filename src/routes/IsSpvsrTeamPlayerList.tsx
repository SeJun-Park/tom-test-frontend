import { Badge, Box, Button, CircularProgress, CircularProgressLabel, Divider, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getTeam, getTeamPlayers, getTeamPlayersConnected, getTeamPlayersGoalStats, getTeamPlayersTOMStats, isSpvsr } from "../api";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import PlayerAddModal from "../components/PlayerAddModal";
import PlayerGoalStats from "../components/PlayerGoalStats";
import PlayerTOMStats from "../components/PlayerTOMStats";
import ProtectedPage from "../components/ProtectedPage";
import SpvsrPlayer from "../components/SpvsrPlayer";
import { ISpvsrUser, ITeam, ITinyPlayer } from "../types";

export default function IsSpvsrTeamPlayerList() {

    const { teamPk } = useParams();

    const { isLoading : spvsrLoading, data : spvsrData, isError : spvsrError } = useQuery<ISpvsrUser>(["isSpvsr"], isSpvsr);
    const { isLoading : teamLoading, data : teamData, isError : teamError } = useQuery<ITeam>(["team", teamPk], getTeam);
    const { isLoading : teamPlayersConnectedLoading, data : teamPlayersConnectedData, isError : teamPlayersConnectedError } = useQuery<ITinyPlayer[]>(["teamConnectdPlayers", teamPk], getTeamPlayersConnected);
    const { isLoading : teamPlayersLoading, data : teamPlayersData, isError : teamPlayersError } = useQuery<ITinyPlayer[]>(["teamPlayers", teamPk], getTeamPlayers);
    const { isLoading : teamPlayersGoalStatsLoading, data : teamPlayersGoalStatsData, isError : teamPlayersGoalStatsError } = useQuery<ITinyPlayer[]>(["teamPlayersGoalStats", teamPk], getTeamPlayersGoalStats);
    const { isLoading : teamPlayersTOMStatsLoading, data : teamPlayersTOMStatsData, isError : teamPlayersTOMStatsError } = useQuery<ITinyPlayer[]>(["teamPlayersTOMStats", teamPk], getTeamPlayersTOMStats);

    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const onClickBack = () => {
        navigate(-1)
    }

    return (
        <ProtectedPage>
            <Helmet>
                <title>{ teamData ? (`3OM | ${teamData.name} Player List`) : "Loading.." }</title>
            </Helmet>
            <HStack height={20} px={5}>
                <Button variant={"unstyled"} onClick={onClickBack}>
                    <FaArrowLeft />
                </Button>
            </HStack>
            <VStack alignItems={"flex-start"} padding={"5"}>
                <Text fontSize={"xl"} as="b"> {teamData?.name} </Text>
            </VStack>
            <HStack justifyContent={"center"}>
                <Text fontSize={"sm"}> CNTD-rate </Text>
                <CircularProgress size={"65px"} thickness={"5px"} value={teamPlayersConnectedData && teamPlayersData && teamPlayersData && teamPlayersData.length !==0 ? Number(((teamPlayersConnectedData.length/teamPlayersData.length)*100).toFixed(1)) : 0} color='main.500'>
                                <CircularProgressLabel fontSize={"xs"}>{teamPlayersConnectedData && teamPlayersData && teamPlayersData && teamPlayersData.length !==0 ? ((teamPlayersConnectedData.length/teamPlayersData.length)*100).toFixed(1) : "0"}%</CircularProgressLabel>
                </CircularProgress>
            </HStack>
            <Tabs isFitted my={5} isLazy>
                <TabList mb='1em'>
                    <Tab _selected={{color : "main.500"}}> ALL </Tab>
                    <Tab _selected={{color : "main.500"}}> STATS </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel p={0}>
                        <VStack alignItems={"flex-start"} px={3} mt={8}>
                            <Text as="b" color={"main.500"} fontSize={"sm"}> PLAYER </Text>
                            <Divider />
                            <HStack width={"100%"} justifyContent={"space-between"}>
                                <Text as="b" fontSize={"sm"}> TOTAL </Text>
                                <Text as="b" fontSize={"sm"}> {teamPlayersData ? teamPlayersData.length : "0"} PLAYERS </Text>
                            </HStack>
                        </VStack>
                        <BigDivider />
                        <VStack alignItems={"flex-start"} px={3} spacing={4}>
                        <HStack justifyContent={"space-between"} width={"100%"}>
                            <Text as="b" color={"main.500"} fontSize={"sm"}> ALL </Text>
                            <Box>
                                {spvsrData?.team.name === teamData?.name ? 
                                                                        <Button onClick={onOpen} backgroundColor={"point.500"} color={"black"} size={"xs"}> + NEW </Button>
                                                                            : null}
                                
                            </Box>
                        </HStack>
                        <Divider />
                            {teamPlayersData?.map((player) => (
                                                                <SpvsrPlayer
                                                                    key={player.pk}
                                                                    pk={player.pk}
                                                                    avatar={player.avatar}
                                                                    backnumber={player.backnumber}
                                                                    name={player.name}
                                                                    is_connecting={player.is_connecting}
                                                                    is_connected={player.is_connected}
                                                                    is_spvsr={spvsrData?.team.name === teamData?.name}
                                                                />
                                        ))}
                        </VStack>
                        {teamPk ? <PlayerAddModal isOpen={isOpen} onClose={onClose} teamPk={teamPk} /> : null}
                        <Empty />
                    </TabPanel>
                    <TabPanel p={0}>
                        <Tabs variant='soft-rounded' isLazy align={"center"} my={8}>
                            <TabList>
                                <Tab _selected={{color : "black", bgColor : "point.500"}}>3OM</Tab>
                                <Tab _selected={{color : "black", bgColor : "point.500"}}>goals</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel p={0}>
                                    <VStack alignItems={"flex-start"} px={3} spacing={4} mt={8}>
                                        <Divider />
                                        <Text as="b" color={"main.500"} fontSize={"sm"}> RANKING </Text>
                                        <Divider />
                                        {teamPlayersTOMStatsData?.map((player, index) => (
                                                <PlayerTOMStats 
                                                    key={player.pk}
                                                    index={index+1}
                                                    pk={player.pk}
                                                    avatar={player.avatar}
                                                    backnumber={player.backnumber}
                                                    name={player.name}
                                                    is_connecting={player.is_connecting}
                                                    is_connected={player.is_connected}
                                                />
                                            ))}
                                        <Empty />
                                    </VStack>
                                </TabPanel>
                                <TabPanel p={0}>
                                    <VStack alignItems={"flex-start"} px={3} spacing={4} mt={8}>
                                        <Divider />
                                        <Text as="b" color={"main.500"} fontSize={"sm"}> RANKING </Text>
                                        <Divider />
                                        {teamPlayersGoalStatsData?.map((player, index) => (
                                                    <PlayerGoalStats 
                                                        key={player.pk}
                                                        index={index+1}
                                                        pk={player.pk}
                                                        avatar={player.avatar}
                                                        backnumber={player.backnumber}
                                                        name={player.name}
                                                        is_connecting={player.is_connecting}
                                                        is_connected={player.is_connected}
                                                    />
                                                ))}
                                        <Empty />
                                    </VStack>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </ProtectedPage>
    )
}