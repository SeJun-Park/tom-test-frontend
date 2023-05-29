import useUser from "../lib/useUser";
import ProtectedPage from "../components/ProtectedPage";
import IsPlayerTeamTOMList from "./IsPlayerTeamTOMList";
import IsSpvsrTeamTOMList from "./IsSpvsrTeamTOMList";


export default function TeamTOMList () {
    const { user } = useUser();
    return (
        <ProtectedPage>
            <>
            {user?.is_player ? <IsPlayerTeamTOMList /> : (
                            user?.is_spvsr ? <IsSpvsrTeamTOMList /> : null
                            )}
            </>
        </ProtectedPage>
    )
}