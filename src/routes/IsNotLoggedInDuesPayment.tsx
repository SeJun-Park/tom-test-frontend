import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getTeamDuesPaymentList, getTeamReadOnly } from "../api";
import DuesPaymentList from "../components/DuesPaymentList";
import { IDuesPayment, ITeam } from "../types";

export default function IsNotLoggedInDuesPayment() {

    const { teamPk } = useParams();

    const { isLoading : teamLoading, data : teamData, isError : teamError } = useQuery<ITeam>(["teamReadOnly", teamPk], getTeamReadOnly);
    const { isLoading : teamDuesPaymentsLoading, data : teamDuesPaymentsData, isError : teamDuesPaymentsError } = useQuery<IDuesPayment[]>(["teamDuesPayments", teamPk], getTeamDuesPaymentList);

    const navigate = useNavigate();

    const onClickBack = () => {
        navigate(-1)
    }

    return (
        <>
            <Helmet>
                <title>{teamData ? `${teamData.name}의 회비 납부 현황` : "Loading..."}</title>
            </Helmet>
            <HStack justifyContent={"space-between"} height={20} px={5}>
                <Button variant={"unstyled"} onClick={onClickBack}>
                    <FaArrowLeft />
                </Button>
            </HStack>
            <VStack alignItems={"flex-start"} padding={"5"} mb={10}>
                <Text fontSize={"xl"} as="b"> {teamData && teamData.name} </Text>
                <Text fontSize={"xl"} as="b"> 회비 납부 현황 </Text>
            </VStack>
            <VStack>
                {teamDuesPaymentsData && teamDuesPaymentsData.length !==0 ? teamDuesPaymentsData.map((duesPayment, index) => <DuesPaymentList
                                                                                                                        key={index}
                                                                                                                        teamPk={teamPk ? teamPk : ""}
                                                                                                                        pk={duesPayment.id} 
                                                                                                                        title={duesPayment.title}
                                                                                                                        />) : <Text>비어 있습니다.</Text>}
            </VStack>
        </>
    )
}