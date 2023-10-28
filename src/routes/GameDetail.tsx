import useUser from "../lib/useUser";
import IsNotLoggedInGameDetail from "./IsNotLoggedInGameDetail";
import IsPlayerGameDetail from "./IsPlayerGameDetail";
import IsSpvsrGameDetail from "./IsSpvsrGameDetail";

export default function GameDetail() {
    const { userLoading, isLoggedIn, user} = useUser();
    return (
        <>
            {!userLoading && (
                !isLoggedIn ? <IsNotLoggedInGameDetail /> :
                                                        (user?.is_player ? <IsPlayerGameDetail /> : 
                                                                                                    (user?.is_spvsr ? <IsSpvsrGameDetail /> : null))
            )}
        </>
    )
}