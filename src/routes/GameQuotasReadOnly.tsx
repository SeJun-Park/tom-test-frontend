import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Card, CardBody, Divider, Grid, HStack, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getGame, getGameQuotas } from "../api";
import Empty from "../components/Empty";
import FFT from "../components/formations/FFT";
import FTTO from "../components/formations/FTTO";
import TFT from "../components/formations/TFT";
import KakaoADBig from "../components/KakaoADBig";
import KakaoADSmall from "../components/KakaoADSmall";
import PlayerQuotasInfo from "../components/PlayerQuotasInfo";
import { formatGamesDate } from "../lib/utils";
import { IGame, IGameQuota } from "../types";

export default function GameQuotasReadOnly() {

    const { gamePk } = useParams();

    const { isLoading : gameLoading, data : gameData, isError : gameError } = useQuery<IGame>(["game", gamePk], getGame);
    const { isLoading : gameQuotasLoading, data : gameQuotasData, isError : gameQuotasError } = useQuery<IGameQuota[]>(["gameQuotas", gamePk], getGameQuotas);

    interface IPlayerInfo {
        playerPk: number;
        playerAvatar: string;
        playerName: string;
        gameQuotaIndex: number[];
        formations: string[];
        lineupsIndex: number[];
    }
    
    const allPlayersData = gameQuotasData?.reduce<IPlayerInfo[]>((acc, gameQuota, gameQuotaIndex) => {
    gameQuota.lineups.forEach((player, lineupsIndex) => {
        const existingPlayerIndex = acc.findIndex(info => info.playerPk === player.pk);
        if (existingPlayerIndex !== -1) {
        acc[existingPlayerIndex].gameQuotaIndex.push(gameQuotaIndex);
        acc[existingPlayerIndex].lineupsIndex.push(lineupsIndex);
        acc[existingPlayerIndex].formations.push(gameQuota.formation);
        } else {
        acc.push({
            playerPk: player.pk,
            playerAvatar: player.avatar,
            playerName: player.name,
            gameQuotaIndex: [gameQuotaIndex],
            formations: [gameQuota.formation],
            lineupsIndex: [lineupsIndex],
        });
        }
    });
    return acc;
    }, []);

    return (
        <>
            <Helmet>
                <title>{ gameData ? (`3OM | ${gameData.team.name} vs ${gameData.vsteam} 포메이션`) : "Loading.." }</title>
            </Helmet>
            <HStack justifyContent={"center"} height={20} px={5}>
                <Text as="b" color="gray" fontSize={"xs"}>*본 페이지는 읽기 전용 페이지입니다.</Text>
            </HStack>
            <VStack my={8}>
                <Box w="320px" h="100px">
                        <KakaoADBig />
                </Box>
            </VStack>

           {gameData ? 
           <>
            <VStack padding={5} mt={5}>
                <Text as="b" fontSize={"xx-small"}> {gameData?.date ? (formatGamesDate(gameData.date)) : null} </Text>
                <Text as="b" fontSize={"lg"}>{gameData?.team.name} vs {gameData?.vsteam}</Text>
                <Text as="b" fontSize={"xx-small"} color="gray.500" >{gameData?.location} | {gameData?.start_time.replace(/:\d{2}$/, '')}</Text>
                <Divider mt={4}/>
            </VStack>
            <Tabs variant='soft-rounded' isLazy align={"center"}>
                <TabList>
                    <Tab _selected={{color : "white", bgColor : "main.500"}}>쿼터별</Tab>
                    <Tab _selected={{color : "white", bgColor : "main.500"}}>플레이어별</Tab>
                </TabList>
                    <TabPanels>
                        <TabPanel p={0}>
                        <Empty />
                    {gameQuotasData ? gameQuotasData.map((gameQuota, index) =>  
                                                                    <VStack padding={5}>
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
                                                                )
                                                            :
                                                            <VStack justifyContent={"center"} my={60}>
                                                                <Spinner size={"lg"} />
                                                            </VStack>
                                                            }
                        </TabPanel>
                        <TabPanel p={0}>
                            <Empty />                                               
                            <VStack px={5}>
                            {allPlayersData ? allPlayersData.sort((a, b) => a.gameQuotaIndex.length - b.gameQuotaIndex.length).map((gameQuotasInfo, index) => 
                                                                            <PlayerQuotasInfo
                                                                                            key={index} 
                                                                                            playerPk={gameQuotasInfo.playerPk}
                                                                                            playerAvatar={gameQuotasInfo.playerAvatar}
                                                                                            playerName={gameQuotasInfo.playerName}
                                                                                            gameQuotaIndex={gameQuotasInfo.gameQuotaIndex}
                                                                                            formations={gameQuotasInfo.formations}
                                                                                            lineupsIndex={gameQuotasInfo.lineupsIndex}
                                                                                            />
                                                                    )
                                                                :
                                                                <VStack justifyContent={"center"} my={60}>
                                                                    <Spinner size={"lg"} />
                                                                </VStack>
                                                                }
                            </VStack>
                        </TabPanel>
                    </TabPanels>
            </Tabs>
            </>
            :
            <VStack justifyContent={"center"} my={60}>
                <Spinner size={"lg"} />
            </VStack>
            }
            
            <VStack mt={16}>
                <Box w="320px" h="50px">
                        <KakaoADSmall />
                </Box>
            </VStack>
            <Empty />
            <Empty />
        </>
    )
}