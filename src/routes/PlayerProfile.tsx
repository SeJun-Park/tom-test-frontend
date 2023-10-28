import useUser from "../lib/useUser";
import IsPlayerPlayerProfile from "./IsPlayerPlayerProfile";
import IsSpvsrPlayerProfile from "./IsSpvsrPlayerProfile";
import IsNotLoggedInPlayerProfile from "./IsNotLoggedInPlayerProfile";


export default function TeamHome() {
    const { userLoading, isLoggedIn, user} = useUser();
    return (
        <>
            {!userLoading && (
                !isLoggedIn ? <IsNotLoggedInPlayerProfile /> :
                                                        (user?.is_player ? <IsPlayerPlayerProfile /> : 
                                                                                                    (user?.is_spvsr ? <IsSpvsrPlayerProfile /> : null))
            )}
        </>
    )
}