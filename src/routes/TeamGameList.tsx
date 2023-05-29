import useUser from "../lib/useUser";
import ProtectedPage from "../components/ProtectedPage";
import IsPlayerTeamGameList from "./IsPlayerTeamGameList";
import IsSpvsrTeamGameList from "./IsSpvsrTeamGameList";

export default function TeamGameList() {
    const { user } = useUser();
    return (
        <ProtectedPage>
            <>
            {user?.is_player ? <IsPlayerTeamGameList /> : (
                            user?.is_spvsr ? <IsSpvsrTeamGameList /> : null
                            )}
            </>
        </ProtectedPage>
    )
}