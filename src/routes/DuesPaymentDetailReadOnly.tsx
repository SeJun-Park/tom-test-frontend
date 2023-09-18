import { Box, Button, Card, CardBody, HStack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaDotCircle, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getTeam, getTeamDuesPayment, getTeamDuesPaymentItems, getTeamReadOnly } from "../api";
import DuesPaymentItem from "../components/DuesPaymentItem";
import Empty from "../components/Empty";
import KakaoADBig from "../components/KakaoADBig";
import KakaoADSmall from "../components/KakaoADSmall";
import { IDuesPayment, IDuesPaymentItem, ITeam } from "../types";

export default function DuesPaymentDetailReadOnly() {

    const { teamPk, paymentPk } = useParams();

    const { isLoading : teamLoading, data : teamData, isError : teamError } = useQuery<ITeam>(["teamReadOnly", teamPk], getTeamReadOnly);
    const { isLoading : duesPaymentLoading, data : duesPaymentData, isError : duesPaymentError } = useQuery<IDuesPayment>(["duesPayment", teamPk, paymentPk], getTeamDuesPayment);
    const { isLoading : duesPaymentItemsLoading, data : duesPaymentItemsData, isError : duesPaymentItemsError } = useQuery<IDuesPaymentItem[]>(["duesPaymentItems", teamPk, paymentPk], getTeamDuesPaymentItems);

    return (
        <>
            <Helmet>
                <title>{teamData ? `${teamData.name}의 회비 납부 현황` : "Loading..."}</title>
            </Helmet>
            <HStack justifyContent={"center"} height={20} px={5}>
                <Text as="b" color="gray" fontSize={"xs"}>*본 페이지는 읽기 전용 페이지입니다.</Text>
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
                <VStack>
                    <Box w="320px" h="100px" mt={8}>
                            <KakaoADBig />
                    </Box>
                </VStack>
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
                <VStack mt={2}>
                    <Box w="320px" h="50px">
                            <KakaoADSmall />
                    </Box>
                </VStack>
                <Empty />
                <Empty />
        </>
            )
}