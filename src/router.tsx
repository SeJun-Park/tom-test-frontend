import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Community from "./routes/Community";
import DuesDetail from "./routes/DuesDetails";
import DuesPayment from "./routes/DuesPayment";
import DuesPaymentDetail from "./routes/DuesPaymentDetail";
import GameDetail from "./routes/GameDetail";
import Home from "./routes/Home";
import IsPlayerMyAllGameList from "./routes/IsPlayerMyAllGameList";
import IsPlayerMyAllGoalGameList from "./routes/IsPlayerMyAllGoalGameList";
import IsPlayerMyAllVoteList from "./routes/IsPlayerMyAllVoteList";
import KakaoConfirm from "./routes/KakaoConfirm";
import NotFound from "./routes/NotFound";
import PlayerGameList from "./routes/PlayerGameList";
import PlayerGoalGameList from "./routes/PlayerGoalGameList";
import PlayerProfile from "./routes/PlayerProfile";
import PlayerVoteList from "./routes/PlayerVoteList";
import SearchTeam from "./routes/SearchTeam";
import TeamGameList from "./routes/TeamGameList";
import TeamHome from "./routes/TeamHome";
import TeamPlayerList from "./routes/TeamPlayerList";
import TeamVoteList from "./routes/TeamVoteList";
import UpdateGame from "./routes/UpdateGame";
import UpdateTeam from "./routes/UpdateTeam";
import UploadGame from "./routes/UploadGame";
import Help from "./routes/Help";
import DuesDetailsDetail from "./routes/DuesDetailsDetail";
import FAQ from "./routes/FAQ";
import GameQuotas from "./routes/GameQuotas";
import UploadGameQuotas from "./routes/UploadGameQuotas";
import UpdateGameQuota from "./routes/UpdateGameQuota";
import TeamScheduleReadOnly from "./routes/TeamScheduleReadOnly";
import DuesPaymentDetailReadOnly from "./routes/DuesPaymentDetailReadOnly";
import DuesDetailsDetailReadOnly from "./routes/DuesDetailsDetailReadOnly";
import GameQuotasReadOnly from "./routes/GameQuotasReadOnly";

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
                            path : "isplayer/votes",
                            element : <IsPlayerMyAllVoteList />
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
                    path : "teams/:teamPk/votes",
                    element : <TeamVoteList />
                },
                {
                    path : "teams/:teamPk/players",
                    element : <TeamPlayerList />
                },
                {
                    path : "teams/:teamPk/schedules/readonly",
                    element : <TeamScheduleReadOnly />,
                },
                {
                    path : "teams/:teamPk/dues/payment",
                    element : <DuesPayment />
                },
                {
                    path : "teams/:teamPk/dues/payment/:paymentPk",
                    element : <DuesPaymentDetail />
                },
                {
                    path : "teams/:teamPk/dues/payment/:paymentPk/readonly",
                    element : <DuesPaymentDetailReadOnly />
                },
                {
                    path : "teams/:teamPk/dues/details",
                    element : <DuesDetail />
                },
                {
                    path : "teams/:teamPk/dues/details/:detailPk",
                    element : <DuesDetailsDetail />
                },
                {
                    path : "teams/:teamPk/dues/details/:detailPk/readonly",
                    element : <DuesDetailsDetailReadOnly />
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
                    path : "players/:playerPk/votes",
                    element : <PlayerVoteList />
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
                    path : "games/:gamePk/quotas/upload",
                    element : <UploadGameQuotas />
                },
                {
                    path : "games/:gamePk/quotas",
                    element : <GameQuotas />
                },
                {
                    path : "games/:gamePk/quotas/readonly",
                    element : <GameQuotasReadOnly />
                },
                {
                    path : "games/:gamePk/quotas/:quotaPk/edit",
                    element : <UpdateGameQuota />
                },
                {
                    path : "community",
                    element : <Community />
                },
                {
                    path : "help",
                    element : <Help />
                },
                {
                    path : "help/faq",
                    element : <FAQ />
                }
            ],
            errorElement : <NotFound />,
        }
    ]
)

export default router;