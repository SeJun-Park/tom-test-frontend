import { Button, CircularProgress, CircularProgressLabel, Divider, FormControl, FormHelperText, FormLabel, HStack, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getTeam, getTeamGames, getTeamGamesRelative, getTeamGoals, getTeamGoalsAgainst, getTeamGoalsAgainstRelative, getTeamGoalsRelative, getTeamStats, getTeamStatsRelative, getTeamVSteams } from "../api";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import Game from "../components/Game";
import ProtectedPage from "../components/ProtectedPage";
import SmallDivider from "../components/SmallDivider";
import { IGoals, ITeam, ITeamAllStats, ITeamStatsRelative, ITinyGame, IVSteams } from "../types";


interface IVSteamForm {
    vsteam : string;
}



export default function IsPlayerTeamGameList() {

    const { teamPk } = useParams();

    const { isLoading : teamLoading, data : teamData, isError : teamError } = useQuery<ITeam>(["team", teamPk], getTeam);
    const { isLoading : teamGamesLoading, data : teamGamesData, isError : teamGamesError } = useQuery<ITinyGame[]>(["teamGames", teamPk], getTeamGames);
    const { isLoading : teamGoalsLoading, data : teamGoalsData, isError : teamGoalsError } = useQuery<IGoals>(["teamGoals", teamPk], getTeamGoals);
    const { isLoading : teamGoalsAgainstLoading, data : teamGoalsAgainstData, isError : teamGoalsAgainstError } = useQuery<IGoals>(["teamGoalsAgainst", teamPk], getTeamGoalsAgainst);
    const { isLoading : teamStatsLoading, data : teamStatsData, isError : teamStatsError } = useQuery<ITeamAllStats>(["teamStats", teamPk], getTeamStats);
    const { isLoading : teamvVSteamsLoading, data : teamVSteamsData, isError : teamVSteamsError } = useQuery<IVSteams>(["teamVSteams", teamPk], getTeamVSteams);

    const [ currentVSteam, setCurrentVSteam ] = useState<string>("");
    const [ teamVSteamGames, setTeamVSteamGames ] = useState<ITinyGame[]>([]);
    const [ teamStatsRelative, setTeamStatsRelative ] = useState<ITeamStatsRelative>();
    const [ teamGoalsRelative, setTeamGoalsRelative ] = useState<IGoals>();
    const [ teamGoalsAgainstRelative, setTeamGoalsAgainstRelative ] = useState<IGoals>();

    const teamGamesRelativeMutation = useMutation(getTeamGamesRelative, 
        {
            onSuccess : (data) => {
                setTeamVSteamGames(data)
            }
        })

    const teamStatsRelativeMutation = useMutation(getTeamStatsRelative, 
        {
            onSuccess : (data) => {
                setTeamStatsRelative(data)
            }
        })

    const teamGoalsRelativeMutation = useMutation(getTeamGoalsRelative,
        {
            onSuccess : (data) => {
                setTeamGoalsRelative(data)
            }
        })

    const teamGoalsAgainstRelativeMutation = useMutation(getTeamGoalsAgainstRelative,
        {
            onSuccess : (data) => {
                setTeamGoalsAgainstRelative(data)
            }
        })

    const { register, handleSubmit, formState : {errors}, reset : VSteamSelectFormReset } = useForm<IVSteamForm>();

    const onSubmit = (data : IVSteamForm) => {
        const vsteam = data.vsteam
        if(teamPk){
            setCurrentVSteam(vsteam);
            teamStatsRelativeMutation.mutate({teamPk, vsteam})
            teamGamesRelativeMutation.mutate({teamPk, vsteam})
            teamGoalsRelativeMutation.mutate({teamPk, vsteam})
            teamGoalsAgainstRelativeMutation.mutate({teamPk, vsteam})
            VSteamSelectFormReset();
        }
    }

    const navigate = useNavigate();
    const onClickBack = () => {
        navigate(-1)
    }

    return (
        <ProtectedPage>
            <Helmet>
                <title>{ teamData ? (`3OM | ${teamData.name} Game List`) : "Loading.." }</title>
            </Helmet>
            <HStack height={20} px={5}>
                <Button variant={"unstyled"} onClick={onClickBack}>
                    <FaArrowLeft />
                </Button>
            </HStack>
            <VStack alignItems={"flex-start"} padding={"5"}>
                <Text fontSize={"xl"} as="b"> {teamData?.name} </Text>
            </VStack>
            <Tabs isFitted my={5} isLazy>
                <TabList mb='1em'>
                    <Tab _selected={{color : "main.500"}}> 전체 </Tab>
                    <Tab _selected={{color : "main.500"}}> 상대전적 </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel p={0}>
                        <VStack alignItems={"flex-start"} px={3} mt={8}>
                            <Text as="b" color={"main.500"} fontSize={"md"}> 경기 </Text>
                            <Divider />
                            <HStack width={"100%"} justifyContent={"space-between"}>
                                <Text as="b" fontSize={"sm"}> TOTAL </Text>
                                <Text as="b" fontSize={"sm"}> {teamGamesData ? teamGamesData.length : "0"} 경기 </Text>
                            </HStack>
                        </VStack>
                        <SmallDivider />
                        <VStack alignItems={"flex-start"} px={3} mt={8}>
                            <Text as="b" color={"main.500"} fontSize={"md"}> 전적 </Text>
                            <Divider />
                            <HStack width={"100%"} justifyContent={"space-between"}>
                                <Text as="b" fontSize={"sm"}> TOTAL </Text>
                                <Text as="b" fontSize={"sm"}> 
                                    {teamStatsData ? teamStatsData.win : "0"} 승 {teamStatsData ? teamStatsData.draw : "0"} 무 {teamStatsData ? teamStatsData.lose : "0"} 패 {teamStatsData ? teamStatsData.not : "0"} N </Text>
                            </HStack>
                            <Divider />
                            <HStack width={"100%"} justifyContent={"space-between"}>
                                <Text fontSize={"sm"}> 승률 </Text>
                                
                                <CircularProgress size={"65px"} thickness={"5px"} value={teamStatsData && teamGamesData && teamGamesData.length !==0 ? Number(((teamStatsData.win/teamGamesData.length)*100).toFixed(1)) : 0} color='main.500'>
                                    <CircularProgressLabel fontSize={"xs"}>{teamStatsData && teamGamesData && teamGamesData.length !==0 ? ((teamStatsData.win/teamGamesData.length)*100).toFixed(1) : "0"}%</CircularProgressLabel>
                                </CircularProgress>
                            </HStack>
                        </VStack>
                        <SmallDivider />
                        <VStack alignItems={"flex-start"} px={3} mt={8}>
                            <Text as="b" color={"main.500"} fontSize={"md"}> 골 </Text>
                            <Divider />
                            <HStack width={"100%"} justifyContent={"space-between"}>
                                <Text as="b" fontSize={"md"}> 총 득점 </Text>
                                <Text as="b" fontSize={"sm"}> {teamGoalsData ? teamGoalsData.goals : "0"} 골 </Text>
                            </HStack>
                            <Divider />
                            <HStack width={"100%"} justifyContent={"space-between"}>
                                <Text fontSize={"sm"}> 경기 당 골 </Text>
                                <Text fontSize={"sm"}> {teamGoalsData && teamGamesData && teamGamesData.length !==0 ? (teamGoalsData.goals/teamGamesData.length).toFixed(1) : "0"} 골 </Text>
                            </HStack>
                            <Divider />
                            <HStack width={"100%"} justifyContent={"space-between"}>
                                <Text as="b" fontSize={"md"}> 총 실점 </Text>
                                <Text as="b" fontSize={"sm"}> {teamGoalsAgainstData ? teamGoalsAgainstData.goals : "0"} 골 </Text>
                            </HStack>
                            <Divider />
                            <HStack width={"100%"} justifyContent={"space-between"}>
                                <Text fontSize={"sm"}> 경기 당 실점 </Text>
                                <Text fontSize={"sm"}> {teamGoalsAgainstData && teamGamesData && teamGamesData.length !==0 ? (teamGoalsAgainstData.goals/teamGamesData.length).toFixed(1) : "0"} 골 </Text>
                            </HStack>
                        </VStack>
                        <BigDivider />
                        <VStack alignItems={"flex-start"} px={3} spacing={5}>
                            <Text as="b" color={"main.500"} fontSize={"sm"}> ALL </Text>
                            {teamGamesData ? teamGamesData.map((game) => 
                                                        <Game 
                                                            key={game.pk}
                                                            pk={game.pk}
                                                            date={game.date}
                                                            team={game.team}
                                                            vsteam={game.vsteam}
                                                            team_score={game.team_score}
                                                            vsteam_score={game.vsteam_score}
                                                            />) : null}
                        </VStack>
                        <Empty />
                    </TabPanel>
                    <TabPanel p={0}>
                        <VStack alignItems={"flex-start"} px={3} mt={8} as="form" onSubmit={handleSubmit(onSubmit)}>
                            <FormControl>
                                    <FormLabel fontWeight={"bold"} color={"main.500"} fontSize={"md"} > 상대팀 선택하기 </FormLabel>
                                    {/* <Select placeholder="Choose a vsteam" onChange={handleVSteamChange}> */}
                                    <Select {...register("vsteam", {required:true})} placeholder="상대팀을 선택하세요">
                                        {teamVSteamsData?.vsteams.map((vsteam, index) => <option key={index} value={vsteam}>{vsteam}</option>)}
                                    </Select>
                            </FormControl>
                            <Button type="submit" isLoading={teamStatsRelativeMutation.isLoading} size={"md"} width="100%" backgroundColor={"main.500"} color={"white"}> 상대전적 확인하기 </Button>
                        </VStack>
                        {currentVSteam && !teamGamesRelativeMutation.isLoading && !teamStatsRelativeMutation.isLoading ? (
                            <>
                                <VStack alignItems={"flex-start"} padding={"5"}>
                                    <Text fontSize={"xl"} as="b"> VS {currentVSteam} </Text>
                                </VStack>
                                <VStack alignItems={"flex-start"} px={3} mt={8}>
                                    <Text as="b" color={"main.500"} fontSize={"md"}> 경기 </Text>
                                    <Divider />
                                    <HStack width={"100%"} justifyContent={"space-between"}>
                                        <Text as="b" fontSize={"sm"}> TOTAL </Text>
                                        <Text as="b" fontSize={"sm"}> {teamVSteamGames ? teamVSteamGames.length : "0"} 경기 </Text>
                                    </HStack>
                                </VStack>
                                <SmallDivider />
                                <VStack alignItems={"flex-start"} px={3} mt={8}>
                                    <Text as="b" color={"main.500"} fontSize={"md"}> 전적 </Text>
                                    <Divider />
                                    <HStack width={"100%"} justifyContent={"space-between"}>
                                        <Text as="b" fontSize={"sm"}> TOTAL </Text>
                                        <Text as="b" fontSize={"sm"}> 
                                            {teamStatsRelative ? teamStatsRelative.win : "0"} 승 {teamStatsRelative ? teamStatsRelative.draw : "0"} 무 {teamStatsRelative ? teamStatsRelative.lose : "0"} 패 {teamStatsRelative ? teamStatsRelative.not : "0"} N </Text>
                                    </HStack>
                                    <Divider />
                                    <HStack width={"100%"} justifyContent={"space-between"}>
                                        <Text fontSize={"sm"}> 승률 </Text>
                                        <CircularProgress size={"65px"} thickness={"5px"} value={teamStatsRelative && teamVSteamGames && teamVSteamGames.length !==0 ? Number(((teamStatsRelative.win/teamVSteamGames.length)*100).toFixed(1)) : 0} color='main.500'>
                                             <CircularProgressLabel fontSize={"xs"}>{teamStatsRelative && teamVSteamGames && teamVSteamGames.length !==0 ? ((teamStatsRelative.win/teamVSteamGames.length)*100).toFixed(1) : "0"}%</CircularProgressLabel>
                                        </CircularProgress>
                                    </HStack>
                                </VStack>
                                <SmallDivider />
                                <VStack alignItems={"flex-start"} px={3} mt={8}>
                                    <Text as="b" color={"main.500"} fontSize={"md"}> 골 </Text>
                                    <Divider />
                                    <HStack width={"100%"} justifyContent={"space-between"}>
                                        <Text as="b" fontSize={"md"}> 총 득점 </Text>
                                        <Text as="b" fontSize={"sm"}> {teamGoalsRelative ? teamGoalsRelative.goals : "0"} 골 </Text>
                                    </HStack>
                                    <Divider />
                                    <HStack width={"100%"} justifyContent={"space-between"}>
                                        <Text fontSize={"sm"}> 경기 당 골 </Text>
                                        <Text fontSize={"sm"}> 
                                            {teamGoalsRelative && teamVSteamGames && teamVSteamGames.length !==0 ? (teamGoalsRelative.goals/teamVSteamGames.length).toFixed(1) : "0"} 골</Text>
                                    </HStack>
                                    <Divider />
                                    <HStack width={"100%"} justifyContent={"space-between"}>
                                        <Text as="b" fontSize={"md"}> 총 실점 </Text>
                                        <Text as="b" fontSize={"sm"}> {teamGoalsAgainstRelative ? teamGoalsAgainstRelative.goals : "0"} 골 </Text>
                                    </HStack>
                                    <Divider />
                                    <HStack width={"100%"} justifyContent={"space-between"}>
                                        <Text fontSize={"sm"}> 경기 당 실점 </Text>
                                        <Text fontSize={"sm"}> 
                                            {teamGoalsAgainstRelative && teamVSteamGames && teamVSteamGames.length !==0 ? (teamGoalsAgainstRelative.goals/teamVSteamGames.length).toFixed(1) : "0"} 골</Text>
                                    </HStack>
                                </VStack>
                                <BigDivider />
                                <VStack alignItems={"flex-start"} px={3} spacing={5}>
                                    <Text as="b" color={"main.500"} fontSize={"sm"}> ALL </Text>
                                    {teamVSteamGames ? teamVSteamGames.map((game) => 
                                                                <Game 
                                                                    key={game.pk}
                                                                    pk={game.pk}
                                                                    date={game.date}
                                                                    team={game.team}
                                                                    vsteam={game.vsteam}
                                                                    team_score={game.team_score}
                                                                    vsteam_score={game.vsteam_score}
                                                                    />) : null}
                                    
                                </VStack>
                            </>
                        ) : null}
                        <Empty />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </ProtectedPage>
    )
}