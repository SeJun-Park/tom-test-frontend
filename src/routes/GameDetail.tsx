import useUser from "../lib/useUser";
import ProtectedPage from "../components/ProtectedPage";
import IsPlayerGameDetail from "./IsPlayerGameDetail";
import IsSpvsrGameDetail from "./IsSpvsrGameDetail";

export default function GameDetail() {
    const { user } = useUser();
    return (
        <ProtectedPage>
            <>
            {user?.is_player ? <IsPlayerGameDetail /> : (
                            user?.is_spvsr ? <IsSpvsrGameDetail /> : null
                            )}
            </>
        </ProtectedPage>
    )
}