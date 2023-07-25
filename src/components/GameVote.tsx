import { VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getGameVote } from "../api";
import { IGame, IGameVote } from "../types";
import Empty from "./Empty";
import GameVoteAfter from "./GameVoteAfter";
import GameVoteBefore from "./GameVoteBefore";
import GameVoteIng from "./GameVoteIng";

interface IGameVoteProps {
    gamePk : string
}

export default function GameVote( props : IGameVoteProps ) {

    const { isLoading : gameVoteLoading, data : gameVoteData, isError : gameVoteError } = useQuery<IGameVote>(["gameVote", props.gamePk], getGameVote);
    const now = new Date()

    return (
        <VStack>
            {gameVoteData ? 
                (now < new Date(gameVoteData.start) ? 
                    <GameVoteBefore vote={gameVoteData} /> : (new Date(gameVoteData.start) < now && now < new Date(gameVoteData.end) ? 
                        <GameVoteIng vote={gameVoteData} gamePk={props.gamePk} /> : <GameVoteAfter gamePk={props.gamePk} />)) : null}
            <Empty />
        </VStack>
    )
}