import { Box, Button, Input, InputGroup, InputLeftElement, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { FaFutbol, FaStream } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { teamRegister } from "../api";

interface ISpvsrTeamRegisterForm {
    name : string;
    since : number;
    description? : string
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
                status : "success"
            });
            queryClient.refetchQueries(["isSpvsr"])
            queryClient.refetchQueries(["isSpvsrTeam"])
            queryClient.refetchQueries(["isSpvsrGames"])
        }
    })

    const onSubmit = ({ name, since, description } : ISpvsrTeamRegisterForm) => {
        teamRegisterMutation.mutate({ name, since, description });
        TeamRegisterFormReset();
    }

    return (
        <>
            <Helmet>
                <title>"3OM | TeamRegister"</title>
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
                                    <FaFutbol />
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
                            <Input type={"text"} {...register("description")} maxLength={20} isInvalid={Boolean(errors.description?.message)} placeholder="설명을 입력해보세요 (선택, 20자 이내)" variant={"flushed"}/>
                </InputGroup>
                {teamRegisterMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> Team name is already exist </Text>) : null}
                <Button isLoading={teamRegisterMutation.isLoading} type="submit"  backgroundColor={"main.500"} color={"white"} width={"100%"} marginTop={4} variant={"unstyled"}> 팀 등록하기 </Button>
            </VStack>
        </>
    )
}