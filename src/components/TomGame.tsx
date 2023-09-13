import { Avatar, Box, Container, Divider, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getGameVote } from "../api";
import { formatGamesDate } from "../lib/utils";
import { IGameVote, ITinyPlayer, ITinyTeam } from "../types";

interface ITomGameProps {
    pk : number,
    date : string,
    team : ITinyTeam,
    vsteam : string,
    team_score : number,
    vsteam_score : number,
    toms : ITinyPlayer[]
}

export default function TomGame ( props : ITomGameProps ) {

    const { isLoading : gameVoteLoading, data : gameVoteData, isError : gameVoteError } = useQuery<IGameVote>(["gameVote", props.pk], getGameVote);

    let resultBgColor = "black"
    let resultTxtColor = "white"

    if(props.team_score !== undefined && props.team_score !== null && props.vsteam_score !== undefined && props.vsteam_score !== null) {
        if (props.team_score > props.vsteam_score) {
            resultBgColor = "point.500"
            resultTxtColor = "black"
        } else if (props.team_score === props.vsteam_score) {
            resultBgColor = "main.500"
            resultTxtColor = "white"
        } else if (props.team_score < props.vsteam_score) {
            resultBgColor = "black"
            resultTxtColor = "white"
        }
    }

    const now = new Date()

    return (
        <Box width={"100%"}>
            <Link to={`/games/${props.pk}`}>
            {/* <Box width={"100%"} height={"1"} bgGradient="linear(to-b, main.500, main.500, point.500)" my={0}> </Box> */}
                <VStack alignItems={"flex-start"} px={3} mb={4}>
                    <Divider />
                    <Text as="b" fontSize={"sm"}> {props.date ? (formatGamesDate(props.date)) : null} </Text>
                    <Divider />
                    <HStack width={"100%"} height={"10"}>
                        <Container>
                            <Box textAlign={"center"} fontSize={"xs"}>
                                {props.team.name}
                            </Box>
                        </Container>
                        <Container>
                            <Grid templateColumns={"2fr 1fr 2fr"}>
                                <Box bg={resultBgColor} fontWeight={"bold"} color={resultTxtColor} textAlign={"center"} fontSize={"xs"} border={"none"}>
                                    {/* {props.team_score ? props.team_score : "-"} */}
                                    {props.team_score !== undefined && props.team_score !== null ? props.team_score : "-"}

                                </Box>
                                <Box bg={resultBgColor} border={"none"}>
                                    
                                </Box>
                                <Box bg={resultBgColor} fontWeight={"bold"} color={resultTxtColor} textAlign={"center"} fontSize={"xs"} border={"none"}>
                                    {/* {props.vsteam_score ? props.vsteam_score : "-"} */}
                                    {props.vsteam_score !== undefined && props.vsteam_score !== null ? props.vsteam_score : "-"}

                                </Box>
                            </Grid>
                        </Container>
                        <Container>
                            <Box textAlign={"center"} fontSize={"xs"}>
                                {props.vsteam}
                            </Box>
                        </Container>
                    </HStack>
                    <Divider />
                    <HStack height={"10"} justifyContent={"center"} width={"100%"} p={10} spacing={10}>
                        {(gameVoteData && props.toms.length!==0) ? (
                                                                        props.toms.map((tom) => 
                                                                            <VStack>
                                                                                <Avatar src={tom.avatar} />
                                                                                <Text fontSize={"xx-small"}>{tom.name}</Text>
                                                                            </VStack>
                                                                                        )
                                                                    ) : null
                                    }
                                    
                    </HStack>
                    <Divider />
                </VStack>
            </Link>
        </Box>
    )
}