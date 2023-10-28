import useUser from "../lib/useUser";
import IsNotLoggedInDuesPaymentDetail from "./IsNotLoggedInDuesPaymentDetail";
import IsPlayerDuesPaymentDetail from "./IsPlayerDuesPaymentDetail";
import IsSpvsrDuesPaymentDetail from "./IsSpvsrDuesPaymentdetail";

export default function DuesPaymentDetail() {
    const { userLoading, isLoggedIn, user} = useUser();
    return (
        <>
            {!userLoading && (
                !isLoggedIn ? <IsNotLoggedInDuesPaymentDetail /> :
                                                        (user?.is_player ? <IsPlayerDuesPaymentDetail /> : 
                                                                                                    (user?.is_spvsr ? <IsSpvsrDuesPaymentDetail /> : null))
            )}
        </>
    )
}