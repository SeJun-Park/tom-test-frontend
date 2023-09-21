import { Box, Button, Center, Divider, FormControl, FormLabel, Grid, HStack, Image, Select, Spinner, Text, Textarea, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { gameQuotaUpdate, getGame, getGameQuota } from "../api";
import { formationState } from "../atoms";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import FFTpreview from "../components/formations/FFTpreview";
import FTTOpreview from "../components/formations/FTTOpreview";
import TFTpreview from "../components/formations/TFTpreview";
import ProtectedPage from "../components/ProtectedPage";
import SpvsrOnlyPage from "../components/SpvsrOnlyPage";
import { Formation, IGame, IGameQuota } from "../types";

interface IUpdateGameQuotaForm {
    formation : string,
    memo? : string
}

export default function UpdateGameQuota() {

    const { gamePk, quotaPk } = useParams();

    const { isLoading : gameLoading, data : gameData, isError : gameError } = useQuery<IGame>(["game", gamePk], getGame);
    const { isLoading : gameQuotaLoading, data : gameQuotaData, isError : gameQuotaError } = useQuery<IGameQuota>(["gameQuota", gamePk, quotaPk], getGameQuota);

    const toast = useToast();

    const { register, handleSubmit, formState : {errors}, reset : uploadGameQuotaFormReset } = useForm<IUpdateGameQuotaForm>();

    const [ formation, setFormation ] = useState<Formation | string>('');

    const updateGameQuotaMutation = useMutation(gameQuotaUpdate, {
        onSuccess : (data) => {
            toast({
                title : "쿼터 수정 성공",
                status : "success",
                duration : 1000
            });
            navigate(-1)
        }
    })

    const onSubmit = ({ formation, memo } : IUpdateGameQuotaForm) => {

        if (lineups.length < 11) {
            toast({
                title : "11명의 선수를 모두 선택해야 합니다.",
                status : "error",
                duration : 1000
            });
          return;
        }

        console.log({ gamePk, quotaPk, formation, lineups, memo })

        if(gamePk && quotaPk){
            updateGameQuotaMutation.mutate({ gamePk, quotaPk, formation, lineups, memo })
        }
    }

    const formationArray = useRecoilValue(formationState)

    const onSelectChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setFormation(event.target.value)
    }
      

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [ lineups, setLineups ] = useState<number[]>([]);

    const plusBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const value = Number(event.currentTarget.value);

        // lineups 배열에 값이 이미 존재하는지 확인
        if (lineups.includes(value)) {
            toast({
                title : "이미 선택된 선수입니다.",
                status : "error",
                duration : 1000
            });
            return;
        }

        // lineups의 길이가 11을 초과하는지 확인
        if (lineups.length >= 11) {
            toast({
                title : "11명까지 선택할 수 있습니다.",
                status : "error",
                duration : 1000
            });
            return;
        }

        setLineups(prevLineups => [...prevLineups, value]);
    }

    const minusBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const value = Number(event.currentTarget.value);
        const index = lineups.indexOf(value);
        if (index !== -1) {
        // 값이 존재하면 해당 요소를 제거
            const updatedLineups = [...lineups];
            updatedLineups.splice(index, 1);
            setLineups(updatedLineups);
        }
    }

    const { isOpen : isUploadOpen, onOpen : onUploadOpen, onClose : onUploadClose } = useDisclosure();

    const handleUploadOpen = () => {
        if (lineups.length < 11) {
            toast({
                title : "11명의 선수를 모두 선택해야 합니다.",
                status : "error",
                duration : 1000
            });
          return;
        }
        onUploadOpen();
      };

    const navigate = useNavigate();

    const onClickBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        if (!gameData?.team.is_spvsr) {
            navigate("/");
        }

        if (gameData) {
            if(gameData.participants.length < 11) {
                navigate(-1)
            }
        }
    }, [gameData]);

    useEffect(() => {
        if(gameQuotaData) {
            setFormation(gameQuotaData.formation)
            setLineups(gameQuotaData.lineups.map(player => player.pk))
        }
    }, [gameQuotaData])

    return (
        <ProtectedPage>
            <SpvsrOnlyPage>
                <Helmet>
                    <title>{ gameData ? (`3OM | ${gameData.team.name} vs ${gameData.vsteam} 포메이션`) : "Loading.." }</title>
                </Helmet>
                <HStack height={20} px={5}>
                    <Button variant={"unstyled"} onClick={onClickBack}>
                        <FaArrowLeft />
                    </Button>
                </HStack>
                <VStack as="form" onSubmit={handleSubmit(onSubmit)} padding={5} mb={20}>
                    <Text as="b" color={"main.500"} fontSize={"md"}>쿼터 수정하기</Text>
                    <FormControl>
                        {gameQuotaLoading ? (
                                                <Spinner />  // 혹은 다른 로딩 인디케이터
                                            ) :
                            <Select {...register("formation", {required:true})} defaultValue={gameQuotaData ? gameQuotaData.formation : ""} onChange={onSelectChange}>
                                {formationArray.map((formation, index) => <option key={index} value={formation}>{formation}</option>)}
                            </Select>
                        }
                    </FormControl>
                        {formation !== '' &&
                                            <>
                                                <Text fontSize={"xs"} color={"gray.500"}>*1번부터 11번까지 순서대로 선수를 등록하세요!</Text>
                                                <Center width={"100%"} mt={5}>
                                                    {formation === '4-2-3-1' && <FTTOpreview lineups={lineups}/>}
                                                    {formation === '4-4-2' && <FFTpreview lineups={lineups}/>}
                                                    {formation === '3-5-2' && <TFTpreview lineups={lineups}/>}
                                                </Center>
                                                {lineups.length < 11 ? 
                                                                        <Text as="b" my={5}> 
                                                                            {lineups.length + 1}번 선수를 선택하세요
                                                                        </Text>
                                                                        :
                                                                        <Text as="b" my={5}> 
                                                                            선택 완료
                                                                        </Text>
                                                }
                                                
                                                <VStack alignItems={"flex-start"}> 
                                                    <Grid templateColumns={"1fr 1fr"} gap={5}>
                                                    {gameData?.participants.sort((a, b) => a.backnumber - b.backnumber).map((participant) => {
                                                                        const lineupIndex = lineups.indexOf(participant.pk);
                                                                        const isInLineup = lineupIndex !== -1;
                                                                    
                                                                        return (
                                                                            <HStack width={"100%"} key={participant.pk} spacing={2}>
                                                                                <Button onClick={isInLineup ? minusBtnClick : plusBtnClick} value={participant.pk} size={"xs"} color={isInLineup ? "black" : "main.500"} variant={"unstyled"}>
                                                                                    {isInLineup ? 
                                                                                    <Box 
                                                                                    display="flex"
                                                                                    alignItems="center"
                                                                                    justifyContent="center">
                                                                                        <FaMinus />
                                                                                    </Box> : <FaPlus />}
                                                                                </Button>
                                                                                {isInLineup ? 
                                                                                                    <Box
                                                                                                        w="24px"   // 원하는 크기에 따라 조절하세요.
                                                                                                        h="24px"   // 원하는 크기에 따라 조절하세요.
                                                                                                        borderRadius="full"
                                                                                                        display="flex"
                                                                                                        alignItems="center"
                                                                                                        justifyContent="center"
                                                                                                        // backgroundColor="white"   // 필요한 배경색으로 설정하세요.
                                                                                                        border="1px"   // Avatar와 유사한 테두리를 원하면 추가하세요.
                                                                                                        // borderColor="gray.200"   // 원하는 테두리 색상으로 변경하세요.
                                                                                                        color="main.500"

                                                                                                    >
                                                                                                        <Text as="b" color={"main.500"} fontSize={"sm"}>{lineupIndex + 1}</Text>
                                                                                                    </Box>
                                                                                                    :
                                                                                                    <Box
                                                                                                        w="24px"   // 원하는 크기에 따라 조절하세요.
                                                                                                        h="24px"   // 원하는 크기에 따라 조절하세요.
                                                                                                        borderRadius="full"
                                                                                                        display="flex"
                                                                                                        alignItems="center"
                                                                                                        justifyContent="center"
                                                                                                        // backgroundColor="white"   // 필요한 배경색으로 설정하세요.
                                                                                                        border="1px"   // Avatar와 유사한 테두리를 원하면 추가하세요.
                                                                                                        // borderColor="gray.200"   // 원하는 테두리 색상으로 변경하세요.
                                                                                                        color="gray"

                                                                                                    >
                                                                                                        <Text as="b" color={"gray"} fontSize={"sm"}>•</Text>
                                                                                                    </Box>
                                                                                                    }
                                                                                <Text fontSize={"xs"}>{`${participant.backnumber}.`}</Text>
                                                                                <Text fontSize={"sm"}>{`${participant.name}`}</Text>
                                                                            </HStack>
                                                                        );
                                                                    }
                                                                )}
                                                    </Grid>
                                                </VStack>
                                                <Empty />
                                                <Text as="b" mb={5}> 
                                                    {lineups.length}명이 선택되었습니다.
                                                </Text>
                                                <BigDivider />
                                                <FormControl>
                                                    <FormLabel as="b" color={"main.500"} fontSize={"md"}>
                                                        쿼터 메모
                                                    </FormLabel>
                                                    <Textarea {...register("memo")} defaultValue={gameQuotaData?.memo} placeholder={"선택"} />
                                                </FormControl>
                                                <Divider />
                                                <Empty />
                                            </>
                }
                    <Button type="submit" backgroundColor={"main.500"} color={"white"} width={"100%"} mt={5}>
                        쿼터 수정하기
                    </Button>
                </VStack>
            </SpvsrOnlyPage>
        </ProtectedPage>
    )
}