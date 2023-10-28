import useUser from "../lib/useUser";
import IsNotLoggedInDuesDetailsDetail from "./IsNotLoggedInDuesDetailsDetail";
import IsPlayerDuesDetailsDetail from "./IsPlayerDuesDetailsDetail";
import IsSpvsrDuesDetailsDetail from "./IsSpvsrDuesDetailsDetail";

export default function DuesDetailsDetail() {
    const { userLoading, isLoggedIn, user} = useUser();
    return (
        <>
            {!userLoading && (
                !isLoggedIn ? <IsNotLoggedInDuesDetailsDetail /> :
                                                        (user?.is_player ? <IsPlayerDuesDetailsDetail /> : 
                                                                                                    (user?.is_spvsr ? <IsSpvsrDuesDetailsDetail /> : null))
            )}
        </>
    )
}