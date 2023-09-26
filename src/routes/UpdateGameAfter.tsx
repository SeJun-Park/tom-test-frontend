import { Box, Button, Checkbox, Divider, FormControl, FormHelperText, FormLabel, HStack, Input, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaMinus, FaPlus  } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { gameUpdate, getGame, getTeam } from "../api";
import Empty from "../components/Empty";
import GoalPlayer from "../components/GoalPlayer";
import ProtectedPage from "../components/ProtectedPage";
import { IGame, ITeam } from "../types";

interface UpdateGameAfterProps {
    teamPk : number
}

interface IUpdateGameForm {
    vsteam : string,
    team_score : number,
    vsteam_score : number,
    location : string,
    start_time : string,
    end_time : string,
    participants : number[]
}

export default function UpdateGameAfter( props : UpdateGameAfterProps ) {

    const { gamePk } = useParams();

    const { isLoading : gameLoading, data : gameData, isError : gameError } = useQuery<IGame>(["game", gamePk], getGame);

    const { isLoading : teamLoading, data : teamData, isError : teamError } = useQuery<ITeam>(["team", props.teamPk], getTeam);

    const { watch, register, handleSubmit, formState : {errors}, reset : updateGameFormReset } = useForm<IUpdateGameForm>();
    console.log(watch())
    const navigate = useNavigate();
    const toast = useToast();


    let initialGoals : number[] = []
    if (gameData) {
        initialGoals = gameData.goals.map(goalPlayer => goalPlayer.player.pk);
    }
    

    const [ goals, setGoals ] = useState<number[]>(initialGoals);

    const plusBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const value = Number(event.currentTarget.value);
        setGoals(prevGoals => [...prevGoals, value]);
    }

    const minusBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const value = Number(event.currentTarget.value);
        const index = goals.indexOf(value);
        if (index !== -1) {
        // 값이 존재하면 해당 요소를 제거
            const updatedGoals = [...goals];
            updatedGoals.splice(index, 1);
            setGoals(updatedGoals);
        }
    }

    const updateGameMutation = useMutation(gameUpdate, {
        onSuccess : (data) => {
            toast({
                title : "경기 수정 성공",
                status : "success",
                duration : 1000
            });
            navigate(-1)
        }
    })


    const onSubmit = ( { vsteam, team_score, vsteam_score, location, start_time, end_time, participants } : IUpdateGameForm) => {

        if (!Array.isArray(participants)) {
            participants = [participants];
        }

        if ( gamePk && gameData) {
            updateGameMutation.mutate({gamePk, vsteam, team_score, vsteam_score, location, start_time, end_time, participants, goals})
        }

    }

    const onClickBack = () => {
        navigate(-1)
    }

    return (
        <ProtectedPage>
            <Helmet>
                <title>{ gameData ? (`삼오엠 | ${gameData.team.name} vs ${gameData.vsteam} 업데이트`) : "Loading.." }</title>
            </Helmet>
            <HStack height={20} px={5}>
                <Button variant={"unstyled"} onClick={onClickBack}>
                    <FaArrowLeft />
                </Button>
            </HStack>
            <VStack alignItems={"flex-start"} padding={"5"}>
                <Text fontSize={"xl"} as="b"> 경기 수정하기 </Text>
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
                    <Input {...register("vsteam", { required : true})} defaultValue={gameData?.vsteam} px={1} type={"text"} isInvalid={Boolean(errors.vsteam?.message)} required placeholder="" variant={"flushed"}/>
                    <FormHelperText fontSize={"xs"}>
                      정확히 입력하면 상대 전적을 확인할 수 있습니다.
                    </FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel>
                        우리팀 스코어
                    </FormLabel>
                    <Input {...register("team_score", { required : true})} defaultValue={gameData?.team_score} type={"number"} min={0} isInvalid={Boolean(errors.team_score?.message)} placeholder="" variant={"filled"}/>

                </FormControl>
                <FormControl>
                    <FormLabel>
                        상대팀 스코어
                    </FormLabel>
                    <Input {...register("vsteam_score", { required : true})} defaultValue={gameData?.vsteam_score} type={"number"} min={0} isInvalid={Boolean(errors.vsteam_score?.message)} placeholder="" variant={"filled"}/>

                </FormControl>
                <FormControl>
                    <FormLabel>
                        장소
                    </FormLabel>
                    <Input {...register("location", { required : true})} defaultValue={gameData?.location} type={"text"} px={1} isInvalid={Boolean(errors.location?.message)} placeholder="" variant={"flushed"}/>

                </FormControl>
                <FormControl>
                    <FormLabel> 
                        날짜
                    </FormLabel>
                    <Input defaultValue={gameData?.date} isReadOnly={true} color={"gray.400"} type={"text"} px={1}  placeholder="" variant={"flushed"} />
                    <FormHelperText fontSize={"xs"}> 날짜와 시간은 등록 이후 수정할 수 없습니다. </FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel mb={5}>
                        시작 시간
                    </FormLabel>
                    <Input {...register("start_time", { required : true})} isReadOnly={true} color={"gray.400"} defaultValue={gameData?.start_time} type={"time"} step="1800" placeholder="" variant={"flushed"} />

                </FormControl>
                <FormControl>
                    <FormLabel mb={5}>
                        종료 시간
                    </FormLabel>
                    <Input {...register("end_time", { required : true})} isReadOnly={true} color={"gray.400"} defaultValue={gameData?.end_time} type={"time"} step="1800" placeholder="" variant={"flushed"} />

                </FormControl>
                <FormControl>
                    <FormLabel my={5}> 
                        Line-ups 
                    </FormLabel>
                    {gameData?.participants?.sort((a, b) => a.backnumber - b.backnumber).map((participant) => {

                                                        return (
                                                            <Box key={participant.pk}>
                                                            <Checkbox
                                                                {...register("participants", { required: true })}
                                                                defaultChecked={true} // defaultChecked prop을 사용하여 체크 여부 설정
                                                                value={participant.pk}
                                                                my={1}
                                                                isReadOnly={true}
                                                                color={"gray.400"}
                                                                
                                                            >
                                                                {participant.backnumber}. {participant.name}
                                                            </Checkbox>
                                                            </Box>
                                                        );
                                                        })}
                    <FormHelperText mt={5} fontSize={"xs"}> *라인업은 경기 종료 시간 이후 수정 불가합니다. </FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel my={5}> 
                        골 넣은 선수 
                    </FormLabel>
                    <VStack alignItems={"flex-start"}> 
                        {gameData?.participants.sort((a, b) => a.backnumber - b.backnumber).map((participant) => 
                                                                    <HStack width={"100%"} px={3} key={participant.pk}>
                                                                        <Button onClick={plusBtnClick} value={participant.pk} size={"sm"} color={"main.500"} variant={"unstyled"}>
                                                                            <FaPlus />
                                                                        </Button>
                                                                        <Text fontSize={"sm"}>{`${participant.backnumber}.${participant.name}`} </Text>
                                                                    </HStack>
                                                                            )}
                    
                    </VStack>
                </FormControl>
                <Divider />
                <VStack spacing={4} px={7} justifyContent={"flex-start"} alignItems={"flex-start"}>
                    {goals?.map((goalplayer, index) => 
                                                    <HStack key={index}>
                                                        <GoalPlayer playerPk={goalplayer} />
                                                        <Button value={goalplayer} onClick={minusBtnClick} size={"sm"} color={"black"} variant={"unstyled"}>
                                                            <FaMinus />
                                                        </Button>
                                                    </HStack>    
                                                    )}
                    
                </VStack>
                <Divider />
                <Empty />
                {updateGameMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> Something is wrong </Text>) : null}
                <Button isLoading={updateGameMutation.isLoading} type="submit" backgroundColor={"main.500"} color={"white"} width={"100%"} marginTop={4} variant={"solid"}> 수정하기 </Button>
            </VStack>
            <Empty />
        </ProtectedPage>
    )
}