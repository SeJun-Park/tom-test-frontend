import { Box, Button, HStack, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaShare } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getTeam, getTeamDuesDetailList, isSpvsr } from "../api";
import DuesDetailAddModal from "../components/DuesDetailAddModal";
import DuesDetailList from "../components/DuesDetailList";
import Empty from "../components/Empty";
import KakaoADSmall from "../components/KakaoADSmall";
import { IDuesDetail, ISpvsrUser, ITeam } from "../types";

export default function IsSpvsrDuesDetails() {

    const { teamPk } = useParams();

    const { isLoading : spvsrLoading, data : spvsrData, isError : spvsrError } = useQuery<ISpvsrUser>(["isSpvsr"], isSpvsr);
    const { isLoading : teamLoading, data : teamData, isError : teamError } = useQuery<ITeam>(["team", teamPk], getTeam);
    const { isLoading : teamDuesDetailsLoading, data : teamDuesDetailsData, isError : teamDuesDetailsError } = useQuery<IDuesDetail[]>(["teamDuesDetails", teamPk], getTeamDuesDetailList);

    const navigate = useNavigate();

    const onClickBack = () => {
        navigate(-1)
    }


    const { isOpen : isDuesDetailAddOpen, onOpen : onDuesDetailAddOpen, onClose : onDuesDetailAddClose } = useDisclosure()


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
                <Box>
                        {spvsrData?.team.name === teamData?.name ? 
                                                                <>
                                                                    <Button onClick={onDuesDetailAddOpen} backgroundColor={"point.500"} color={"black"} size={"sm"}> + 추가하기 </Button>
                                                                    <DuesDetailAddModal isOpen={isDuesDetailAddOpen} onClose={onDuesDetailAddClose} />
                                                                </>
                                                                    : null}
                        
                </Box>
            </VStack>
            <VStack>
                {teamDuesDetailsData && teamDuesDetailsData.length !==0 ? teamDuesDetailsData?.map((duesDetail, index) => <DuesDetailList
                                                                                                                    key={index}
                                                                                                                    teamPk={teamPk ? teamPk : ""}
                                                                                                                    pk={duesDetail.id}
                                                                                                                    title={duesDetail.title}
                                                                                                                    />) : <Text>비어 있습니다.</Text>}
            </VStack>
            <VStack>
                <Box w="320px" h="50px" mt={16} borderWidth={1}>
                        <KakaoADSmall />
                </Box>
            </VStack>
            <Empty />
            <Empty />
        </>
    )
}