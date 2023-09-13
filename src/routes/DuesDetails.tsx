import useUser from "../lib/useUser";
import ProtectedPage from "../components/ProtectedPage";
import IsPlayerDuesDetails from "./IsPlayerDuesDetails";
import IsSpvsrDuesDetails from "./IsSpvsrDuesDetails";

export default function DuesDetail() {
    const { user } = useUser();
    return (
        <ProtectedPage>
            <>
            {user?.is_player ? <IsPlayerDuesDetails /> : (
                            user?.is_spvsr ? <IsSpvsrDuesDetails /> : null
                            )}
            </>
        </ProtectedPage>
    )
}