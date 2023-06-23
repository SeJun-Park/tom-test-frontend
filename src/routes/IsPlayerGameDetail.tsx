import { Box, Button, Divider, Grid, HStack, Image, Modal, ModalBody, ModalContent, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getGame } from "../api";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import GameNoLink from "../components/GameNoLink";
import GameVote from "../components/GameVote";
import GoalPlayer from "../components/GoalPlayer";
import Player from "../components/Player";
import { IGame } from "../types";
import "../video.css"

export default function IsPlayerGameDetail() {

    const { gamePk } = useParams();

    const { isLoading : gameLoading, data : gameData, isError : gameError } = useQuery<IGame>(["game", gamePk], getGame);

    const navigate = useNavigate();

    const onClickBack = () => {
        navigate(-1)
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedImage, setSelectedImage] = useState("");
  
    const handleOpen = (src: string) => {
      setSelectedImage(src);
      onOpen();
    }

    return (
        <>
            <Helmet>
                <title>{ gameData ? (`3OM | ${gameData.team.name} vs ${gameData.vsteam}`) : "Loading.." }</title>
            </Helmet>
            <HStack height={20} px={5}>
                <Button variant={"unstyled"} onClick={onClickBack}>
                    <FaArrowLeft />
                </Button>
            </HStack>
            <VStack alignItems={"flex-start"} padding={"5"} mb={10}>
                <Text fontSize={"xl"} as="b"> {gameData?.team.name} </Text>
                <HStack>
                    <Text fontSize={"xl"}> vs </Text>
                    <Text fontSize={"xl"} as="b"> {gameData?.vsteam}</Text>
                </HStack>
            </VStack>
            <VStack alignItems={"flex-start"} px={3}>
                {gameData && 
                                <GameNoLink 
                                pk={gameData.pk} 
                                date={gameData?.date} 
                                team={gameData?.team} 
                                vsteam={gameData?.vsteam}
                                team_score={gameData?.team_score}
                                vsteam_score={gameData?.vsteam_score}
                                /> 
                            } 


                
            </VStack>
            <VStack px={5}>
                    <Text as="b" fontSize={"xx-small"} color="gray.500" mb={4} >{gameData?.location} | {gameData?.start_time.replace(/:\d{2}$/, '')}</Text>
            </VStack>
            <VStack spacing={4} px={7} justifyContent={"flex-start"} alignItems={"flex-start"}>
                    {gameData?.goals.map((goalplayer) => 
                                                        <GoalPlayer key={goalplayer.player.pk} playerPk={goalplayer.player.pk} />    )}
                    <Divider />
            </VStack>
            <BigDivider />
            <Tabs variant='soft-rounded' isLazy align={"center"}>
                <TabList>
                    <Tab _selected={{color : "black", bgColor : "point.500"}}>3OM</Tab>
                    <Tab _selected={{color : "black", bgColor : "point.500"}}>Line-ups</Tab>
                    <Tab _selected={{color : "black", bgColor : "point.500"}}>Related</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel p={0}>
                        <VStack alignItems={"flex-start"} px={3} spacing={4}>
                            <Divider mt={8}/>
                        </VStack>
                        { gamePk && <GameVote gamePk={gamePk} />}


                    </TabPanel>
                    <TabPanel p={0}>
                    <VStack alignItems={"flex-start"} px={3} spacing={4}>
                            <Divider mt={8}/>
                        </VStack>
                        <VStack alignItems={"flex-start"} mt={5} px={3} spacing={4}>
                            <Text as="b" color={"main.500"} fontSize={"sm"} style={{ WebkitAlignItems: "flex-start" }}> Formation </Text>
                            <Divider />
                            <Empty />
                        </VStack>
                        <VStack alignItems={"flex-start"} px={3} spacing={4}>
                            <Text as="b" color={"main.500"} fontSize={"sm"} style={{ WebkitAlignItems: "flex-start" }}> Line-ups </Text>
                            <Divider />
                            {gameData?.participants.map((participant) => (
                                            <Player 
                                                key={participant.pk}
                                                pk={participant.pk}
                                                avatar={participant.avatar}
                                                backnumber={participant.backnumber}
                                                name={participant.name}
                                                is_connecting={participant.is_connecting}
                                                is_connected={participant.is_connected}
                                            />
                                        ))}
                        <Empty />
                        </VStack>
                    </TabPanel>
                    <TabPanel p={0}>
                        <VStack alignItems={"flex-start"} px={3} spacing={4}>
                            <Divider mt={8}/>
                        </VStack>
                        <VStack align={"flex-start"} mt={5} px={3} spacing={4}>
                            <Text as="b" color={"main.500"} fontSize={"sm"} style={{ WebkitAlignItems: "flex-start" }}> Videos </Text>
                            <Divider />
                            {gameData?.videos?.map((video) => {

                                if (!video.file.startsWith("https://youtu.be/")) {
                                    // URL이 "https://youtu.be/"로 시작하지 않으면 아무것도 반환하지 않음
                                    return null;
                                }
                                
                                const parts = video.file.split("/");
                                const videoID = parts[parts.length - 1];
                            
                                return (
                                <div className="video-container">
                                    <iframe src={`https://www.youtube.com/embed/${videoID}`} frameBorder="0" allowFullScreen></iframe>
                                </div>
                                )
                            })}
                            <Empty />
                        </VStack>
                        <VStack align={"flex-start"} mt={5} px={3} spacing={4}>
                            <Text as="b" color={"main.500"} fontSize={"sm"} style={{ WebkitAlignItems: "flex-start" }}> Photos </Text>
                            <Divider />
                            <Grid templateColumns={"repeat(3, 1fr)"} gap={2}>
                            {gameData?.photos?.map((photo, index) => (
                                <Box key={index} boxSize="100%" onClick={() => handleOpen(photo.file)}>
                                    <Image src={photo.file} objectFit="cover" objectPosition="center" height="100px" boxSize="100%" cursor="pointer" />
                                </Box>
                                ))}
                            </Grid>
                            <Empty />
                            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalBody>
                                        <Image src={selectedImage} boxSize="100%" />
                                    </ModalBody>
                                </ModalContent>
                            </Modal>
                        </VStack>
                        <VStack align={"flex-start"} mt={5} px={3} spacing={4}>
                            <Text as="b" color={"main.500"} fontSize={"sm"} style={{ WebkitAlignItems: "flex-start" }}> Comments </Text>
                            <Divider />
                            <Empty />
                        </VStack>
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </>
    )
}