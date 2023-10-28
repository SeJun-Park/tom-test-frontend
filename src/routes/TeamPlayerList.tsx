import useUser from "../lib/useUser";
import IsSpvsrTeamPlayerList from "./IsSpvsrTeamPlayerList";
import IsPlayerTeamPlayerList from "./IsPlayerTeamPlayerList";
import IsNotLoggedInTeamPlayerList from "./IsNotLoggedInTeamPlayerList";


export default function TeamPlayerList() {
    const { userLoading, isLoggedIn, user} = useUser();
    return (
        <>
            {!userLoading && (
                !isLoggedIn ? <IsNotLoggedInTeamPlayerList /> :
                                                        (user?.is_player ? <IsPlayerTeamPlayerList /> : 
                                                                                                    (user?.is_spvsr ? <IsSpvsrTeamPlayerList /> : null))
            )}
        </>
    )
}