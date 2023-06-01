import { Avatar, Badge, Box, Button, Divider, Heading, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { formatDate_pl } from "../lib/utils";
import { isSpvsr, isSpvsrGames, isSpvsrTeam } from "../api";
import ProtectedPage from "../components/ProtectedPage"
import Team from "../components/Team";
import { ISpvsrUser, ITinyGame, ITinyTeam } from "../types";
import TeamRegister from "./TeamRegister";
import BigDivider from "../components/BigDivider";
import { Link } from "react-router-dom";
import SmallDivider from "../components/SmallDivider";
import Empty from "../components/Empty";
import { Helmet } from "react-helmet";
import { FaArrowRight } from "react-icons/fa";

export default function IsSpvsrHome() {
    const { isLoading : spvsrLoading, data : spvsrData, isError : spvsrError } = useQuery<ISpvsrUser>(["isSpvsr"], isSpvsr); 
    const { isLoading : spvsrTeamLoading, data : spvsrTeamData, isError : spvsrTeamError } = useQuery<ITinyTeam>(["isSpvsrTeam"], isSpvsrTeam);
    const { isLoading : spvsrGamesLoading, data : spvsrGamesData, isError : spvsrGamesError } = useQuery<ITinyGame[]>(["isSpvsrGames"], isSpvsrGames);

    return (
        <ProtectedPage>
            <Helmet>
                <title>{ spvsrData ? ("3OM | Home") : "Loading.." }</title>
            </Helmet>
            {spvsrTeamData && spvsrGamesData ? 
                            <>
                                <VStack alignItems={"flex-start"} padding={"5"}>
                                    {/* <VStack position="relative" width="100%" height="75" mt={0}>
                                        <Link to={"/"}>
                                            <Box position="absolute" top={0} left={0} right={0} bottom={0}>
                                                <Box
                                                backgroundImage="url(https://www.pixelstalk.net/wp-content/uploads/2016/06/Nike-3D-Background.jpg)"
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
                                                    <HStack>
                                                        <Text fontSize="xs" color="white">
                                                            sponsored
                                                        </Text>
                                                        <Box color={"white"}>
                                                        </Box>
                                                    </HStack>
                                                </Box>
                                            </Box>
                                        </Link>
                                    </VStack> */}
                                    <VStack position="relative" width="100%" height="75">
                                            <Link to={"/"}>
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
                                        {/* <VStack position="relative" width="100%" height="150" my={10}>
                                            <Link to={"/"}>
                                                <Box position="absolute" top={0} left={0} right={0} bottom={0}>
                                                    <Box
                                                    backgroundImage="url(https://img.freepik.com/premium-photo/football-field-or-soccer-field-for-background_64749-1842.jpg)"
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
                                                                GROUND
                                                            </Text>
                                                            <Box color={"white"}>
                                                                <FaArrowRight />
                                                            </Box>
                                                        </HStack>
                                                    </Box>
                                                </Box>
                                            </Link>
                                        </VStack> */}
                                        {/* <VStack position="relative" width="100%" height="150" mt={0}>
                                            <Link to={"/"}>
                                                <Box position="absolute" top={0} left={0} right={0} bottom={0}>
                                                    <Box
                                                    backgroundImage="url(https://lf19-cdn-tos.tiktokcdn-us.com/obj/i18nblog-tx/tt4b_cms/ko/tipdilz7wysq-2g3mbzPxQ6s9ryhwnHUxkB.jpeg)"
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
                                                        <HStack>
                                                            <Text fontSize="xs" color="white">
                                                                sponsored
                                                            </Text>
                                                            <Box color={"white"}>
                                                            </Box>
                                                        </HStack>
                                                    </Box>
                                                </Box>
                                            </Link>
                                        </VStack> */}
                                    <Empty />
                                    <HStack>
                                        <Text fontSize={"xl"} as="b"> {spvsrData?.username} </Text> 
                                        <Box justifyContent={"center"}>
                                            <Badge ml={1} bg={"main.500"} color={"white"}> spvsr </Badge>
                                        </Box>
                                    </HStack>
                                    {/* <Text fontSize={"xl"} > {spvsrTeamData ? "1" : "0"} TEAM {spvsrGamesData ? spvsrGamesData.length : "0"} GAMES </Text> */}
                                </VStack>
                                <Tabs isFitted variant='enclosed' isLazy>
                                    <TabList mb='1em'>
                                        <Tab _selected={{color : "main.500"}}>My Team</Tab>
                                        <Tab _selected={{color : "main.500"}}>Info</Tab>
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel p={"0"}>
                                            <VStack alignItems={"flex-start"} px={3} spacing={3} mt={8}>
                                            {spvsrData ? 
                                                    <Team  pk={spvsrData?.team.pk} avatar={spvsrData?.team.avatar} name={spvsrData?.team.name} />
                                                    : null}
                                            </VStack>
                                        </TabPanel>
                                        <TabPanel p={"0"}>
                                            <VStack spacing={5}>
                                                <Text fontSize={"xl"} as="b" mt={3}> {spvsrTeamData?.name} </Text>
                                                <Avatar src={spvsrTeamData ? spvsrTeamData.avatar : ""} size={"2xl"} />
                                                {/* <Link to={`teams/${spvsrTeamData?.pk}/update`}> */}
                                                <Box>
                                                    <Button isLoading={spvsrTeamLoading} backgroundColor={"point.500"} color={"black"} width={"100%"} disabled={true}> Update </Button>
                                                </Box>
                                                {/* </Link> */}
                                            </VStack>
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
                                                <Text as="b" color={"main.500"} mt={5} fontSize={"sm"}> BALL </Text>
                                                <Divider />
                                                <Text fontSize={"sm"}> 0 balls </Text>
                                                <Divider />
                                                <Text as="b" color={"main.500"} mt={10} fontSize={"sm"}> TEAM CODE </Text>
                                                <Text fontSize={"sm"}> {spvsrTeamData ? (spvsrTeamData.code) : "-"} </Text>
                                                <Divider />
                                             </VStack>
                                             <Empty />
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </>    
                            : <TeamRegister />}
            
        </ProtectedPage>
    )
}