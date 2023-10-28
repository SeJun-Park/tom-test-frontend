import useUser from "../lib/useUser";
import IsPlayerGameQuotas from "./IsPlayerGameQuotas";
import IsSpvsrGameQuotas from "./IsSpvsrGameQuotas";
import IsNotLoggedInGameQuotas from "./IsNotLoggedInGameQuotas";

export default function GameQuotas() {
    const { userLoading, isLoggedIn, user} = useUser();
    return (
        <>
            {!userLoading && (
                !isLoggedIn ? <IsNotLoggedInGameQuotas /> :
                                                        (user?.is_player ? <IsPlayerGameQuotas /> : 
                                                                                                    (user?.is_spvsr ? <IsSpvsrGameQuotas /> : null))
            )}
        </>
    )
}