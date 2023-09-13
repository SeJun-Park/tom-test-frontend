import useUser from "../lib/useUser";
import ProtectedPage from "../components/ProtectedPage";
import IsPlayerGameDetail from "./IsPlayerGameDetail";
import IsSpvsrGameDetail from "./IsSpvsrGameDetail";
import IsPlayerGameQuotas from "./IsPlayerGameQuotas";
import IsSpvsrGameQuotas from "./IsSpvsrGameQuotas";

export default function GameQuotas() {
    const { user } = useUser();
    return (
        <ProtectedPage>
            <>
            {user?.is_player ? <IsPlayerGameQuotas /> : (
                            user?.is_spvsr ? <IsSpvsrGameQuotas /> : null
                            )}
            </>
        </ProtectedPage>
    )
}