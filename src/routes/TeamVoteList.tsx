import useUser from "../lib/useUser";
import IsPlayerTeamVoteList from "./IsPlayerTeamVoteList";
import IsSpvsrTeamVoteList from "./IsSpvsrTeamVoteList";
import IsNotLoggedInTeamVoteList from "./IsNotLoggedInTeamVoteList";


export default function TeamVoteList () {
    const { userLoading, isLoggedIn, user} = useUser();
    return (
        <>
            {!userLoading && (
                !isLoggedIn ? <IsNotLoggedInTeamVoteList /> :
                                                        (user?.is_player ? <IsPlayerTeamVoteList /> : 
                                                                                                    (user?.is_spvsr ? <IsSpvsrTeamVoteList /> : null))
            )}
        </>
    )
}