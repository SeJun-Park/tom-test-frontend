import useUser from "../lib/useUser";
import ProtectedPage from "../components/ProtectedPage";
import IsPlayerDuesDetailsDetail from "./IsPlayerDuesDetailsDetail";
import IsSpvsrDuesDetailsDetail from "./IsSpvsrDuesDetailsDetail";

export default function DuesDetailsDetail() {
    const { user } = useUser();
    return (
        <ProtectedPage>
            <>
            {user?.is_player ? <IsPlayerDuesDetailsDetail /> : (
                            user?.is_spvsr ? <IsSpvsrDuesDetailsDetail /> : null
                            )}
            </>
        </ProtectedPage>
    )
}