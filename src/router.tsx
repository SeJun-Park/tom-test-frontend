import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Community from "./routes/Community";
import GameDetail from "./routes/GameDetail";
import Home from "./routes/Home";
import IsPlayerMyAllGameList from "./routes/IsPlayerMyAllGameList";
import IsPlayerMyAllGoalGameList from "./routes/IsPlayerMyAllGoalGameList";
import IsPlayerMyAllTomGameList from "./routes/IsPlayerMyAllTomGameList";
import KakaoConfirm from "./routes/KakaoConfirm";
import NotFound from "./routes/NotFound";
import PlayerGameList from "./routes/PlayerGameList";
import PlayerGoalGameList from "./routes/PlayerGoalGameList";
import PlayerProfile from "./routes/PlayerProfile";
import PlayerTOMList from "./routes/PlayerTOMList";
import SearchTeam from "./routes/SearchTeam";
import TeamGameList from "./routes/TeamGameList";
import TeamHome from "./routes/TeamHome";
import TeamPlayerList from "./routes/TeamPlayerList";
import TeamTOMList from "./routes/TeamTOMList";
import UpdateGame from "./routes/UpdateGame";
import UpdateTeam from "./routes/UpdateTeam";
import UploadGame from "./routes/UploadGame";

const router = createBrowserRouter(
    [
        {
            path : "/",
            element : <Root />,
            children : [
                {
                    path : "",
                    element : <Home /> 
                },
                {
                    path : "kakaologin",
                    element : <KakaoConfirm />
                },
                {
                    path : "users",
                    children : [
                        {
                            path : "isplayer/games",
                            element : <IsPlayerMyAllGameList />
                        },
                        {
                            path : "isplayer/goals",
                            element : <IsPlayerMyAllGoalGameList />
                        },
                        {
                            path : "isplayer/toms",
                            element : <IsPlayerMyAllTomGameList />
                        }
                    ]
                },
                {
                    path : "teams/search",
                    element : <SearchTeam />
                },
                {
                    path : "teams/:teamPk/update",
                    element : <UpdateTeam />
                },
                {
                    path : "teams/:teamPk",
                    element : <TeamHome />,
                },
                {
                    path : "teams/:teamPk/games",
                    element : <TeamGameList />
                },
                {
                    path : "teams/:teamPk/games/upload",
                    element : <UploadGame />
                },
                {
                    path : "teams/:teamPk/toms",
                    element : <TeamTOMList />
                },
                {
                    path : "teams/:teamPk/players",
                    element : <TeamPlayerList />
                },
                {
                    path : "players/:playerPk",
                    element : <PlayerProfile />
                },
                {
                    path : "players/:playerPk/games",
                    element : <PlayerGameList />
                },
                {
                    path : "players/:playerPk/goals",
                    element : <PlayerGoalGameList />
                },
                {
                    path : "players/:playerPk/toms",
                    element : <PlayerTOMList />
                },
                {
                    path : "games/:gamePk",
                    element : <GameDetail />
                },

                {
                    path : "games/:gamePk/update",
                    element : <UpdateGame />
                },
                {
                    path : "community",
                    element : <Community />
                }
            ],
            errorElement : <NotFound />,
        }
    ]
)

export default router;