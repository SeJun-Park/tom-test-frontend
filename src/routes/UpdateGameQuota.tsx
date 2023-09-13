import { Box, Button, Center, Divider, FormControl, FormLabel, Grid, HStack, Image, Select, Spinner, Text, Textarea, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { gameQuotaUpdate, getGame, getGameQuota, isSpvsr } from "../api";
import { formationState } from "../atoms";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import FormationPlayer from "../components/FormationPlayer";
import ProtectedPage from "../components/ProtectedPage";
import SmallDivider from "../components/SmallDivider";
import SpvsrOnlyPage from "../components/SpvsrOnlyPage";
import useUser from "../lib/useUser";
import { Formation, IGame, IGameQuota, ISpvsrUser } from "../types";

interface IUpdateGameQuotaForm {
    formation : string,
    memo? : string
}

export default function UpdateGameQuota() {

    const { gamePk, quotaPk } = useParams();

    const { user } = useUser();

    const { isLoading : spvsrLoading, data : spvsrData, isError : spvsrError } = useQuery<ISpvsrUser>(["isSpvsr"], isSpvsr);
    const { isLoading : gameLoading, data : gameData, isError : gameError } = useQuery<IGame>(["game", gamePk], getGame);
    const { isLoading : gameQuotaLoading, data : gameQuotaData, isError : gameQuotaError } = useQuery<IGameQuota>(["gameQuota", gamePk, quotaPk], getGameQuota);

    const toast = useToast();

    const { register, handleSubmit, formState : {errors}, reset : uploadGameQuotaFormReset } = useForm<IUpdateGameQuotaForm>();

    const [ formation, setFormation ] = useState<Formation | string>('');

    const updateGameQuotaMutation = useMutation(gameQuotaUpdate, {
        onSuccess : (data) => {
            toast({
                title : "쿼터 수정 성공",
                status : "success"
            });
            navigate(-1)
        }
    })

    const onSubmit = ({ formation, memo } : IUpdateGameQuotaForm) => {

        if (lineups.length < 11) {
            toast({
                title : "11명의 선수를 모두 선택해야 합니다.",
                status : "error"
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

    const getFormationImage = (formation: Formation | string) => {
        switch (formation) {
            case '4-2-3-1':
                return "https://imagedelivery.net/SbAhiipQhJYzfniSqnZDWw/16eef5b5-5cf9-4cd6-7066-c12620fd5600/public";
            case '4-4-2':
                return null;
            // ... 다른 포메이션에 대한 이미지 반환 ...
            default:
                return null;
        }
    }
      

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [ lineups, setLineups ] = useState<number[]>([]);

    const plusBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const value = Number(event.currentTarget.value);

        // lineups 배열에 값이 이미 존재하는지 확인
        if (lineups.includes(value)) {
            toast({
                title : "이미 선택된 선수입니다.",
                status : "error"
            });
            return;
        }

        // lineups의 길이가 11을 초과하는지 확인
        if (lineups.length >= 11) {
            toast({
                title : "11명까지 선택할 수 있습니다.",
                status : "error"
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
                status : "error"
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
        if (spvsrData?.team.name !== gameData?.team.name) {
            navigate("/");
        }

        if (gameData) {
            if(gameData.participants.length < 11) {
                navigate(-1)
            }
        }
    }, [spvsrData, gameData]);

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
                                                    <Image 
                                                        src={getFormationImage(formation) || undefined} 
                                                        alt="Formation" 
                                                        maxWidth="100%"
                                                    />
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
                                                    {gameData?.participants.sort((a, b) => a.backnumber - b.backnumber).map((participant) => 
                                                    <HStack width={"100%"} px={3} key={participant.pk}>
                                                        <Button onClick={plusBtnClick} value={participant.pk} size={"sm"} color={"main.500"} variant={"unstyled"}>
                                                            <FaPlus />
                                                        </Button>
                                                        <Text fontSize={"xs"}>{`${participant.backnumber}.`} </Text>
                                                        <Text fontSize={"sm"}>{`${participant.name}`} </Text>
                                                    </HStack>
                                                    )}
                                                    </Grid>
                                                </VStack>
                                                <SmallDivider />
                                                <Empty />
                                                <Text as="b" mb={5}> 
                                                    {lineups.length}명이 선택되었습니다.
                                                </Text>
                                                <VStack spacing={4} justifyContent={"flex-start"} alignItems={"flex-start"} mt={5}>
                                                    <Grid templateColumns={"1fr 1fr"} gap={5}>
                                                    {lineups?.map((player, index) => 
                                                                                    <HStack>
                                                                                        <Box
                                                                                            w="36px"   // 원하는 크기에 따라 조절하세요.
                                                                                            h="36px"   // 원하는 크기에 따라 조절하세요.
                                                                                            borderRadius="full"
                                                                                            display="flex"
                                                                                            alignItems="center"
                                                                                            justifyContent="center"
                                                                                            // backgroundColor="white"   // 필요한 배경색으로 설정하세요.
                                                                                            border="2px"   // Avatar와 유사한 테두리를 원하면 추가하세요.
                                                                                            // borderColor="gray.200"   // 원하는 테두리 색상으로 변경하세요.
                                                                                            color="main.500"
                                                                                        >
                                                                                            <Text as="b" color={"main.500"} fontSize={"md"}>{index+1}</Text>
                                                                                        </Box>
                                                                                        <FormationPlayer key={index} playerPk={player} />
                                                                                        <Button value={player} onClick={minusBtnClick} size={"sm"} color={"black"} variant={"unstyled"}>
                                                                                            <FaMinus />
                                                                                        </Button>
                                                                                    </HStack>
                                                    )}
                                                    </Grid>
                                                </VStack>
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