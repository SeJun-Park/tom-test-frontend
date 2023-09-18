import { Box, Button, Card, CardBody, HStack, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaDotCircle, FaEllipsisV, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getTeam, getTeamDuesPayment, getTeamDuesPaymentItems, isSpvsr } from "../api";
import { duesPaymentDetailShareImageState } from "../atoms";
import Capture from "../components/Capture";
import CaptureButton from "../components/CaptureButton";
import DuesPaymentDeleteModal from "../components/DuesPaymentDeleteModal";
import DuesPaymentItem from "../components/DuesPaymentItem";
import DuesPaymentItemAddModal from "../components/DuesPaymentItemAddModal";
import DuesPaymentUpdateModal from "../components/DuesPaymentUpdateModal";
import Empty from "../components/Empty";
import KakaoADBig from "../components/KakaoADBig";
import KakaoADSmall from "../components/KakaoADSmall";
import KakaoShare from "../components/KakaoShare";
import { IDuesPayment, IDuesPaymentItem, ISpvsrUser, ITeam } from "../types";

export default function IsSpvsrDuesPaymentDetail() {

    const { teamPk, paymentPk } = useParams();

    const { isLoading : teamLoading, data : teamData, isError : teamError } = useQuery<ITeam>(["team", teamPk], getTeam);
    const { isLoading : spvsrLoading, data : spvsrData, isError : spvsrError } = useQuery<ISpvsrUser>(["isSpvsr"], isSpvsr); 
    const { isLoading : duesPaymentLoading, data : duesPaymentData, isError : duesPaymentError } = useQuery<IDuesPayment>(["duesPayment", teamPk, paymentPk], getTeamDuesPayment);
    const { isLoading : duesPaymentItemsLoading, data : duesPaymentItemsData, isError : duesPaymentItemsError } = useQuery<IDuesPaymentItem[]>(["duesPaymentItems", teamPk, paymentPk], getTeamDuesPaymentItems);

    const navigate = useNavigate();

    const onClickBack = () => {
        navigate(-1)
    }

    const { isOpen : isDeleteOpen, onOpen : onDeleteOpen, onClose : onDeleteClose } = useDisclosure()
    const { isOpen : isUpdateOpen, onOpen : onUpdateOpen, onClose : onUpdateClose } = useDisclosure()
    const { isOpen : isAddOpen, onOpen : onAddOpen, onClose : onAddClose } = useDisclosure()

    const shareImage = useRecoilValue(duesPaymentDetailShareImageState)

    return (
        <>
            <Helmet>
                <title>{teamData ? `${teamData.name}의 회비 납부 현황` : "Loading..."}</title>
            </Helmet>
            <HStack justifyContent={"space-between"} height={20} px={5}>
                <Button variant={"unstyled"} onClick={onClickBack}>
                    <FaArrowLeft />
                </Button>
                {spvsrData?.team.name === teamData?.name && 
                                                            <Menu>
                                                                <MenuButton marginRight={1}>
                                                                    {/* <Avatar size={"md"} name={user?.name} src={user?.avatar} /> */}
                                                                    <FaEllipsisV />
                                                                </MenuButton>
                                                                <MenuList>
                                                                    <MenuItem onClick={onUpdateOpen}> 수정하기 </MenuItem>
                                                                    <MenuItem onClick={onDeleteOpen}> 삭제하기 </MenuItem>
                                                                </MenuList>
                                                                <DuesPaymentUpdateModal isOpen={isUpdateOpen} onClose={onUpdateClose} />
                                                                <DuesPaymentDeleteModal isOpen={isDeleteOpen} onClose={onDeleteClose} />
                                                            </Menu>}
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
            <VStack mt={8}>
                <Box w="320px" h="100px">
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
                {spvsrData?.team.name === teamData?.name && <Button onClick={onAddOpen} backgroundColor={"main.500"} color={"white"} size={"xs"}> + 항목 추가하기 </Button>}
                <DuesPaymentItemAddModal isOpen={isAddOpen} onClose={onAddClose} />
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
                                                                                                        is_spvsr={spvsrData && teamData && (spvsrData.team.name === teamData.name) ? true : false}                                                                                                        
                                                                                                        />
                                                                                                        ) : <Text> 비어 있습니다. </Text>}
            </VStack>
            <KakaoShare 
                title={`${teamData?.name} 회비 납부 현황`}
                description={`회비 제목 : ${duesPaymentData?.title}`}
                imageUrl={shareImage}
                mobileWebUrl={`https://www.3manofthematch.com/teams/${teamPk}/dues/payment/${paymentPk}/readonly`}
                webUrl={`https://www.3manofthematch.com/teams/${teamPk}/dues/payment/${paymentPk}/readonly`}
                btnTitle={"보러 가기"}
            />
            <VStack mt={8}>
                <Box w="320px" h="50px">
                        <KakaoADSmall />
                </Box>
            </VStack>
            <Empty />
            <Empty />
        </>
            )
}