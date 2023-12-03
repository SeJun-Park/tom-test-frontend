import { Box, Button, Checkbox, FormControl, FormHelperText, FormLabel, HStack, Input, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Calendar from "react-calendar";
import { useForm } from "react-hook-form";
import { FaArrowLeft  } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { gameUpload, getTeam, getTeamPlayers } from "../api";
import Empty from "../components/Empty";
import ProtectedPage from "../components/ProtectedPage";
import { ITeam, ITinyPlayer } from "../types";
import "../calender.css";
import useUser from "../lib/useUser";
import { Helmet } from "react-helmet";
import SpvsrOnlyPage from "../components/SpvsrOnlyPage";

interface IUploadGameForm {
    vsteam : string,
    location : string,
    start_time : string,
    end_time : string,
    participants : number[],
}

export default function UploadGame() {

    const { teamPk } = useParams();
    const { user } = useUser();

    const { isLoading : teamLoading, data : teamData, isError : teamError } = useQuery<ITeam>(["team", teamPk], getTeam);
    const { isLoading : teamPlayersLoading, data : teamPlayersData, isError : teamPlayersError } = useQuery<ITinyPlayer[]>(["teamPlayers", teamPk], getTeamPlayers);

    const { watch, register, setValue, handleSubmit, formState : {errors}, reset : uploadGameFormReset } = useForm<IUploadGameForm>();
    console.log(watch())
    const navigate = useNavigate();
    const toast = useToast();

    const [ date, setDate ] = useState<string | undefined>();
    const [dateError, setDateError] = useState<string | undefined>();

    const uploadGameMutation = useMutation(gameUpload, {
        onSuccess : (data) => {
            toast({
                title : "경기 업로드 성공",
                status : "success",
                duration : 1000
            });
            navigate(-1)
        },
        onError: (error) => {
            // 오류 처리 로직
            if (error instanceof Error) {
                toast({
                    title: "업로드 실패",
                    description: error.message,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            } else {
                // 일반적인 오류 처리
                toast({
                    title: "업로드 실패",
                    description: "알 수 없는 오류가 발생했습니다.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            }
        },
    })

    const handleDateChange = (date : any) => {
        const offset = date.getTimezoneOffset() * 60 * 1000; // 클라이언트의 타임존 오프셋 (분 단위)을 계산합니다.
        const koreanTime = new Date(date.getTime() - offset); // 클라이언트의 로컬 시간에서 타임존 오프셋을 뺀 한국 시간을 계산합니다.
        const formattedDate = koreanTime.toISOString().split("T")[0]; // 한국 시간을 ISO 8601 형식으로 변환합니다.
      
        setDate(formattedDate);
        setDateError(undefined);
        console.log(formattedDate);
      };

    const onSubmit = ( { vsteam, location, start_time, end_time, participants } : IUploadGameForm) => {

        if (!date) { // 날짜가 선택되지 않았을 경우
            setDateError("날짜를 선택해주세요."); // 날짜가 없을 때 오류 설정
            return;
        }

        if (!Array.isArray(participants)) {
            participants = [participants];
        }

        if (date && teamPk) {
            const team = teamPk
            uploadGameMutation.mutate({teamPk, team, vsteam, location, date, start_time, end_time, participants})
        }
    }

    const onClickBack = () => {
        navigate(-1)
    }

    if (!teamData?.is_spvsr) {
        navigate("/")
    }

    return (
        <ProtectedPage>
            <SpvsrOnlyPage>
                <Helmet>
                    <title>{ teamData ? (`삼오엠 | ${teamData.name} 경기 등록`) : "Loading.." }</title>
                </Helmet>
                <HStack height={20} px={5}>
                    <Button variant={"unstyled"} onClick={onClickBack}>
                        <FaArrowLeft />
                    </Button>
                </HStack>
                <VStack alignItems={"flex-start"} padding={"5"}>
                    <Text fontSize={"xl"} as="b"> 경기 업로드 </Text>
                </VStack>
                <VStack as="form" onSubmit={handleSubmit(onSubmit)} p={10} spacing={6}>
                    <FormControl mb={5}>
                        <FormLabel>
                            우리팀
                        </FormLabel>
                        <Input type={"text"} isReadOnly value={teamData?.pk} px={1} required placeholder={teamData?.name} variant={"flushed"} color={"gray.400"}/>
                    </FormControl>
                    <FormControl mb={5}>
                        <FormLabel>
                            상대팀
                        </FormLabel>
                        <Input {...register("vsteam", { required : true})} px={1} type={"text"} isInvalid={Boolean(errors.vsteam?.message)} required placeholder="" variant={"flushed"}/>
                        <FormHelperText fontSize={"xs"}>
                        정확히 입력하면 상대 전적을 확인할 수 있습니다.
                        </FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            장소
                        </FormLabel>
                        <Input {...register("location", { required : true})} type={"text"} px={1} isInvalid={Boolean(errors.location?.message)} placeholder="" variant={"flushed"}/>

                    </FormControl>
                    <FormControl isInvalid={!!dateError}>
                        <FormLabel> 
                            날짜 
                        </FormLabel>
                        <Box my={6}>
                            <Calendar onChange={handleDateChange} prev2Label={null} next2Label={null} minDetail="month" maxDate={new Date(Date.now() + (60*60*24*7*4*6*1000))} formatDay={(locale, date) => date.toLocaleString("en", {day : "numeric"})} />
                        </Box>
                        {dateError && (
                                <Text color="red.500" fontSize="sm">{dateError}</Text>
                            )}
                        <FormHelperText fontSize={"xs"}> 날짜와 시간은 필수로 선택해야 합니다. </FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel mb={5}>
                            시작 시간
                        </FormLabel>
                        <Input {...register("start_time", { required : true })} type={"time"} step="1800" isInvalid={Boolean(errors.start_time?.message)} placeholder="" variant={"flushed"} />

                    </FormControl>
                    <FormControl>
                        <FormLabel mb={5}>
                            종료 시간
                        </FormLabel>
                        <Input {...register("end_time", { required : true })} type={"time"} step="1800" isInvalid={Boolean(errors.end_time?.message)} placeholder="" variant={"flushed"} />

                    </FormControl>
                    <FormControl>
                        <FormLabel my={5}> 
                            Line-ups 
                        </FormLabel>
                        {teamPlayersData?.map((player) => (
                            <Box key={player.pk}>
                                <Checkbox {...register("participants", {required:true})} value={player.pk} my={1}> {player.backnumber}. {player.name} </Checkbox>
                            </Box>
                        ))}
                        <FormHelperText mt={5} fontSize={"xs"}> *라인업은 최소 1명 이상 선택해야 합니다. </FormHelperText>
                        <FormHelperText mt={5} fontSize={"xs"}> *라인업은 경기 종료 시간 이후 수정 불가합니다. </FormHelperText>
                        <FormHelperText fontSize={"xs"}> *스코어는 경기 종료 시간 이후 등록 가능합니다. </FormHelperText>
                        <FormHelperText fontSize={"xs"}> *골 넣은 선수는 경기 종료 시간 이후 등록 가능합니다. </FormHelperText>
                    </FormControl>
                    <Empty />
                    {uploadGameMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> Something is wrong </Text>) : null}
                    <Button isLoading={uploadGameMutation.isLoading} type="submit"  color={"main.500"} width={"100%"} marginTop={4} variant={"unstyled"}> Upload </Button>
                </VStack>
                <Empty />
            </SpvsrOnlyPage>
        </ProtectedPage>
    )
}