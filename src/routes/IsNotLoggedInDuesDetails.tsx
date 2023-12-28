import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getTeamDuesDetailList, getTeamReadOnly } from "../api";
import DuesDetailList from "../components/DuesDetailList";
import { IDuesDetail, ITeam } from "../types";

export default function IsNotLoggedInDuesDetails() {

    const { teamPk } = useParams();

    const { isLoading : teamLoading, data : teamData, isError : teamError } = useQuery<ITeam>(["teamReadOnly", teamPk], getTeamReadOnly);
    const { isLoading : teamDuesDetailsLoading, data : teamDuesDetailsData, isError : teamDuesDetailsError } = useQuery<IDuesDetail[]>(["teamDuesDetails", teamPk], getTeamDuesDetailList);

    const navigate = useNavigate();

    const onClickBack = () => {
        navigate(-1)
    }


    return (
        <>
            <Helmet>
                <title>{teamData ? `${teamData.name}의 회비 사용 내역` : "Loading..."}</title>
            </Helmet>
            <HStack justifyContent={"space-between"} height={20} px={5}>
                <Button variant={"unstyled"} onClick={onClickBack}>
                    <FaArrowLeft />
                </Button>
            </HStack>
            <VStack alignItems={"flex-start"} padding={"5"} mb={10}>
                <Text fontSize={"xl"} as="b"> {teamData && teamData.name} </Text>
                <Text fontSize={"xl"} as="b"> 회비 사용 내역 </Text>
            </VStack>
            <VStack>
                {teamDuesDetailsData && teamDuesDetailsData.length !==0 ? teamDuesDetailsData?.map((duesDetail, index) => <DuesDetailList
                                                                                                                    key={index}
                                                                                                                    teamPk={teamPk ? teamPk : ""}
                                                                                                                    pk={duesDetail.id}
                                                                                                                    title={duesDetail.title}
                                                                                                                    />) : <Text>비어 있습니다.</Text>}
            </VStack>
        </>
    )
}