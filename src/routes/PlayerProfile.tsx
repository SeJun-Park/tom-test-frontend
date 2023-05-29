import useUser from "../lib/useUser";
import ProtectedPage from "../components/ProtectedPage";
import IsPlayerPlayerProfile from "./IsPlayerPlayerProfile";
import IsSpvsrPlayerProfile from "./IsSpvsrPlayerProfile";


export default function TeamHome() {
    const { user } = useUser();
    return (
        <ProtectedPage>
            <>
            {user?.is_player ? <IsPlayerPlayerProfile /> : (
                            user?.is_spvsr ? <IsSpvsrPlayerProfile /> : null
                            )}
            </>
        </ProtectedPage>
    )
}