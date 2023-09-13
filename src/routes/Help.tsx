import useUser from "../lib/useUser";
import ProtectedPage from "../components/ProtectedPage";
import IsPlayerHelp from "./IsPlayerHelp";
import IsSpvsrHelp from "./IsSpvsrHelp";

export default function Help() {
    const { user } = useUser();
    return (
        <ProtectedPage>
            <>
            {user?.is_player ? <IsPlayerHelp /> : (
                            user?.is_spvsr ? <IsSpvsrHelp /> : null
                            )}
            </>
        </ProtectedPage>
    )
}