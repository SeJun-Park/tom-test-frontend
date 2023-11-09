import { Box, Button, Divider, HStack, Input, InputGroup, InputLeftElement, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaFutbol } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getTeamsRecently, searchTeam } from "../api";
import Empty from "../components/Empty";
import Team from "../components/Team";
import { ITeam, ITinyTeam } from "../types";

interface ISearchTeamFrom {
    name : string
}

export default function SearchTeam() {

    const { isLoading : teamsRecentlyLoading, data : teamsRecentlyData, isError : teamsRecentlyError } = useQuery<ITeam[]>(["teamsRecently"], getTeamsRecently);

    const { register, handleSubmit, formState : {errors}, reset : searchTeamFormReset } = useForm<ISearchTeamFrom>();
    const navigate = useNavigate();
    const toast = useToast();

    const [ team, setTeam ] = useState<string>("");
    const [ teams, setTeams ] = useState<ITinyTeam[]>([]);

    const searchTeamMutation = useMutation(searchTeam, {
        onSuccess : (data) => {
            setTeams(data)
            toast({
                title : "팀 검색 성공",
                status : "success",
                duration : 1000
            });
        }
    })

    const onSubmit = ({ name } : ISearchTeamFrom) => {
        setTeam(name)
        searchTeamMutation.mutate({ name });
        searchTeamFormReset();
    }

    const onClickBack = () => {
        navigate(-1)
    }

    return (
        <>
            <Helmet>
                <title>삼오엠 | 팀 찾기</title>
            </Helmet>
            <HStack height={20} px={5}>
                <Button variant={"unstyled"} onClick={onClickBack}>
                    <FaArrowLeft />
                </Button>
            </HStack>
            <VStack as="form" onSubmit={handleSubmit(onSubmit)} p={10} mt={10}>
                <InputGroup>
                            <InputLeftElement children={
                                <Box color={"gray.500"}>
                                    <FaFutbol />
                                </Box>
                        }/>
                            <Input {...register("name", { required : "팀 이름을 입력해주세요." })} isInvalid={Boolean(errors.name?.message)} required placeholder="팀 이름을 입력하세요" variant={"filled"}/>
                </InputGroup>
                {searchTeamMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> Something is wrong </Text>) : null}
                <Button isLoading={searchTeamMutation.isLoading} type="submit" backgroundColor={"main.500"} color={"white"} width={"100%"} marginTop={1} variant={"solid"}> 검색하기 </Button>
            </VStack>
            {team && !searchTeamMutation.isLoading ? (
                <>
                        {teams.length !==0 ? teams.map((team, index) => (
                            <VStack key={index} alignItems={"flex-start"} px={3} spacing={3} mt={8}>
                                <Team 
                                    pk={team.pk}
                                    avatar={team.avatar}
                                    name={team.name}
                                />
                            </VStack>
                        )) : 
                        <VStack>
                            <Text> 검색 결과가 없습니다. </Text>
                        </VStack>
                        }
                    <Empty />
                </>
            ) : null}
            <VStack alignItems={"flex-start"} px={5} pt={20}>
                <Text as="b" color={"main.500"} fontSize={"md"}> 새로 올라온 팀 </Text>
                <Divider />
            </VStack>
            <VStack alignItems={"flex-start"} px={5} spacing={3} my={5}>
                {teamsRecentlyData?.map((team) => 
                    <Team  pk={team.pk} avatar={team.avatar} name={team.name} />
                )}
            </VStack>
            <Empty />
            <Empty />
        </>
    )
}