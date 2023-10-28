import useUser from "../lib/useUser";
import IsNotLoggedInDuesPayment from "./IsNotLoggedInDuesPayment";
import IsPlayerDuesPayment from "./IsPlayerDuesPayment";
import IsSpvsrDuesPayment from "./IsSpvsrDuesPayment";

export default function DuesPayment() {
    const { userLoading, isLoggedIn, user} = useUser();
    return (
        <>
            {!userLoading && (
                !isLoggedIn ? <IsNotLoggedInDuesPayment /> :
                                                        (user?.is_player ? <IsPlayerDuesPayment /> : 
                                                                                                    (user?.is_spvsr ? <IsSpvsrDuesPayment /> : null))
            )}
        </>
    )
}