import { Box, Button, HStack, Input, InputGroup, InputLeftElement, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { FaFutbol, FaStream, FaCheck, FaKey, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { teamRegister } from "../api";
import Empty from "../components/Empty";
import SpvsrOnlyPage from "../components/SpvsrOnlyPage";

interface ISpvsrTeamRegisterForm {
    name : string;
    since : number;
    description? : string;
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
                title : "team register success.",
                status : "success",
                duration : 1000
            });
            navigate("/")
            queryClient.refetchQueries(["isSpvsr"])
            queryClient.refetchQueries(["isSpvsrTeams"])
        }
    })

    const onSubmit = ({ name, since, description } : ISpvsrTeamRegisterForm) => {
        teamRegisterMutation.mutate({ name, since, description });
        TeamRegisterFormReset();
    }

    const onClickBack = () => {
        navigate(-1)
    }

    return (
        <SpvsrOnlyPage>
            <Helmet>
                <title>3OM | TeamRegister</title>
            </Helmet>
            <HStack justifyContent={"space-between"} height={20} px={5}>
                <Button variant={"unstyled"} onClick={onClickBack}>
                    <FaArrowLeft />
                </Button>
            </HStack>
            <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={2} p={10} mt={50}>
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
                {teamRegisterMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> 같은 팀 이름이 존재합니다. </Text>) : null}
                <Button isLoading={teamRegisterMutation.isLoading} type="submit"  backgroundColor={"main.500"} color={"white"} width={"100%"} marginTop={4} variant={"unstyled"}> 팀 등록하기 </Button>
            </VStack>
            <Empty />
            <Empty />
            <Empty />
            <Empty />
        </SpvsrOnlyPage>
    )
}