import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { getPlayerQuotaFormation } from "../lib/utils";

interface IPlayerQuotasInfoProps {
    playerPk : number,
    playerAvatar : string,
    playerName : string,
    gameQuotaIndex : number[],
    formations : string[],
    lineupsIndex : number[]

}

export default function PlayerQuotasInfo( props : IPlayerQuotasInfoProps ) {

    return (
        <Accordion width="100%" allowToggle>
            <AccordionItem>
                <AccordionButton justifyContent={"space-between"} _expanded={{ bg: 'gray.100'}}>
                    <VStack spacing={1} my={3}>
                        <Avatar src={props.playerAvatar} />
                        <Text as="b">{props.playerName}</Text>
                    </VStack>
                    <VStack alignItems={"flex-start"}>
                    <Text>총 {props.gameQuotaIndex.length}개 쿼터</Text>
                    <HStack spacing={1}>
                        <Grid templateColumns={"1fr 1fr 1fr 1fr"}>
                            {props.gameQuotaIndex.map((index) =>  <Text as="b" color={"main.500"} fontSize={"md"}>{index+1}쿼터 </Text>)}
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