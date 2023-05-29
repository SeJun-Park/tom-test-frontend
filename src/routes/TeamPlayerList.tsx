import useUser from "../lib/useUser";
import ProtectedPage from "../components/ProtectedPage";
import IsSpvsrTeamPlayerList from "./IsSpvsrTeamPlayerList";
import IsPlayerTeamPlayerList from "./IsPlayerTeamPlayerList";


export default function TeamHome() {
    const { user } = useUser();
    return (
        <ProtectedPage>
            <>
            {user?.is_player ? <IsPlayerTeamPlayerList /> : (
                            user?.is_spvsr ? <IsSpvsrTeamPlayerList /> : null
                            )}
            </>
        </ProtectedPage>
    )
}