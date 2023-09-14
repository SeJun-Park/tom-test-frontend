import { Box, Button, Divider, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getTeam, getTeamTomGames } from "../api";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import KakaoADBig from "../components/KakaoADBig";
import KakaoADSmall from "../components/KakaoADSmall";
import ProtectedPage from "../components/ProtectedPage";
import TomGame from "../components/TomGame";
import { ITeam, ITinyGame } from "../types";

export default function IsPlayerTeamVoteList() {

    const { teamPk } = useParams();

    const { isLoading : teamLoading, data : teamData, isError : teamError } = useQuery<ITeam>(["team", teamPk], getTeam);
    const { isLoading : teamTomGamesLoading, data : teamTomGamesData, isError : teamTomGamesError } = useQuery<ITinyGame[]>(["teamTomGames", teamPk], getTeamTomGames);

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
            <VStack>
                <Box w="320px" h="100px" my={3}>
                        <KakaoADBig />
                </Box>
            </VStack>
            <Tabs isFitted my={5} isLazy>
                <TabList mb='1em'>
                    <Tab _selected={{color : "main.500"}}> 3OM </Tab>
                    <Tab _selected={{color : "main.500"}}> 다른 투표 </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel p={0}>
                    <VStack alignItems={"flex-start"} px={3} mt={8}>
                        <HStack spacing={1}>
                            <Text as="b" color={"main.500"} fontSize={"sm"}> 3OM </Text>
                            <Text as="b" color={"main.500"} fontSize={"md"}> 선정 경기 </Text>
                        </HStack>
                        <Divider />
                        <HStack width={"100%"} justifyContent={"space-between"}>
                            <Text as="b" fontSize={"sm"}> TOTAL </Text>
                            <Text as="b" fontSize={"sm"}> {teamTomGamesData ? teamTomGamesData.length : "0"} 회 </Text>
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
                    </TabPanel>
                    <TabPanel p={0}>
                        <VStack alignItems={"flex-start"} padding={"5"} mb={10}>
                            <Text fontSize={"xl"} as="b"> 투표 등록 전입니다. </Text>
                        </VStack>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <VStack>
                <Box w="320px" h="50px">
                        <KakaoADSmall />
                </Box>
            </VStack>
            <Empty />
            <Empty />
        </ProtectedPage>
    )
}