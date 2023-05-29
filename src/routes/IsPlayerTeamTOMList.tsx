import { Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getTeam, getTeamSuperplayers, getTeamTomGames } from "../api";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import ProtectedPage from "../components/ProtectedPage";
import SmallDivider from "../components/SmallDivider";
import TomGame from "../components/TomGame";
import { ISuperplayer, ITeam, ITinyGame } from "../types";

export default function IsPlayerTeamTOMList() {

    const { teamPk } = useParams();

    const { isLoading : teamLoading, data : teamData, isError : teamError } = useQuery<ITeam>(["team", teamPk], getTeam);
    const { isLoading : teamTomGamesLoading, data : teamTomGamesData, isError : teamTomGamesError } = useQuery<ITinyGame[]>(["teamTomGames", teamPk], getTeamTomGames);
    const { isLoading : teamSuperplayersLoading, data : teamSuperplayersData, isError : teamSuperplayersError } = useQuery<ISuperplayer[]>(["teamSuperplayers", teamPk], getTeamSuperplayers);

    const navigate = useNavigate();
    const onClickBack = () => {
        navigate(-1)
    }

    return (
        <ProtectedPage>
            <Helmet>
                <title>{ teamData ? (`3OM | ${teamData.name} 3OM List`) : "Loading.." }</title>
            </Helmet>
            <HStack height={20} px={5}>
                <Button variant={"unstyled"} onClick={onClickBack}>
                    <FaArrowLeft />
                </Button>
            </HStack>
            <VStack alignItems={"flex-start"} padding={"5"}>
                <Text fontSize={"xl"} as="b"> {teamData?.name} </Text>
            </VStack>
            <VStack alignItems={"flex-start"} px={3} mt={8}>
                <Text as="b" color={"main.500"} fontSize={"sm"}> 3OM GAME </Text>
                <Divider />
                <HStack width={"100%"} justifyContent={"space-between"}>
                    <Text as="b" fontSize={"sm"}> TOTAL </Text>
                    <Text as="b" fontSize={"sm"}> {teamTomGamesData ? teamTomGamesData.length : "0"} GAMES </Text>
                </HStack>
            </VStack>
            <SmallDivider />
                <VStack alignItems={"flex-start"} px={3} mt={8}>
                    <Text as="b" color={"main.500"} fontSize={"sm"}> SUPERPLAYER </Text>
                    <Divider />
                    <HStack width={"100%"} justifyContent={"space-between"}>
                        <Text as="b" fontSize={"sm"}> TOTAL </Text>
                        <Text as="b" fontSize={"sm"}> {teamSuperplayersData ? teamSuperplayersData.length : "0"} TIMES </Text>
                    </HStack>
                </VStack>
            <BigDivider />
            <VStack alignItems={"flex-start"} px={3} spacing={5}>
                <Text as="b" color={"main.500"} fontSize={"sm"}> ALL </Text>
                {teamTomGamesData ? teamTomGamesData.map((tomGame) => 
                                            <TomGame 
                                                key={tomGame.pk}
                                                pk={tomGame.pk}
                                                date={tomGame.date}
                                                team={tomGame.team}
                                                vsteam={tomGame.vsteam}
                                                team_score={tomGame.team_score}
                                                vsteam_score={tomGame.vsteam_score}
                                                toms={tomGame.toms}
                                                 />) : null}
            </VStack>
            <Empty />
        </ProtectedPage>
    )
}