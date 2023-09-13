import { Box, Button, Card, CardBody, Divider, Grid, HStack, Menu, MenuButton, MenuItem, MenuList, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaEdit, FaEllipsisV } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getGame, getGameQuotas, isSpvsr } from "../api";
import CaptureButton from "../components/CaptureButton";
import FFT from "../components/formations/FFT";
import FTTO from "../components/formations/FTTO";
import TFT from "../components/formations/TFT";
import GameQuotasDeleteModal from "../components/GameQuotasDeleteModal";
import { formatGamesDate } from "../lib/utils";
import { IGame, IGameQuota, ISpvsrUser } from "../types";

export default function IsSpvsrGameQuotas() {

    const { gamePk } = useParams();

    const { isLoading : spvsrLoading, data : spvsrData, isError : spvsrError } = useQuery<ISpvsrUser>(["isSpvsr"], isSpvsr);
    const { isLoading : gameLoading, data : gameData, isError : gameError } = useQuery<IGame>(["game", gamePk], getGame);
    const { isLoading : gameQuotasLoading, data : gameQuotasData, isError : gameQuotasError } = useQuery<IGameQuota[]>(["gameQuotas", gamePk], getGameQuotas);

    const { isOpen : isDeleteOpen, onOpen : onDeleteOpen, onClose : onDeleteClose } = useDisclosure();

    const navigate = useNavigate();

    const onClickBack = () => {
        navigate(-1)
    }

    return (
        <>
            <Helmet>
                <title>{ gameData ? (`3OM | ${gameData.team.name} vs ${gameData.vsteam} 포메이션`) : "Loading.." }</title>
            </Helmet>
            <HStack justifyContent={"space-between"} height={20} px={5}>
                <Button variant={"unstyled"} onClick={onClickBack}>
                    <FaArrowLeft />
                </Button>
                {spvsrData?.team.name === gameData?.team.name ? 
                                                                        <Menu>
                                                                            <MenuButton marginRight={1}>
                                                                                <FaEllipsisV />
                                                                            </MenuButton>
                                                                            <MenuList>
                                                                                <MenuItem onClick={onDeleteOpen}>전체 삭제하기 </MenuItem>
                                                                                <GameQuotasDeleteModal isOpen={isDeleteOpen} onClose={onDeleteClose} />
                                                                            </MenuList>
                                                                        </Menu> : null}
            </HStack>
            <Tabs variant='soft-rounded' isLazy align={"center"}>
                <TabList>
                    <Grid templateColumns={"1fr 1fr 1fr 1fr"}>
                        {gameQuotasData?.map((gameQuota, index) => <Tab key={index} _selected={{color : "white", bgColor : "main.500"}}>{index+1}쿼터</Tab>)}
                    </Grid>
                </TabList>
                {/* <Box id="captureTarget"> */}
                    <TabPanels>
                    {gameQuotasData?.map((gameQuota, index) =>  <TabPanel key={index} p={0}>
                        {spvsrData?.team.name === gameData?.team.name ?
                                                                    <HStack px={5} justifyContent={"flex-end"}>
                                                                        <Menu>
                                                                            <MenuButton py={3} pr={1}>
                                                                                <FaEdit />
                                                                            </MenuButton>
                                                                            <MenuList>
                                                                                <Link to={`/games/${gamePk}/quotas/${gameQuota.id}/edit`}>
                                                                                    <MenuItem>쿼터 수정하기</MenuItem>
                                                                                </Link>
                                                                            </MenuList>
                                                                        </Menu>
                                                                    </HStack>
                                                                    : null}
                                                                    <Box id="captureTarget">
                                                                    <VStack padding={5} my={5}>
                                                                        <Text as="b" fontSize={"xx-small"}> {gameData?.date ? (formatGamesDate(gameData.date)) : null} </Text>
                                                                        <Text as="b" fontSize={"lg"}>{gameData?.team.name} vs {gameData?.vsteam}</Text>
                                                                        <Text as="b" fontSize={"xx-small"} color="gray.500" >{gameData?.location} | {gameData?.start_time.replace(/:\d{2}$/, '')}</Text>
                                                                        <Divider my={4} />
                                                                        { gameQuota.lineups.length === 11 ? 
                                                                            <>
                                                                                <Text as="b" color={"main.500"} fontSize={"lg"}>{index+1}쿼터</Text>
                                                                                <Text as="b" color={"main.500"} fontSize={"lg"} mb={3}>{gameQuotasData[index].formation}</Text>
                                                                            

                                                                            {
                                                                                gameQuota.formation === '4-4-2' && <FFT lineups={gameQuota.lineups} />
                                                                            }
                                                                            {
                                                                                gameQuota.formation === '4-2-3-1' && <FTTO lineups={gameQuota.lineups} />
                                                                            }
                                                                            {
                                                                                gameQuota.formation === '3-5-2' && <TFT lineups={gameQuota.lineups} />
                                                                            }
                                                                            </>
                                                                        : <Text mb={3}>플레이어가 삭제되어 <br/> 포메이션을 나타낼 수 없습니다.</Text>
                                                                        }
                                                                        { gameQuota.memo && (
                                                                                                <Card w={"350px"} textAlign={"center"}>
                                                                                                    <CardBody>
                                                                                                        <Text as="b" fontSize={"sm"}>메모</Text>
                                                                                                        <Text fontSize={"sm"}>{gameQuota.memo}</Text>
                                                                                                    </CardBody>
                                                                                                </Card>
                                                                                                    )}
                                                                    </VStack>
                                                                    </Box>
                                                                </TabPanel>)}
                    </TabPanels>
                {/* </Box> */}
                {spvsrData?.team.name === gameData?.team.name ? <CaptureButton /> : null}
            </Tabs>
        </>
    )
}