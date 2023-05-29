import useUser from "../lib/useUser";
import ProtectedPage from "../components/ProtectedPage";
import IsPlayerTeamHome from "./IsPlayerTeamHome";
import IsSpvsrTeamHome from "./IsSpvsrTeamHome";

export default function TeamHome() {
    const { user } = useUser();
    return (
        <ProtectedPage>
            <>
            {user?.is_player ? <IsPlayerTeamHome /> : (
                            user?.is_spvsr ? <IsSpvsrTeamHome /> : null
                            )}
            </>
        </ProtectedPage>
    )
}