import { Box, Button, Divider, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getTeam, getTeamTomGames, getTeamTomVoteIngGames, getTeamVotes } from "../api";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import KakaoADBig from "../components/KakaoADBig";
import KakaoADSmall from "../components/KakaoADSmall";
import TomGame from "../components/TomGame";
import { ITeam, ITeamVote, ITinyGame } from "../types";

export default function IsSpvsrTeamVoteList() {

    const { teamPk } = useParams();

    const { isLoading : teamLoading, data : teamData, isError : teamError } = useQuery<ITeam>(["team", teamPk], getTeam);
    const { isLoading : teamTomGamesLoading, data : teamTomGamesData, isError : teamTomGamesError } = useQuery<ITinyGame[]>(["teamTomGames", teamPk], getTeamTomGames);
    const { isLoading : teamTomVoteIngGamesLoading, data : teamTomVoteIngGamesData, isError : teamTomVoteIngGamesError } = useQuery<ITinyGame[]>(["teamTomVoteIngGames", teamPk], getTeamTomVoteIngGames);
    const { isLoading : teamVotesLoading, data : teamVotesData, isError : teamVotesError } = useQuery<ITeamVote[]>(["teamVotes", teamPk], getTeamVotes);

    const navigate = useNavigate();
    const onClickBack = () => {
        navigate(-1)
    }

    return (
        <>
            <Helmet>
                <title>{ teamData ? (`삼오엠 | ${teamData.name} 투표`) : "Loading.." }</title>
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
                        {teamTomVoteIngGamesData && teamTomVoteIngGamesData.map((tomVoteIngGame, index) => 
                                                    <>
                                                        <Text as="b" color={"main.500"} fontSize={"md"} key={index}> 투표 진행 중 🔥 </Text>
                                                        <TomGame 
                                                            key={tomVoteIngGame.pk}
                                                            pk={tomVoteIngGame.pk}
                                                            date={tomVoteIngGame.date}
                                                            team={tomVoteIngGame.team}
                                                            vsteam={tomVoteIngGame.vsteam}
                                                            team_score={tomVoteIngGame.team_score}
                                                            vsteam_score={tomVoteIngGame.vsteam_score}
                                                            toms={tomVoteIngGame.toms}
                                                        />
                                                    </>
                                                    )}
                                                        
                        <Text as="b" color={"main.500"} fontSize={"sm"}> ALL </Text>
                        {teamTomGamesData && teamTomGamesData.map((tomGame, index) => 
                                                    <TomGame 
                                                        key={tomGame.pk}
                                                        pk={tomGame.pk}
                                                        date={tomGame.date}
                                                        team={tomGame.team}
                                                        vsteam={tomGame.vsteam}
                                                        team_score={tomGame.team_score}
                                                        vsteam_score={tomGame.vsteam_score}
                                                        toms={tomGame.toms}
                                                        />)}
                    </VStack>
                    <Empty />
                    </TabPanel>
                    <TabPanel p={0}>
                        <VStack alignItems={"flex-start"} padding={"5"} mb={10}>
                            <Text fontSize={"xl"} as="b"> 투표 등록 전입니다. </Text>
                        </VStack>
                        <Empty />
                        <Empty />
                        <Empty />
                        <Empty />
                        <Empty />
                        <Empty />
                        <Empty />
                        <Empty />
                        {/* <VStack>
                            {teamVotesData && teamVotesData.map((tvote, index) => 
                                                                <TeamVote
                                                                key={index} 
                                                                pk={tvote.pk}
                                                                start={tvote.start}
                                                                title={tvote.title}
                                                                description={tvote.description}
                                                                participants={tvote.participants}
                                                                winners={tvote.winners}
                                                                />
                                                                    )}
                        </VStack> */}
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
        </>
    )
}