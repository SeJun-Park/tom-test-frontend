import useUser from "../lib/useUser";
import ProtectedPage from "../components/ProtectedPage";
import IsPlayerTeamVoteList from "./IsPlayerTeamVoteList";
import IsSpvsrTeamVoteList from "./IsSpvsrTeamVoteList";


export default function TeamVoteList () {
    const { user } = useUser();
    return (
        <ProtectedPage>
            <>
            {user?.is_player ? <IsPlayerTeamVoteList /> : (
                            user?.is_spvsr ? <IsSpvsrTeamVoteList /> : null
                            )}
            </>
        </ProtectedPage>
    )
}