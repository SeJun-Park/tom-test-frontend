import { Avatar, Badge, Box, Button, Card, CardBody, Divider, HStack, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaArrowLeft, FaArrowRight, FaCamera, FaEllipsisV, FaFutbol, FaRunning, FaTrashAlt, FaUserNinja } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPlayer, getPlayerGames, getPlayerGoals, getPlayerTomGames, isSpvsr } from "../api";
import BigDivider from "../components/BigDivider";
import Empty from "../components/Empty";
import Game from "../components/Game";
import IsSpvsrPlayerDeleteModal from "../components/IsSpvsrPlayerDeleteModal";
import IsSpvsrPlayerConnectingModal from "../components/IsSpvsrPlayerConnectingModal";
import IsSpvsrPlayerConnectionModal from "../components/IsSpvsrPlayerConnectionModal";
import IsSpvsrPlayerUpdateModal from "../components/IsSpvsrPlayerUpdateModal";
import NullGame from "../components/NullGame";
import ProtectedPage from "../components/ProtectedPage";
import SmallDivider from "../components/SmallDivider";
import { IGoals, IPlayer, ISpvsrUser, ITinyGame } from "../types";
import { Helmet } from "react-helmet";
import PlayerPhotoUploadModal from "../components/PlayerPhotoUploadModal";
import PlayerPhotoDeleteModal from "../components/PlayerPhotoDeleteModal";
import KakaoADBig from "../components/KakaoADBig";
import KakaoADSmall from "../components/KakaoADSmall";

