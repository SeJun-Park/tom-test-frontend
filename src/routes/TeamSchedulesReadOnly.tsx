import { Box, Button, Card, CardBody, Divider, HStack, Select, Text, VStack } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { getTeamReadOnly, getTeamSchedulesByMonth, getTeamSchedulesMonth } from "../api";
import Empty from "../components/Empty";
import KakaoADBig from "../components/KakaoADBig";
import KakaoADSmall from "../components/KakaoADSmall";
import Schedule from "../components/Schedule";
import { ISchedule, ITinyTeam } from "../types";

export default function TeamSchedulesReadOnly() {

    const { teamPk } = useParams();

    const currentYearMonth = `${new Date().getFullYear()}년 ${(new Date().getMonth() + 1).toString().padStart(2, '0')}월`

    const { isLoading : teamLoading, data : teamData, isError : teamError } = useQuery<ITinyTeam>(["teamReadOnly", teamPk], getTeamReadOnly);
    const { isLoading : teamSchedulesMonthLoading, data : teamSchedulesMonthData, isError : teamSchedulesMonthError } = useQuery<string[]>(["teamSchedulesMonth", teamPk], getTeamSchedulesMonth, {
        onSuccess: (data) => {
            if (!data.includes(currentYearMonth)) {
                setTeamSchedulesMonth([currentYearMonth, ...data]);
            } else {
                // 기존 data 배열에서 currentYearMonth를 제거
                const filteredData = data.filter(item => item !== currentYearMonth);
                // currentYearMonth를 맨 앞에 추가
                setTeamSchedulesMonth([currentYearMonth, ...filteredData]);
            }
        }
    });

    const [ teamSchedulesMonth, setTeamSchedulesMonth ] = useState<string[]>();
    const [ selectedSchedulesDate, setSelectedSchedulesDate ] = useState<string>();
    const [ teamSchedulesByMonth, setTeamSchedulesByMonth ] = useState<ISchedule[]>();

    useEffect(() => {
        setSelectedSchedulesDate(currentYearMonth)

        const [ year, month ] = currentYearMonth.split('년 ').map((part, index) => index === 1 ? part.slice(0, -1) : part);
        if (teamPk) {
            teamSchedulesByMonthMutation.mutate({teamPk, year, month});
        }
    }, []);

    const teamSchedulesByMonthMutation = useMutation(getTeamSchedulesByMonth, 
        {
            onSuccess : (data) => {
                setTeamSchedulesByMonth(data)
            },
        }
    )

    const handleChangeSchedulesDate = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSchedulesDate(event.target.value);
        const [ year, month ] = event.target.value.split('년 ').map((part, index) => index === 1 ? part.slice(0, -1) : part);
        if(teamPk) {
            teamSchedulesByMonthMutation.mutate({teamPk, year, month})
        }
      };


    return (
        <>
            <Helmet>
                <title>{teamData ? `${teamData.name}의 회비 납부 현황` : "Loading..."}</title>
            </Helmet>
            <HStack justifyContent={"center"} height={20} px={5}>
                <Text as="b" color="gray" fontSize={"xs"}>*본 페이지는 읽기 전용 페이지입니다.</Text>
            </HStack>
            <VStack alignItems={"flex-start"} padding={"5"}>
                <Text fontSize={"xl"} as="b"> {teamData && teamData.name} 일정 </Text>
            </VStack>
            <VStack mt={5} mb={10}>
                <Box w="320px" h="100px">
                        <KakaoADBig />
                </Box>
            </VStack>
            <Select my={5} onChange={handleChangeSchedulesDate} value={selectedSchedulesDate}>
                {teamSchedulesMonth?.map((yearMonth) => <option key={yearMonth} value={yearMonth}>{yearMonth}</option>)}
            </Select>
            <VStack alignItems={"flex-start"} padding={"5"}>
                <Text as="b" color={"main.500"} fontSize={"xl"} > | {selectedSchedulesDate} </Text>
            </VStack>
            <Divider mb={5} />
            {/* <VStack alignItems={"flex-start"} px={3} spacing={4}>
                <Divider />
                <HStack>
                <Text as="b" fontSize={"sm"} > {teamData?.name} </Text>
                <Text as="b" color={"main.500"} fontSize={"sm"} > | {selectedSchedulesDate} 일정 </Text>
                </HStack>
                <Divider mb={5} />
            </VStack> */}
            <VStack spacing={5}>
                {teamData && teamSchedulesByMonth && teamSchedulesByMonth.length !== 0 ? teamSchedulesByMonth.map((schedule, index) => 
                                                                            <Schedule
                                                                            key={index}
                                                                            pk={schedule.id}
                                                                            avatar={teamData?.avatar}
                                                                            dateTime={schedule.dateTime}
                                                                            category={schedule.category}
                                                                            title={schedule.title}
                                                                            isspvsr={false}
                                                                            />)
                                                                                : <Text padding={5}>등록된 일정이 없습니다.</Text>}
            </VStack>
            <Empty />
            <VStack mt={16}>
                <Box w="320px" h="50px">
                        <KakaoADSmall />
                </Box>
            </VStack>
            <Empty />
        </>
    )
}