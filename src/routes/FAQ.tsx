import useUser from "../lib/useUser";
import ProtectedPage from "../components/ProtectedPage";
import IsPlayerFAQ from "./IsPlayerFAQ";
import IsSpvsrFAQ from "./IsSpvsrFAQ";

export default function FAQ() {
    const { user } = useUser();
    return (
        <ProtectedPage>
            <>
            {user?.is_player ? <IsPlayerFAQ /> : (
                            user?.is_spvsr ? <IsSpvsrFAQ /> : null
                            )}
            </>
        </ProtectedPage>
    )
}