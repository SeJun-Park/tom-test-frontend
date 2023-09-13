import { Avatar, Badge, Box, Button, Card, CardBody, Divider, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaArrowRight, FaCamera, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { isSpvsr, isSpvsrTeam } from "../api";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import SmallDivider from "../components/SmallDivider";
import Team from "../components/Team";
import TeamPhotoDeleteModal from "../components/TeamPhotoDeleteModal";
import TeamPhotoUploadModal from "../components/TeamPhotoUploadModal";
import TeamUpdateModal from "../components/TeamUpdateModal";
import { ISpvsrUser, ITinyTeam } from "../types";

export default function SpvsrHome() {

    const { isLoading : spvsrLoading, data : spvsrData, isError : spvsrError } = useQuery<ISpvsrUser>(["isSpvsr"], isSpvsr); 
    const { isLoading : spvsrTeamLoading, data : spvsrTeamData, isError : spvsrTeamError } = useQuery<ITinyTeam>(["isSpvsrTeam"], isSpvsrTeam);
    
    const [tabIndex, setTabIndex] = useState(Number(localStorage.getItem('tabIndex')) || 0);

    useEffect(() => {
      localStorage.setItem('tabIndex', tabIndex.toString());
    }, [tabIndex]);

    const { isOpen : isOpen, onOpen : onOpen, onClose : onClose } = useDisclosure()
    const { isOpen : isPhotoOpen, onOpen : onPhotoOpen, onClose : onPhotoClose } = useDisclosure()
    const { isOpen : isPhotoDeleteOpen, onOpen : onPhotoDeleteOpen, onClose : onPhotoDeleteClose } = useDisclosure()

    return (
        <>
            <VStack alignItems={"flex-start"} padding={"5"}>
                <VStack position="relative" width="100%" height="125">
                        <Link to={"/community"}>
                            <Box position="absolute" top={0} left={0} right={0} bottom={0}>
                                <Box
                                backgroundImage="url(https://imagedelivery.net/SbAhiipQhJYzfniSqnZDWw/3e881f4e-0d99-4087-77a2-236600d78700/public)"
                                backgroundSize="cover"
                                backgroundPosition="center"
                                width="100%"
                                height="100%"
                                borderRadius="xl"
                                textAlign={"center"}
                                display={"flex"}
                                flexDirection={"column"}
                                justifyContent={"flex-end"}
                                alignItems={"end"}
                                padding={2}
                                >
                                    <HStack mr={2}>
                                        <Text fontSize="lg" color="white">
                                            COMMUNITY
                                        </Text>
                                        <Box color={"white"}>
                                            <FaArrowRight />
                                        </Box>
                                    </HStack>
                                </Box>
                            </Box>
                        </Link>
                    </VStack>
                <Empty />
                <HStack>
                    <Text fontSize={"xl"} as="b"> {spvsrData?.username} </Text> 
                    <Box justifyContent={"center"}>
                        <Badge ml={1} bg={"main.500"} color={"white"}> 관리자 </Badge>
                    </Box>
                </HStack>
            </VStack>
            <Tabs isFitted variant='enclosed' isLazy index={tabIndex} onChange={setTabIndex}>
                <TabList mb='1em'>
                    <Tab _selected={{color : "main.500"}}>나의 팀</Tab>
                    <Tab _selected={{color : "main.500"}}>팀 정보</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel p={"0"}>
                        <VStack alignItems={"flex-start"} px={3} spacing={3} mt={8}>
                        {spvsrTeamData && 
                                <Team  pk={spvsrTeamData.pk} avatar={spvsrTeamData.avatar} name={spvsrTeamData.name} />
                                }
                        </VStack>
                    </TabPanel>
                    <TabPanel p={"0"}>
                        <VStack spacing={5}>
                            <Text fontSize={"xl"} as="b" mt={3}> {spvsrTeamData?.name} </Text>
                            <HStack>
                                <Avatar src={spvsrTeamData ? spvsrTeamData.avatar : ""} size={"2xl"} />
                                { spvsrTeamData && 
                                                    spvsrTeamData.avatar ?
                                                                            <VStack justifyContent={"center"}>
                                                                                <Button onClick={onPhotoOpen} variant={"outline"} color={"gray"}>
                                                                                    <FaCamera size="20px" />
                                                                                </Button>
                                                                                <Button onClick={onPhotoDeleteOpen} variant={"outline"} color={"gray"}>
                                                                                    <FaTrashAlt size="20px" />
                                                                                </Button>
                                                                                <TeamPhotoUploadModal isOpen={isPhotoOpen} onClose={onPhotoClose} />
                                                                                <TeamPhotoDeleteModal isOpen={isPhotoDeleteOpen} onClose={onPhotoDeleteClose} />
                                                                            </VStack>  :
                                                                            <HStack justifyContent={"center"}>
                                                                                <Button onClick={onPhotoOpen} variant={"outline"} color={"gray"}>
                                                                                    <FaCamera size="20px" />
                                                                                </Button>
                                                                                <TeamPhotoUploadModal isOpen={isPhotoOpen} onClose={onPhotoClose} />
                                                                            </HStack>
                                                                            }
                            </HStack>
                        </VStack>
                        {spvsrTeamData?.description && (
                            <VStack>
                                <Card my={4} width={"90%"} textAlign={"center"}>
                                    <CardBody>
                                        <Text fontSize={"sm"}>{spvsrTeamData.description}</Text>
                                    </CardBody>
                                </Card>
                            </VStack>
                        )}
                        <VStack alignItems={"flex-start"} px={3}>
                            <Text as="b" color={"main.500"} mt={10} fontSize={"sm"}> SINCE </Text>
                            {/* <Text fontSize={"sm"}> {spvsrTeamData ? (formatDate_pl(spvsrTeamData.created_at)) : "-"} </Text> */}
                            <Text fontSize={"sm"}> {spvsrTeamData ? spvsrTeamData.since : "-"} </Text>
                            <Divider />
                        </VStack>
                        <BigDivider />
                        <VStack alignItems={"flex-start"} px={3}>
                            <Text as="b" color={"main.500"} fontSize={"sm"}> PLAN </Text>
                            <Divider />
                            <Text fontSize={"sm"}> {spvsrTeamData ? spvsrTeamData.plan : "-"} </Text>
                            <Divider />
                        </VStack>
                        <SmallDivider />
                        <VStack alignItems={"flex-start"} px={3}>
                            {/* <Text as="b" color={"main.500"} mt={5} fontSize={"sm"}> BALL </Text>
                            <Divider />
                            <Text fontSize={"sm"}> 0 balls </Text>
                            <Divider /> */}
                            <Text as="b" color={"main.500"} mt={10} fontSize={"sm"}> TEAM CODE </Text>
                            <Divider />
                            <Text fontSize={"sm"}> {spvsrTeamData ? (spvsrTeamData.code) : "-"} </Text>
                            <Divider />
                        </VStack>
                        <Empty />
                            <VStack>
                                <Button onClick={onOpen} isLoading={spvsrTeamLoading} backgroundColor={"point.500"} color={"black"} width={"80%"} disabled={true}> 팀 정보 업데이트 </Button>
                            </VStack>
                        <Empty />
                        <TeamUpdateModal isOpen={isOpen} onClose={onClose} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}