export default function IsSpvsrPlayerProfile() {

    const { playerPk } = useParams();

    const { isLoading : spvsrLoading, data : spvsrData, isError : spvsrError } = useQuery<ISpvsrUser>(["isSpvsr"], isSpvsr);

    const { isLoading : playerLoading, data : playerData, isError : playerError } = useQuery<IPlayer>(["player", playerPk], getPlayer);
    const { isLoading : playerGamesLoading, data : playerGamesData, isError : playerGamesError } = useQuery<ITinyGame[]>(["playerGames", playerPk], getPlayerGames);
    const { isLoading : playerGoalsLoading, data : playerGoalsData, isError : playerGoalsError } = useQuery<IGoals>(["playerGoals", playerPk], getPlayerGoals);
    const { isLoading : playerTomGamesLoading, data : playerTomGamesData, isError : playerTomGamesError } = useQuery<ITinyGame[]>(["playerTomGames", playerPk], getPlayerTomGames);


    const { isOpen : connectionModalisOpen, onOpen : connectionModalonOpen, onClose : connectionModalonClose} = useDisclosure()
    const { isOpen : connectingModalisOpen, onOpen : connectingModalonOpen, onClose : connectingModalonClose} = useDisclosure()
    const { isOpen : updateModalisOpen, onOpen : updateModalonOpen, onClose : updateModalonClose} = useDisclosure()
    const { isOpen : deleteModalisOpen, onOpen : deleteModalonOpen, onClose : deleteModalonClose} = useDisclosure()
    const { isOpen : isPhotoOpen, onOpen : onPhotoOpen, onClose : onPhotoClose } = useDisclosure()
    const { isOpen : isPhotoDeleteOpen, onOpen : onPhotoDeleteOpen, onClose : onPhotoDeleteClose } = useDisclosure()

    const navigate = useNavigate();
    const onClickBack = () => {
        navigate(-1)
    }

    return (
        <ProtectedPage>
            <Helmet>
                <title>{ playerData ? (`3OM | ${playerData.team.name} / ${playerData.backnumber}.${playerData.name}`) : "Loading.." }</title>
            </Helmet>
            <HStack justifyContent={"space-between"} height={20} px={5}>
                <Button variant={"unstyled"} onClick={onClickBack}>
                    <FaArrowLeft />
                </Button>
                {spvsrData?.team.name === playerData?.team.name ? 
                                                                        <Menu>
                                                                            <MenuButton marginRight={1}>
                                                                                {/* <Avatar size={"md"} name={user?.name} src={user?.avatar} /> */}
                                                                                <FaEllipsisV />
                                                                            </MenuButton>
                                                                            <MenuList>
                                                                                <MenuItem onClick={updateModalonOpen}> 수정하기 </MenuItem>
                                                                                <MenuItem onClick={deleteModalonOpen}> 삭제하기 </MenuItem>
                                                                            </MenuList>
                                                                            <IsSpvsrPlayerUpdateModal isOpen={updateModalisOpen} onClose={updateModalonClose}/>
                                                                            <IsSpvsrPlayerDeleteModal isOpen={deleteModalisOpen} onClose={deleteModalonClose} />
                                                                        </Menu> : null}
            </HStack>
            <VStack alignItems={"flex-start"} padding={"5"}>
                <Text fontSize={"xl"} as="b"> {playerData?.team.name} </Text>
            </VStack>
            <HStack p={5} justifyContent={"flex-start"} spacing={5} width={"100%"}>
                <HStack alignItems={"flex-end"}  position={"relative"} overflow={"hidden"}>
                    <Avatar src={playerData?.avatar} size={"xl"} />
                    {/* <Avatar src={"https://prodigits.co.uk/thumbs/wallpapers/p2ls/drawings/26/5761411112242453.jpg"} size={"sm"} ml={-10} showBorder={true} /> */}
                    
                    { spvsrData?.team.name === playerData?.team.name ? 
                                                                        playerData?.avatar ?
                                                                                            <VStack justifyContent={"center"}>
                                                                                                <Button onClick={onPhotoOpen} variant={"outline"} color={"gray"}>
                                                                                                    <FaCamera size="20px" />
                                                                                                </Button>
                                                                                                <Button onClick={onPhotoDeleteOpen} variant={"outline"} color={"gray"}>
                                                                                                    <FaTrashAlt size="20px" />
                                                                                                </Button>
                                                                                                <PlayerPhotoUploadModal isOpen={isPhotoOpen} onClose={onPhotoClose} />
                                                                                                <PlayerPhotoDeleteModal isOpen={isPhotoDeleteOpen} onClose={onPhotoDeleteClose} />
                                                                                            </VStack>  
                                                                                            :
                                                                                            <HStack justifyContent={"center"}>
                                                                                                <Button onClick={onPhotoOpen} variant={"outline"} color={"gray"}>
                                                                                                    <FaCamera size="20px" />
                                                                                                </Button>
                                                                                                <PlayerPhotoUploadModal isOpen={isPhotoOpen} onClose={onPhotoClose} />
                                                                                            </HStack>
                                                                                            : null}
                </HStack>
                <VStack alignItems={"flex-start"}>
                    <Text fontSize={"xl"}>{playerData?.backnumber}.</Text>
                    <Text as="b" fontSize={"xl"}>{playerData?.name}</Text>
                </VStack>
            </HStack>
            <VStack>
                <HStack>
                    {playerData?.connected_user ? <Badge ml={1} backgroundColor={"main.500"} color={"white"} variant={"outline"}> 연결됨 </Badge> : <Badge ml={1} backgroundColor={"white"} color={"gray.400"} variant={"outline"}> 연결 안됨 </Badge>}
                    <Badge ml={1} backgroundColor={"main.500"} color={"white"}>
                        <HStack>
                            <FaRunning />
                            <Text>{playerGamesData ? playerGamesData.length : "0"}</Text>
                        </HStack>
                    </Badge>
                    <Badge ml={1} backgroundColor={"point.500"} color={"black"}>
                        <HStack>
                            <FaUserNinja />
                            <Text>{playerTomGamesData ? playerTomGamesData.length : "0"}</Text>
                        </HStack>
                    </Badge>
                    <Badge ml={1} backgroundColor={"black"} color={"white"}>
                        <HStack>
                            <FaFutbol />
                            <Text>{playerGoalsData ? playerGoalsData.goals : "0"}</Text>
                        </HStack>
                    </Badge>
                </HStack>
            </VStack>
            {playerData?.description && (
                <VStack>
                    <Card my={4} width={"90%"} textAlign={"center"}>
                        <CardBody>
                            <Text fontSize={"sm"}>{playerData.description}</Text>
                        </CardBody>
                    </Card>
                </VStack>
            )}
            {/* <VStack my={6} alignItems={"flex-start"}>
                <HStack ml={4}>
                    <Card textAlign={"center"} variant={"filled"} size={"sm"}>
                        <CardBody>
                            <Text fontSize={"sm"}>골을 잘 넣어요</Text>
                        </CardBody>
                    </Card>
                    <Text fontSize={"xs"}>
                        1
                    </Text>
                </HStack>
                <HStack ml={4}>
                    <Card textAlign={"center"} variant={"filled"} size={"sm"}>
                        <CardBody>
                            <Text fontSize={"sm"}>패스를 잘 해요</Text>
                        </CardBody>
                    </Card>
                    <Text fontSize={"xs"}>
                        2
                    </Text>
                </HStack>
            </VStack> */}
            {spvsrData?.team.name === playerData?.team.name ? (
                <HStack mt={4} justifyContent={"center"}>
                    {playerData?.connected_user ? <Button onClick={connectionModalonOpen} color={"main.500"} size={"sm"} variant={"ghost"}> 연결 상태 보기</Button> 
                                                        : (playerData?.connecting_user ? <Button onClick={connectingModalonOpen} backgroundColor={"point.500"} color={"black"} size={"sm"}> 연결중.. </Button>
                                                        : <Button color={"gray.400"} size={"sm"} disabled={true} variant={"ghost"}> 연결 상태 없음 </Button>) }
                    <IsSpvsrPlayerConnectionModal isOpen={connectionModalisOpen} onClose={connectionModalonClose}/>
                    <IsSpvsrPlayerConnectingModal isOpen={connectingModalisOpen} onClose={connectingModalonClose}/>
                </HStack>
            ) : null
            }
            <VStack alignItems={"flex-start"} px={3}>
                <Text as="b" color={"main.500"} mt={10} fontSize={"md"}> 최근 경기 </Text>
                {playerGamesData ? (playerGamesData[0] ? 
                    <Game 
                        pk={playerGamesData[0].pk} 
                        date={playerGamesData[0].date} 
                        team={playerGamesData[0].team} 
                        vsteam={playerGamesData[0].vsteam}
                        team_score={playerGamesData[0].team_score}
                        vsteam_score={playerGamesData[0].vsteam_score}
                        /> 
                        : <NullGame />) : <NullGame />}
            </VStack>
            <VStack>
                <Box w="320px" h="100px" mt={3}>
                        <KakaoADBig />
                </Box>
            </VStack>
            <BigDivider />
            <Link to={`/players/${playerPk}/games`}>
                <VStack alignItems={"flex-start"} px={3} mt={8}>
                        <HStack width={"100%"} justifyContent={"space-between"}>
                            <Text as="b" color={"main.500"} fontSize={"md"}> 경기 </Text>
                            <FaArrowRight size={"10"}/>
                        </HStack>
                        <Divider />
                        <HStack width={"100%"} justifyContent={"space-between"}>
                            <Text as="b" fontSize={"sm"}> TOTAL </Text>
                            <Text as="b" fontSize={"sm"}> {playerGamesData ? playerGamesData.length : "0"} 경기 </Text>
                        </HStack>
                </VStack>
            </Link>
            <SmallDivider />
            <Link to={`/players/${playerPk}/votes`}>
                <VStack alignItems={"flex-start"} px={3} mt={8}>
                        <HStack width={"100%"} justifyContent={"space-between"}>
                            <Text as="b" color={"main.500"} fontSize={"md"}> 투표 </Text>
                            <FaArrowRight size={"10"}/>
                        </HStack>
                        <Divider />
                        <HStack width={"100%"} justifyContent={"space-between"}>
                            <Text as="b" fontSize={"sm"}> TOTAL </Text>
                            <Text as="b" fontSize={"sm"}> {playerTomGamesData ? playerTomGamesData.length : "0"} 회 </Text>
                        </HStack>
                </VStack>
            </Link>
            <SmallDivider />
            <Link to={`/players/${playerData?.id}/goals`}>
                <VStack alignItems={"flex-start"} px={3} mt={8}>
                    <HStack width={"100%"} justifyContent={"space-between"}>
                        <Text as="b" color={"main.500"} fontSize={"md"}> 골 </Text>
                        <FaArrowRight size={"10"}/>
                    </HStack>
                    <Divider />
                    <HStack width={"100%"} justifyContent={"space-between"}>
                        <Text as="b" fontSize={"sm"}> TOTAL </Text>
                        <Text as="b" fontSize={"sm"}> {playerGoalsData ? playerGoalsData.goals : "0"} 골 </Text>
                    </HStack>
                </VStack>
            </Link>
            <Empty />
            <VStack>
                <Box w="320px" h="50px" mt={3}>
                        <KakaoADSmall />
                </Box>
            </VStack>
            <Empty />
            <Empty />
        </ProtectedPage>
    )
}