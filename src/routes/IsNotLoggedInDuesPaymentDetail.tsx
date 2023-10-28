import { Button, Card, CardBody, HStack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaCheckCircle, FaDotCircle, FaMinusCircle, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getTeam, getTeamDuesPayment, getTeamDuesPaymentItems } from "../api";
import DuesPaymentItem from "../components/DuesPaymentItem";
import Empty from "../components/Empty";
import { IDuesPayment, IDuesPaymentItem, ITeam } from "../types";

export default function IsNotLoggedInDuesPaymentDetail() {

    const { teamPk, paymentPk } = useParams();

    const { isLoading : teamLoading, data : teamData, isError : teamError } = useQuery<ITeam>(["team", teamPk], getTeam);
    const { isLoading : duesPaymentLoading, data : duesPaymentData, isError : duesPaymentError } = useQuery<IDuesPayment>(["duesPayment", teamPk, paymentPk], getTeamDuesPayment);
    const { isLoading : duesPaymentItemsLoading, data : duesPaymentItemsData, isError : duesPaymentItemsError } = useQuery<IDuesPaymentItem[]>(["duesPaymentItems", teamPk, paymentPk], getTeamDuesPaymentItems);

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
                <VStack alignItems={"flex-start"} padding={"5"} mb={2}>
                    <Text fontSize={"xl"} as="b"> {teamData && teamData.name} </Text>
                    <Text fontSize={"xl"} as="b"> "{duesPaymentData?.title}" 회비 납부 현황 </Text>
                </VStack>
                {duesPaymentData?.memo && (
                                            <VStack>
                                                <Card width={"90%"} textAlign={"center"}>
                                                    <CardBody>
                                                        <Text fontSize={"sm"}>{duesPaymentData.memo}</Text>
                                                    </CardBody>
                                                </Card>
                                            </VStack>
                                        )}
                <HStack justifyContent={"space-evenly"} padding={10} pb={0}>
                    <HStack>
                        <FaToggleOn size={22} color={"green"} />
                        <Text> 납부 </Text>
                    </HStack>
                    <HStack>
                        <FaToggleOff size={22} color={"gray"} />
                        <Text> 미납 </Text>
                    </HStack>
                    <HStack>
                        <FaDotCircle size={15} color={"black"} />
                        <Text> 면제 </Text>
                    </HStack>
                </HStack>
                <HStack justifyContent={"space-between"} padding={5} mt={5}>
                    <Text as="b" color={"main.500"} fontSize={"md"} > 납부 현황 </Text>
                </HStack>
                <VStack padding={5}>
                    {duesPaymentItemsData && duesPaymentItemsData.length !== 0 ? duesPaymentItemsData.map((duesPaymentItem, index) => 
                                                                                                            <DuesPaymentItem 
                                                                                                            key={index}
                                                                                                            id={duesPaymentItem.id}
                                                                                                            backnumber={duesPaymentItem.player.backnumber}
                                                                                                            avatar={duesPaymentItem.player.avatar}
                                                                                                            name={duesPaymentItem.player.name}
                                                                                                            payment={duesPaymentItem.payment}
                                                                                                            is_spvsr={false}                                                                                                        
                                                                                                            />
                                                                                                            ) : <Text> 비어 있습니다. </Text>}
                </VStack>
                <Empty />
        </>
            )
}