import { Box, Button, Center, Divider, Flex, Grid, Heading, HStack, Image, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalContent, ModalOverlay, propNames, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaEllipsisV, FaShare, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getGame } from "../api";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import GameNoLink from "../components/GameNoLink";
import GameVideoAddModal from "../components/GameVideoAddModal";
import DeleteGameModal from "../components/GameDeleteModal";
import GameVote from "../components/GameVote";
import GoalPlayer from "../components/GoalPlayer";
import Player from "../components/Player";
import { IGame } from "../types";
import GamePhotoUploadModal from "../components/GamePhotoUploadModal";
import GamePhotoDeleteModal from "../components/GamePhotoDeleteModal";
import GameVideoDeleteModal from "../components/GameVideoDeleteModal";
import PlayerDailyAddModal from "../components/PlayerDailyAddModal";
import KakaoADBig from "../components/KakaoADBig";
import KakaoADSmall from "../components/KakaoADSmall";

export default function IsSpvsrGameDetail() {

    const { gamePk } = useParams();

    const { isLoading : gameLoading, data : gameData, isError : gameError } = useQuery<IGame>(["game", gamePk], getGame);

    const navigate = useNavigate();

    const onClickBack = () => {
        navigate(-1)
    }

    const [tabIndexGame, setTabIndexGame] = useState(Number(localStorage.getItem('tabIndexGame')) || 0);

    useEffect(() => {
      localStorage.setItem('tabIndexGame', tabIndexGame.toString());
    }, [tabIndexGame]);


    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen : isDeleteOpen, onOpen : onDeleteOpen, onClose : onDeleteClose } = useDisclosure();

    const [selectedImage, setSelectedImage] = useState("");
  
    const handleOpen = (src: string) => {
      setSelectedImage(src);
      onOpen();
    }

    const { isOpen : isPlayerDailyAddOpen, onOpen : onPlayerDailyAddOpen, onClose : onPlayerDailyAddClose } = useDisclosure();
    const { isOpen : isVideoAddOpen, onOpen : onVideoAddOpen, onClose : onVideoAddClose } = useDisclosure();
    const { isOpen : isVideoDeleteOpen, onOpen : onVideoDeleteOpen, onClose : onVideoDeleteClose } = useDisclosure();
    const { isOpen : isPhotoAddOpen, onOpen : onPhotoAddOpen, onClose : onPhotoAddClose } = useDisclosure();
    const { isOpen : isPhotoDeleteOpen, onOpen : onPhotoDeleteOpen, onClose : onPhotoDeleteClose } = useDisclosure();

    const onCameraClick = (event : React.SyntheticEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onPhotoDeleteOpen();
    }


    return (
        <>
            <Helmet>
                <title>{ gameData ? (`삼오엠 | ${gameData.team.name} vs ${gameData.vsteam}`) : "Loading.." }</title>
            </Helmet>
            <HStack justifyContent={"space-between"} height={20} px={5}>
                <Button variant={"unstyled"} onClick={onClickBack}>
                    <FaArrowLeft />
                </Button>
                {gameData?.team.is_spvsr ? 
                                                                        <Menu>
                                                                            <MenuButton marginRight={1}>
                                                                                {/* <Avatar size={"md"} name={user?.name} src={user?.avatar} /> */}
                                                                                <FaEllipsisV />
                                                                            </MenuButton>
                                                                            <MenuList>
                                                                                <Link to={`/games/${gamePk}/update`}>
                                                                                    <MenuItem> 수정하기 </MenuItem>
                                                                                </Link>
                                                                                <MenuItem onClick={onDeleteOpen}> 삭제하기 </MenuItem>
                                                                            </MenuList>
                                                                            <DeleteGameModal isOpen={isDeleteOpen} onClose={onDeleteClose} />
                                                                        </Menu> : null}
            </HStack>
            <VStack alignItems={"flex-start"} px={5} pt={5} mb={10}>
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
            <VStack mt={8}>
                <Box w="320px" h="100px">
                        <KakaoADBig />
                </Box>
            </VStack>
            <BigDivider />
            <Tabs variant='soft-rounded' isLazy align={"center"} index={tabIndexGame} onChange={setTabIndexGame}>
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
                        <VStack alignItems={"flex-start"} mt={5} px={3} spacing={4}>
                            <Divider mt={8}/>
                            <Text as="b" color={"main.500"} fontSize={"sm"} > Formation </Text>
                            <Divider />
                            <Center width={"100%"} position="relative" height="auto">
                                <Image 
                                    src="https://imagedelivery.net/SbAhiipQhJYzfniSqnZDWw/cb4c0a34-5e82-40df-ff6d-adfb94aad700/public" 
                                    alt="description of image"
                                    maxWidth="90%"
                                />
                                {gameData && 
                                            gameData.quotas.length !== 0 ?
                                                                <VStack position="absolute" top="40%" align="center" width="100%">
                                                                    <Link to={`/games/${gamePk}/quotas`}>
                                                                        <Button backgroundColor={"main.500"} color={"white"} size={"md"}>포메이션 확인하기</Button>
                                                                    </Link>
                                                                </VStack>
                                                                        : gameData?.team.is_spvsr ?
                                                                                gameData && gameData.participants.length >= 11 ?
                                                                                <VStack position="absolute" top="40%" align="center" width="100%">
                                                                                    <Link to={`/games/${gamePk}/quotas/upload`}>
                                                                                        <Button backgroundColor={"main.500"} color={"white"} size={"md"}>포메이션 추가하기</Button>
                                                                                    </Link>
                                                                                </VStack>
                                                                                : 
                                                                                <VStack position="absolute" top="37%" align="center" width="100%">
                                                                                    <Text as="b" color={"white"}>라인업 인원이 11명보다 적은 경우, <br/> 포메이션을 추가할 수 없습니다.</Text>
                                                                                </VStack>
                                                                                :
                                                                                <VStack position="absolute" top="45%" align="center" width="100%">
                                                                                    <Text as="b" color={"white"}>등록된 포메이션이 없습니다.</Text>
                                                                                </VStack>
                                                                                }
                            </Center>
                            <Empty />
                        </VStack>
                        <VStack alignItems={"flex-start"} px={3} spacing={4}>
                            <Divider mt={8}/>
                            <Text as="b" color={"main.500"} fontSize={"sm"} > Line-ups </Text>
                            <Divider />
                            {gamePk && gameData?.team.is_spvsr ?          
                                                    <VStack alignItems={"flex-end"}>
                                                        <Button onClick={onPlayerDailyAddOpen} mb={5} backgroundColor={"point.500"} color={"black"} size={"xs"}> + 용병 추가하기 </Button>
                                                        <PlayerDailyAddModal isOpen={isPlayerDailyAddOpen} onClose={onPlayerDailyAddClose} gamePk={gamePk} />
                                                    </VStack>
                                                    // onClick={onOpen} 
                                                        : null}
                            {gameData?.participants.sort((a, b) => {
                                                                        // 둘 중 하나만 is_daily가 true인 경우
                                                                        if (a.is_daily && !b.is_daily) {
                                                                            return -1; // a를 앞에 배치
                                                                        }
                                                                        if (!a.is_daily && b.is_daily) {
                                                                            return 1; // b를 앞에 배치
                                                                        }
                                                                        // 둘 다 is_daily가 true이거나 false인 경우
                                                                        return a.backnumber - b.backnumber;
                            }).map((participant, index) => (
                                            <Player 
                                                key={participant.pk}
                                                pk={participant.pk}
                                                avatar={participant.avatar}
                                                backnumber={participant.backnumber}
                                                name={participant.name}
                                                is_connecting={participant.is_connecting}
                                                is_connected={participant.is_connected}
                                                is_daily={participant.is_daily}
                                                is_spvsr={gameData ? gameData.team.is_spvsr : false}
                                            />
                                        ))}
                        <Empty />
                        </VStack>
                    </TabPanel>
                    <TabPanel p={0}>
                        <VStack alignItems={"flex-start"} px={3} spacing={4}>
                            <Divider mt={8}/>
                        </VStack>
                        <VStack alignItems={"center"} mt={5} px={3} spacing={4}>
                            <Text as="b" color={"main.500"} fontSize={"sm"} > Videos </Text>
                            <Divider />
                            {gameData?.videos?.map((video, index) => {

                                if (!video.file.startsWith("https://youtu.be/")) {
                                    // URL이 "https://youtu.be/"로 시작하지 않으면 아무것도 반환하지 않음
                                    return null;
                                }

                                const parts = video.file.split("/");
                                const videoID = parts[parts.length - 1];
                            
                                return (
                                    <>
                                        <div className="video-container" key={video.id}>
                                            <iframe src={`https://www.youtube.com/embed/${videoID}`} frameBorder="0" allowFullScreen></iframe>
                                        </div>
                                        {gameData?.team.is_spvsr ?
                                            <HStack alignItems={"flex-end"}>
                                                <Button onClick={onVideoDeleteOpen} variant={"outline"} color={"black"} size={"xs"}>
                                                    <FaTrashAlt size="12" />
                                                </Button>
                                                <GameVideoDeleteModal pk={video.id} isOpen={isVideoDeleteOpen} onClose={onVideoDeleteClose} />
                                            </HStack> 
                                        : null}
                                    </>
                                )
                            })}
                            {gameData?.team.is_spvsr ?          
                                                    <>
                                                        <Button onClick={onVideoAddOpen} my={5} backgroundColor={"point.500"} color={"black"} size={"xs"}> + 유튜브 링크 추가하기 </Button>
                                                        <GameVideoAddModal isOpen={isVideoAddOpen} onClose={onVideoAddClose} />
                                                    </>
                                                    // onClick={onOpen} 
                                                        : null}
                            <Empty />
                        </VStack>
                        <VStack alignItems={"center"} mt={5} px={3} spacing={4}>
                            <Text as="b" color={"main.500"} fontSize={"sm"} > Photos </Text>
                            <Divider />
                            <Grid templateColumns={"repeat(3, 1fr)"} gap={2}>
                            {gameData?.photos?.map((photo, index) => (
                                <Box key={photo.id} onClick={() => handleOpen(photo.file)} position="relative">
                                    <Image src={photo.file} objectFit="cover" objectPosition="center" height="100%" boxSize="100%" cursor="pointer" />
                                                            {
                                                                gameData?.team.is_spvsr ? 
                                                                                                                <>
                                                                                                                    <Button 
                                                                                                                        onClick={onCameraClick}
                                                                                                                        position="absolute"
                                                                                                                        right={1}
                                                                                                                        top={1}
                                                                                                                        size={"xs"}
                                                                                                                        variant={"outline"}
                                                                                                                        // onClick={onDuesInDeleteOpen}
                                                                                                                    >
                                                                                                                        <FaTrashAlt color="black" size={"12"}/>
                                                                                                                    </Button>
                                                                                                                    <GamePhotoDeleteModal isOpen={isPhotoDeleteOpen} onClose={onPhotoDeleteClose} pk={photo.id} />
                                                                                                                </> : null
                                                            }
                                </Box>
                                ))}
                            </Grid>
                            {gameData?.team.is_spvsr ?          
                                                    <>
                                                        <Button onClick={onPhotoAddOpen} my={5} backgroundColor={"point.500"} color={"black"} size={"xs"}> + 사진 추가하기 </Button>
                                                        <GamePhotoUploadModal isOpen={isPhotoAddOpen} onClose={onPhotoAddClose} />
                                                    </>
                                                    // onClick={onOpen} 
                                                        : null}
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
                        <Empty />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <VStack>
                <Box w="320px" h="50px">
                        <KakaoADSmall />
                </Box>
            </VStack>
            <Empty />
            <Empty />
        </>
    )
}