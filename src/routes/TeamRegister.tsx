import { Box, Button, Input, InputGroup, InputLeftElement, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { FaFutbol, FaStream, FaCheck, FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { teamRegister } from "../api";

interface ISpvsrTeamRegisterForm {
    name : string;
    since : number;
    description? : string;
    code : number;
}

export default function TeamRegister() {
    const { register, handleSubmit, formState : {errors}, reset : TeamRegisterFormReset } = useForm<ISpvsrTeamRegisterForm>();
    const navigate = useNavigate();
    const toast = useToast();
    const queryClient = useQueryClient()

    const teamRegisterMutation = useMutation(teamRegister, {
        onSuccess : () => {
            console.log("team register mutation success");
            toast({
                title : "팀 등록 성공",
                status : "success",
                duration : 1000
            });
            queryClient.refetchQueries(["isSpvsr"])
            queryClient.refetchQueries(["isSpvsrTeam"])
            queryClient.refetchQueries(["isSpvsrGames"])
        }
    })

    const onSubmit = ({ name, since, description, code } : ISpvsrTeamRegisterForm) => {
        teamRegisterMutation.mutate({ name, since, description, code });
        TeamRegisterFormReset();
    }

    return (
        <>
            <Helmet>
                <title>3OM | TeamRegister</title>
            </Helmet>
            <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={2} p={10} mt={100}>
                <InputGroup>
                            <InputLeftElement children={
                                <Box color={"gray.500"}>
                                    <FaFutbol />
                                </Box>
                        }/>
                            <Input type={"text"} {...register("name", { required : "팀 이름을 입력해주세요." })} isInvalid={Boolean(errors.name?.message)} required placeholder="팀 이름을 입력하세요" variant={"flushed"}/>
                </InputGroup>
                <InputGroup>
                            <InputLeftElement children={
                                <Box color={"gray.500"}>
                                    <FaCheck />
                                </Box>
                        }/>
                            <Input type={"number"} {...register("since", { required : "창단 연도를 입력해주세요." })} isInvalid={Boolean(errors.since?.message)} required placeholder="창단 연도를 입력하세요" variant={"flushed"}/>
                </InputGroup>
                <InputGroup>
                            <InputLeftElement children={
                                <Box color={"gray.500"}>
                                    <FaStream />
                                </Box>
                        }/>
                            <Input type={"text"} {...register("description")} maxLength={20} isInvalid={Boolean(errors.description?.message)} placeholder="설명을 입력하세요 (선택, 20자 이내)" variant={"flushed"}/>
                </InputGroup>
                <InputGroup>
                            <InputLeftElement children={
                                <Box color={"gray.500"}>
                                    <FaKey />
                                </Box>
                        }/>
                            <Input type={"number"} min={0} {...register("code", { required : "팀 코드를 입력해주세요" })} isInvalid={Boolean(errors.since?.message)} required placeholder="팀 코드를 입력해주세요" variant={"flushed"}/>
                </InputGroup>
                <Text fontSize={"xs"} color={"gray"}>* 팀 코드는 플레이어가 연결 요청 시 비밀번호 역할을 합니다.</Text>
                {teamRegisterMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> 같은 팀 이름이 존재합니다. </Text>) : null}
                <Button isLoading={teamRegisterMutation.isLoading} type="submit"  backgroundColor={"main.500"} color={"white"} width={"100%"} marginTop={4} variant={"unstyled"}> 팀 등록하기 </Button>
            </VStack>
        </>
    )
}