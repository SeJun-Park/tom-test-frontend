import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Text } from "@chakra-ui/react";
import { ITeamVote, ITinyPlayer } from "../types";

interface ITeamVoteProps {
    pk : number,
    start : string,
    title : string,
    description : string,
    participants : number[],
    winners : ITinyPlayer[],
}

export default function TeamVote( props : ITeamVoteProps ) {
    return (
                <Card maxW='xs' minW='xs'>
                    <CardHeader>
                        <Heading size='md'> {props.title} </Heading>
                    </CardHeader>
                    <CardBody py={0}>
                        <Text> {props.description} </Text>
                    </CardBody>
                    <CardFooter>
                        <Button backgroundColor={"main.500"} color={"white"}>투표하기</Button>
                    </CardFooter>
                </Card>
    )
}