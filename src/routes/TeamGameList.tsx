import useUser from "../lib/useUser";
import IsPlayerTeamGameList from "./IsPlayerTeamGameList";
import IsSpvsrTeamGameList from "./IsSpvsrTeamGameList";
import IsNotLoggedInTeamGameList from "./IsNotLoggedInTeamGameList";

export default function TeamGameList() {
    const { userLoading, isLoggedIn, user} = useUser();
    return (
        <>
            {!userLoading && (
                !isLoggedIn ? <IsNotLoggedInTeamGameList /> :
                                                        (user?.is_player ? <IsPlayerTeamGameList /> : 
                                                                                                    (user?.is_spvsr ? <IsSpvsrTeamGameList /> : null))
            )}
        </>
    )
}