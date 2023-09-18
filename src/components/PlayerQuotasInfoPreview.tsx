import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getPlayer } from "../api";
import { getPlayerQuotaFormation } from "../lib/utils";
import { IPlayer } from "../types";

interface IPlayerQuotasInfoPreviewProps {
    playerPk : number,
    gameQuotaIndex : number[],
    formations : string[],
    lineupsIndex : number[]

}

export default function PlayerQuotasInfoPreview( props : IPlayerQuotasInfoPreviewProps ) {

    const { isLoading : playerLoading, data : playerData, isError : playerError } = useQuery<IPlayer>(["player", props.playerPk], getPlayer, {
        enabled: !!props.playerPk
    });

    return (
        <Accordion width="100%" allowToggle>
            <AccordionItem>
                <AccordionButton justifyContent={"space-between"} _expanded={{ bg: 'gray.100'}}>
                    <VStack spacing={1} my={3}>
                        <Avatar src={playerData?.avatar} />
                        <Text as="b">{playerData?.name}</Text>
                    </VStack>
                    <VStack alignItems={"flex-start"}>
                    <Text>지금까지 {props.gameQuotaIndex.length}개 쿼터 선택됨</Text>
                    <HStack>
                        <Grid templateColumns={"1fr 1fr 1fr 1fr"} gap={1}>
                            {props.gameQuotaIndex.map((index) =>  <Text as="b" color={"main.500"} fontSize={"md"}>{index+1}쿼터</Text>)}
                        </Grid>
                    </HStack>
                    </VStack>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                    <VStack alignItems={"flex-end"}>
                        {props.gameQuotaIndex.map((gameQuotaIndex, index) => 
                                                            <HStack justifyContent={"space-between"}>
                                                                <Text as="b" color={"main.500"} fontSize={"md"}>{gameQuotaIndex+1}쿼터</Text><Text>:</Text><Text>{getPlayerQuotaFormation(props.formations[index], props.lineupsIndex[index])}</Text>
                                                            </HStack>)
                                                            }
                    </VStack>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}