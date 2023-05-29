import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getGame, getTeam, getTeamPlayers, isSpvsr } from "../api";
import ProtectedPage from "../components/ProtectedPage";
import useUser from "../lib/useUser";
import { IGame, ISpvsrUser, ITeam, ITinyPlayer } from "../types";
import UpdateGameAfter from "./UpdateGameAfter";
import UpdateGameBefore from "./UpdateGameBefore";


export default function UpdateGame() {

    const { gamePk } = useParams();
    const { user } = useUser();

    const { isLoading : spvsrLoading, data : spvsrData, isError : spvsrError } = useQuery<ISpvsrUser>(["isSpvsr"], isSpvsr);
    const { isLoading : gameLoading, data : gameData, isError : gameError } = useQuery<IGame>(["game", gamePk], getGame);

    const navigate = useNavigate();

    if ( !user?.is_spvsr || spvsrData?.team.name !== gameData?.team.name) {
        navigate("/")
    }

    const teamPk = gameData?.team.pk

    const gameDateTime = `${gameData?.date}T${gameData?.end_time}`

    return (
        <ProtectedPage>
            {teamPk ? (new Date(gameDateTime) > new Date() ? <UpdateGameBefore teamPk={teamPk} /> : <UpdateGameAfter teamPk={teamPk} />) : null}
        </ProtectedPage>
    )
}