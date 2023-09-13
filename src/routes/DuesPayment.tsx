import useUser from "../lib/useUser";
import ProtectedPage from "../components/ProtectedPage";
import IsPlayerDuesPayment from "./IsPlayerDuesPayment";
import IsSpvsrDuesPayment from "./IsSpvsrDuesPayment";

export default function DuesPayment() {
    const { user } = useUser();
    return (
        <ProtectedPage>
            <>
            {user?.is_player ? <IsPlayerDuesPayment /> : (
                            user?.is_spvsr ? <IsSpvsrDuesPayment /> : null
                            )}
            </>
        </ProtectedPage>
    )
}