import { Box, Button, HStack, Input, InputGroup, InputLeftElement, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaFutbol } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { searchTeam } from "../api";
import Empty from "../components/Empty";
import ProtectedPage from "../components/ProtectedPage";
import Team from "../components/Team";
import { ITinyTeam } from "../types";

interface ISearchTeamFrom {
    name : string
}

export default function SearchTeam() {
    const { register, handleSubmit, formState : {errors}, reset : searchTeamFormReset } = useForm<ISearchTeamFrom>();
    const navigate = useNavigate();
    const toast = useToast();

    const [ team, setTeam ] = useState<string>("");
    const [ teams, setTeams ] = useState<ITinyTeam[]>([]);

    const searchTeamMutation = useMutation(searchTeam, {
        onSuccess : (data) => {
            setTeams(data)
            // toast({
            //     title : "team search success.",
            //     status : "success"
            // });
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
        <ProtectedPage>
            <Helmet>
                <title>"3OM | SearchTeam"</title>
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
                            <Input {...register("name", { required : "팀 이름을 입력해주세요." })} isInvalid={Boolean(errors.name?.message)} required placeholder="Team Name" variant={"filled"}/>
                </InputGroup>
                {searchTeamMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> Something is wrong </Text>) : null}
                <Button isLoading={searchTeamMutation.isLoading} type="submit"  color={"main.500"} width={"100%"} marginTop={4} variant={"unstyled"}> Search </Button>
            </VStack>
            {team && !searchTeamMutation.isLoading ? (
                <>
                    <VStack alignItems={"flex-start"} px={3} spacing={3} mt={8}>
                        {teams?.map((team) => (
                            <Team 
                                key={team.pk}
                                pk={team.pk}
                                avatar={team.avatar}
                                name={team.name}
                            />
                        ))}
                    </VStack>
                    <Empty />
                </>
            ) : null}
        </ProtectedPage>
    )
}