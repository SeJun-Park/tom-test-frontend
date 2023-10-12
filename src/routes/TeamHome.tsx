import useUser from "../lib/useUser";
import ProtectedPage from "../components/ProtectedPage";
import IsPlayerTeamHome from "./IsPlayerTeamHome";
import IsSpvsrTeamHome from "./IsSpvsrTeamHome";
import IsNotLoggedInTeamHome from "./IsNotLoggedInTeamHome";

export default function TeamHome() {
    const { userLoading, isLoggedIn, user } = useUser();
    return (
        <>
            {!userLoading && (
                !isLoggedIn ? <IsNotLoggedInTeamHome /> : (
                    user?.is_player ? <IsPlayerTeamHome /> : (
                        user?.is_spvsr ? <IsSpvsrTeamHome /> : null
                    )
                )
            )}
        </>
    )
}