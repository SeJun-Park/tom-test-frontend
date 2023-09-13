import { Box, Container, Divider, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { formatGamesDate } from "../lib/utils";
import { ITinyTeam } from "../types";

interface IGameProps {
    pk : number,
    date : string,
    team : ITinyTeam,
    vsteam : string,
    team_score? : number,
    vsteam_score? : number,
}

export default function Game( props : IGameProps ) {

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

    return (
        <Box width={"100%"}>
            <Link to={`/games/${props.pk}`}>
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
                </VStack>
                {/* <Box width={"100%"} height={"1"} bgGradient="linear(to-b, main.500, main.500, point.500)" my={0}> </Box> */}
            </Link>
        </Box>
    )
}