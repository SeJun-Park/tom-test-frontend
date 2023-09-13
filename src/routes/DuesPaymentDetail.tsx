import ProtectedPage from "../components/ProtectedPage";
import useUser from "../lib/useUser";
import IsPlayerDuesPaymentDetail from "./IsPlayerDuesPaymentDetail";
import IsSpvsrDuesPaymentDetail from "./IsSpvsrDuesPaymentdetail";

export default function DuesPaymentDetail() {
    const { user } = useUser();
    return (
        <ProtectedPage>
            <>
            {user?.is_player ? <IsPlayerDuesPaymentDetail /> : (
                            user?.is_spvsr ? <IsSpvsrDuesPaymentDetail /> : null
                            )}
            </>
        </ProtectedPage>
    )
}