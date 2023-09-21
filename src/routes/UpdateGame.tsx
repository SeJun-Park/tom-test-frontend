import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getGame } from "../api";
import ProtectedPage from "../components/ProtectedPage";
import SpvsrOnlyPage from "../components/SpvsrOnlyPage";
import { IGame } from "../types";
import UpdateGameAfter from "./UpdateGameAfter";
import UpdateGameBefore from "./UpdateGameBefore";


export default function UpdateGame() {

    const { gamePk } = useParams();
    const { isLoading : gameLoading, data : gameData, isError : gameError } = useQuery<IGame>(["game", gamePk], getGame);

    const navigate = useNavigate();

    const teamPk = gameData?.team.pk

    const gameDateTime = `${gameData?.date}T${gameData?.end_time}`

    if (!gameData?.team.is_spvsr) {
        navigate("/")
    }

    return (
        <ProtectedPage>
            <SpvsrOnlyPage>
                {teamPk ? (new Date(gameDateTime) > new Date() ? <UpdateGameBefore teamPk={teamPk} /> : <UpdateGameAfter teamPk={teamPk} />) : null}
            </SpvsrOnlyPage>
        </ProtectedPage>
    )
}