import { Box, Button, Card, CardBody, Divider, HStack, Menu, MenuButton, MenuItem, MenuList, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaEllipsisV } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getTeam, getTeamDuesDetail, getTeamDuesInAmount, getTeamDuesInItems, getTeamDuesOutAmount, getTeamDuesOutItems, isSpvsr } from "../api";
import CarryOverAddModal from "../components/CarryOverAddModal";
import DuesDetailDeleteModal from "../components/DuesDetailDeleteModal";
import DuesDetailUpdateModal from "../components/DuesDetailUpdateModal";
import DuesInItemAddModal from "../components/DuesInItemAddModal";
import DuesOutItemAddModal from "../components/DuesOutItemAddModal";
import { IAmount, IDuesDetail, IDuesInItem, IDuesOutItem, ISpvsrUser, ITeam } from "../types";
import DuesInItem from "../components/DuesInItem";
import DuesOutItem from "../components/DuesOutItem";
import CaptureButton from "../components/CaptureButton";
import Empty from "../components/Empty";
import Capture from "../components/Capture";

export default function IsSpvsrDuesDetailsDetail() {

    const { teamPk, detailPk } = useParams();

    const { isLoading : teamLoading, data : teamData, isError : teamError } = useQuery<ITeam>(["team", teamPk], getTeam);
    const { isLoading : spvsrLoading, data : spvsrData, isError : spvsrError } = useQuery<ISpvsrUser>(["isSpvsr"], isSpvsr); 
    const { isLoading : duesDetailLoading, data : duesDetailData, isError : duesDetailError } = useQuery<IDuesDetail>(["duesDetail", teamPk, detailPk], getTeamDuesDetail);
    const { isLoading : duesInItemsLoading, data : duesInItemsData, isError : duesInItemsError } = useQuery<IDuesInItem[]>(["duesInItems", teamPk, detailPk], getTeamDuesInItems);
    const { isLoading : duesOutItemsLoading, data : duesOutItemsData, isError : duesOutItemsError } = useQuery<IDuesOutItem[]>(["duesOutItems", teamPk, detailPk], getTeamDuesOutItems);
    const { isLoading : duesInAmountLoading, data : duesInAmountData, isError : duesInAmountError } = useQuery<IAmount>(["duesInAmount", teamPk, detailPk], getTeamDuesInAmount);
    const { isLoading : duesOutAmountLoading, data : duesOutAmountData, isError : duesOutAmountError } = useQuery<IAmount>(["duesOutAmount", teamPk, detailPk], getTeamDuesOutAmount);
 
    const navigate = useNavigate();

    const onClickBack = () => {
        navigate(-1)
    }

    const { isOpen : isCarryOverOpen, onOpen : onCarryOverOpen, onClose : onCarryOverClose } = useDisclosure()
    const { isOpen : isDeleteOpen, onOpen : onDeleteOpen, onClose : onDeleteClose } = useDisclosure()
    const { isOpen : isUpdateOpen, onOpen : onUpdateOpen, onClose : onUpdateClose } = useDisclosure()
    const { isOpen : isDuesInAddOpen, onOpen : onDuesInAddOpen, onClose : onDuesInAddClose } = useDisclosure()
    const { isOpen : isDuesOutAddOpen, onOpen : onDuesOutAddOpen, onClose : onDuesOutAddClose } = useDisclosure()

    return (
        <>
            <Helmet>
                <title>{teamData ? `${teamData.name}의 회비 사용 내역` : "Loading..."}</title>
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
                                                                <DuesDetailUpdateModal isOpen={isUpdateOpen} onClose={onUpdateClose} />
                                                                <DuesDetailDeleteModal isOpen={isDeleteOpen} onClose={onDeleteClose} />
                                                            </Menu>}
            </HStack>
            <VStack alignItems={"flex-start"} padding={"5"} mb={2}>
                <Text fontSize={"xl"} as="b"> {teamData && teamData.name} </Text>
                <Text fontSize={"xl"} as="b"> "{duesDetailData?.title}" 회비 사용 내역 </Text>
            </VStack>
            {duesDetailData?.memo && (
                        <VStack>
                            <Card width={"90%"} textAlign={"center"}>
                                <CardBody>
                                    <Text fontSize={"sm"}>{duesDetailData.memo}</Text>
                                </CardBody>
                            </Card>
                        </VStack>
                    )}
            <Tabs isLazy align={"center"} variant='soft-rounded' my={8}>
                <TabList mb='1em'>
                    <Tab _selected={{color : "white", bg : "main.500"}}> 최종 내역 </Tab>
                    <Tab _selected={{color : "black", bg : "point.500"}}> 입금 내역 </Tab>
                    <Tab _selected={{color : "white", bg : "black"}}> 지출 내역 </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel p={"0"}>
                        <VStack padding={5}>
                            <Text as="b" color={"main.500"} fontSize={"md"}>총 회비 잔액 (A+B-C) </Text>
                            <Text as="b" fontSize={"xl"}>{duesDetailData?.carry_over && duesInAmountData && duesOutAmountData && (duesDetailData.carry_over + duesInAmountData.amount - duesOutAmountData.amount).toLocaleString("ko-kr")} 원</Text>
                        </VStack>
                        <Divider />
                        <VStack alignItems={"flex-start"} padding={10} spacing={5}>
                            <Text as="b" color={"main.500"} fontSize={"md"}>이월 금액 (A) </Text>
                            <Text fontSize={"md"}>{duesDetailData ? duesDetailData.carry_over.toLocaleString("ko-kr") : "0"} 원</Text>
                            {spvsrData?.team.name === teamData?.name  ? <>
                                                                            <Button onClick={onCarryOverOpen} backgroundColor={"main.500"} color={"white"} size={"md"}>입력하기</Button>
                                                                            <CarryOverAddModal isOpen={isCarryOverOpen} onClose={onCarryOverClose} />
                                                                        </>
                                                                            : null}
                            <Divider />
                            <Text as="b" color={"main.500"} fontSize={"md"}>총 입금액 (B) </Text>
                            <Text fontSize={"md"}>{duesInAmountData?.amount.toLocaleString("ko-kr")} 원</Text>
                            <Divider />
                            <Text as="b" color={"main.500"} fontSize={"md"}>총 지출액 (C) </Text>
                            <Text fontSize={"md"}>{duesOutAmountData?.amount.toLocaleString("ko-kr")} 원</Text>
                            <Divider />
                        </VStack>
    
                    </TabPanel>
                    <TabPanel p={"0"}>
                        <VStack padding={5}>
                            <Text as="b" color={"main.500"} fontSize={"md"}>총 입금액 </Text>
                            <Text as="b" fontSize={"xl"}>+ {duesInAmountData?.amount.toLocaleString("ko-kr")} 원</Text>
                        </VStack>
                        {/* <DuesItemEx /> */}
                        <Divider />
                        <VStack alignItems={"flex-start"} padding={3}>
                            <Text as="b" color={"main.500"} fontSize={"md"} > 입금 내역 </Text>
                        </VStack>
                        {spvsrData?.team.name === teamData?.name ?          
                                                                            <>
                                                                            <Button onClick={onDuesInAddOpen} my={5} backgroundColor={"point.500"} color={"black"} size={"xs"}> + 입금 내역 추가하기 </Button>
                                                                            <DuesInItemAddModal isOpen={isDuesInAddOpen} onClose={onDuesInAddClose} />
                                                                            </>
                                                                            // onClick={onOpen} 
                                                                                : null}
                            {duesInItemsData && duesInItemsData.length !== 0 ? duesInItemsData.map((duesInItem, index) => 
                                                                                                                <DuesInItem 
                                                                                                                key={index}
                                                                                                                id={duesInItem.id}
                                                                                                                title={duesInItem.title}
                                                                                                                date={duesInItem.date}
                                                                                                                amount={duesInItem.amount}
                                                                                                                note={duesInItem.note}
                                                                                                                is_spvsr={spvsrData && teamData && (spvsrData.team.name === teamData.name) ? true : false}
                                                                                                                />
                                                                                                                    ): <Text>내역이 없습니다.</Text>}
                   
                    </TabPanel>
                    <TabPanel p={"0"}>
                        <VStack padding={5}>
                            <Text as="b" color={"main.500"} fontSize={"md"}>총 지출액 </Text>
                            <Text as="b" fontSize={"xl"}>- {duesOutAmountData?.amount.toLocaleString("ko-kr")} 원</Text>
                        </VStack>
                        {/* <DuesItemEx /> */}
                        <Divider />
                        <VStack alignItems={"flex-start"} padding={3}>
                            <Text as="b" color={"main.500"} fontSize={"md"} > 지출 내역 </Text>
                        </VStack>
                        {spvsrData?.team.name === teamData?.name ? 
                                                                            <>
                                                                            <Button onClick={onDuesOutAddOpen} my={5} backgroundColor={"black"} color={"white"} size={"xs"}> + 지출 내역 추가하기 </Button>
                                                                            <DuesOutItemAddModal isOpen={isDuesOutAddOpen} onClose={onDuesOutAddClose} />
                                                                            </>
                                                                            // onClick={onOpen} 
                                                                                : null}
                            {duesOutItemsData && duesOutItemsData.length !== 0 ? duesOutItemsData.map((duesOutItem, index) => 
                                                                                                                    <DuesOutItem 
                                                                                                                    key={index}
                                                                                                                    id={duesOutItem.id}
                                                                                                                    title={duesOutItem.title}
                                                                                                                    date={duesOutItem.date}
                                                                                                                    amount={duesOutItem.amount}
                                                                                                                    note={duesOutItem.note}
                                                                                                                    is_spvsr={spvsrData && teamData && (spvsrData.team.name === teamData.name) ? true : false}
                                                                                                                    />
                                                                                                                        ): <Text>내역이 없습니다.</Text>}
                        
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <Empty />
            <Capture />
        </>
    );
}