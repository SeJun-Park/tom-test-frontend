import { Box, Button, Center, Divider, Grid, HStack, Image, Input, Select, Text, Textarea, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getGame, isSpvsr } from "../api";
import { formationState } from "../atoms";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import FormationPlayer from "../components/FormationPlayer";
import FFTpreview from "../components/formations/FFTpreview";
import FTTOpreview from "../components/formations/FTTOpreview";
import TFTpreview from "../components/formations/TFTpreview";
import GameQuotaUploadModal from "../components/GameQuotaUploadModal";
import ProtectedPage from "../components/ProtectedPage";
import SmallDivider from "../components/SmallDivider";
import SpvsrOnlyPage from "../components/SpvsrOnlyPage";
import useUser from "../lib/useUser";
import { Formation, IGame, ISpvsrUser } from "../types";

export default function UploadGameQuotas() {

    const { gamePk } = useParams();
    const { user } = useUser();

    const { isLoading : spvsrLoading, data : spvsrData, isError : spvsrError } = useQuery<ISpvsrUser>(["isSpvsr"], isSpvsr);
    const { isLoading : gameLoading, data : gameData, isError : gameError } = useQuery<IGame>(["game", gamePk], getGame);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const toast = useToast();

    const [step, setStep] = useState<number>(1);  // 현재 단계
    const [numQuotas, setNumQuotas] = useState<number>(1);  // 생성할 GameQuota의 수
    const [quotasData, setQuotasData] = useState<any[]>([]);  // 각 GameQuota의 데이터를 저장할 배열

    const formationArray = useRecoilValue(formationState)

    const onStep1InputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setNumQuotas(Number(event.target.value))
    }

    const increase = () => {
        setNumQuotas((prev) => Math.min(prev + 1, 8));
    };

    const decrease = () => {
        setNumQuotas((prev) => Math.max(prev - 1, 1));
    };

    const onStep1BtnClick = () => {
        if (numQuotas >= 1 && numQuotas <= 8) {
            // 정상 범위에 있을 경우, 다음 단계로 진행
            setStep(2);  // 예를 들어 다음 단계를 나타내는 값이 2라고 가정
            setQuotasData(new Array(numQuotas).fill(null).map(() => ({formation: '', lineups: [], memo: '' })));
          } else {
            // 범위 외의 값을 입력했을 때 사용자에게 경고
            alert("쿼터 수는 1~8까지의 정수만 입력 가능합니다.");
          }
    }

    const onSelectChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        updateFormation(step-2, event.target.value)
    }

    const updateFormation = (index: number, value: string) => {
        const newData = [...quotasData];
        newData[index].formation = value;
        setQuotasData(newData);
    }

    const updateOrder = (index: number, value: number) => {
        const newData = [...quotasData];
        newData[index].order = value;
        setQuotasData(newData);
    }

    const onStep2BtnClick = () => {

        if (lineups.length !== 11) {
            toast({
                title : "11명의 선수를 모두 선택해야 합니다.",
                status : "error",
                duration : 1000
            });
            return;
        }

        updateLineups(step-2, lineups);
        setLineups([]);
        // updateLineups
        setStep((prev) => prev + 1);  // 예를 들어 다음 단계를 나타내는 값이 2라고 가정
        console.log(quotasData)
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

    const updateLineups = (index: number, value: number[]) => {
        const newData = [...quotasData];
        newData[index].lineups = value;
        setQuotasData(newData);
    }

    const updateMemo = (index: number, value: string) => {
        const newData = [...quotasData];
        newData[index].memo = value;
        setQuotasData(newData);
    }

    const onTextareaChange = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        updateMemo(step-2, event.target.value)
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
        updateLineups(step-2, lineups);
        setLineups([]);
        onUploadOpen();
      };

    const navigate = useNavigate();

    const onClickBack = () => {
        navigate(-1)
    }

    if (spvsrData?.team.name !== gameData?.team.name) {
        navigate("/")
    }


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

            { step === 1 &&
                <VStack padding={5} spacing={3}>
                    <Text fontSize={"lg"} as="b" color={"main.500"}> 쿼터 수를 입력하세요 </Text>
                    <VStack spacing={0}>
                        <Text fontSize={"xs"} color={"gray.500"}>*쿼터 수는 수정이 불가하니 신중하게 등록해주세요!</Text>
                        <Text fontSize={"xs"} color={"gray.500"}>*용병이 있는 경우 이전 화면에서 먼저 추가하고 진행해주세요.</Text>
                    </VStack>
                    <HStack>
                        <Button size={"sm"} onClick={decrease}>-</Button>
                        <Input type="number" min={1} max={8} step={1} value={numQuotas} onChange={onStep1InputChange} />
                        <Button size={"sm"} onClick={increase}>+</Button>
                    </HStack>
                    <Button onClick={onStep1BtnClick} backgroundColor={"main.500"} color={"white"} width={"100%"}>시작하기</Button>
                    <Empty />
                    <Empty />
                    <Empty />
                    <Empty />
                    <Empty />
                    <Empty />
                    <Empty />
                    <Empty />
                </VStack>
            }

            { step > 1 && step <= numQuotas + 1 &&
                <VStack padding={5} mb={20}>
                    <Text as="b" color={"main.500"} fontSize={"md"}>{step-1} 쿼터</Text>
                    <Select value={quotasData[step-2].formation} onChange={onSelectChange}>
                        <option value="" disabled>포메이션을 선택하세요</option>
                        {formationArray.map((formation) => <option>{formation}</option>)}
                        {/* ... 포메이션 옵션 ... */}
                    </Select>
                    {quotasData[step-2].formation !== '' &&
                                                            <>
                                                                <Text fontSize={"xs"} color={"gray.500"}>*1번부터 11번까지 순서대로 선수를 등록하세요!</Text>
                                                                <Center width={"100%"} mt={5}>
                                                                    {quotasData[step-2].formation === '4-2-3-1' && <FTTOpreview lineups={lineups}/>}
                                                                    {quotasData[step-2].formation === '4-4-2' && <FFTpreview lineups={lineups}/>}
                                                                    {quotasData[step-2].formation === '3-5-2' && <TFTpreview lineups={lineups}/>}
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
                                                                <Empty />
                                                                <BigDivider />
                                                                <Text my={5}> 
                                                                    {step-1}쿼터 메모
                                                                </Text>
                                                                <Textarea onChange={onTextareaChange} placeholder={"선택"} />
                                                                <Divider />
                                                                <Empty />
                                                            </>
                                                            
                    }
                    {/* ... 선수 선택 로직 ... */}
                    {step === numQuotas + 1 ?   
                                                <>
                                                    <Button onClick={handleUploadOpen} backgroundColor={"point.500"} color={"black"} width={"100%"} mt={5}>
                                                        완료하기
                                                    </Button>
                                                    <GameQuotaUploadModal quotasData={quotasData} isOpen={isUploadOpen} onClose={onUploadClose} /> 
                                                </>
                                                : 
                                                <Button onClick={onStep2BtnClick} backgroundColor={"main.500"} color={"white"} mt={5}>
                                                    다음
                                                </Button>}
                </VStack>
            }

            </SpvsrOnlyPage>
        </ProtectedPage>
    )
}