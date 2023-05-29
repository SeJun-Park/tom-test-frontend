import { Button, CircularProgress, CircularProgressLabel, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getTeam, getTeamPlayers, getTeamPlayersConnected } from "../api";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import NullPlayer from "../components/NullPlayer";
import Player from "../components/Player";
import ProtectedPage from "../components/ProtectedPage";
import { ITeam, ITinyPlayer } from "../types";

export default function IsPlayerTeamPlayerList() {

    const { teamPk } = useParams();

    const { isLoading : teamLoading, data : teamData, isError : teamError } = useQuery<ITeam>(["team", teamPk], getTeam);
    const { isLoading : teamPlayersConnectedLoading, data : teamPlayersConnectedData, isError : teamPlayersConnectedError } = useQuery<ITinyPlayer[]>(["teamConnectdPlayers", teamPk], getTeamPlayersConnected);
    const { isLoading : teamPlayersLoading, data : teamPlayersData, isError : teamPlayersError } = useQuery<ITinyPlayer[]>(["teamPlayers", teamPk], getTeamPlayers);

    const navigate = useNavigate();
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
                <CircularProgress size={"65px"} thickness={"5px"} value={teamPlayersConnectedData && teamPlayersData && teamPlayersData && teamPlayersData.length !=0 ? Number(((teamPlayersConnectedData.length/teamPlayersData.length)*100).toFixed(1)) : 0} color='main.500'>
                                <CircularProgressLabel fontSize={"xs"}>{teamPlayersConnectedData && teamPlayersData && teamPlayersData && teamPlayersData.length !=0 ? ((teamPlayersConnectedData.length/teamPlayersData.length)*100).toFixed(1) : "0"}%</CircularProgressLabel>
                </CircularProgress>
            </HStack>
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
                <Text as="b" color={"main.500"} fontSize={"sm"}> ALL </Text>
                <Divider />
                {teamPlayersData?.map((player) => (
                                <Player 
                                    key={player.pk}
                                    pk={player.pk}
                                    avatar={player.avatar}
                                    backnumber={player.backnumber}
                                    name={player.name}
                                    is_connecting={player.is_connecting}
                                    is_connected={player.is_connected}
                                />
                            ))}
            </VStack>
            <Empty />
        </ProtectedPage>
    )
}