import useUser from "../lib/useUser";
import IsNotLoggedInDuesDetails from "./IsNotLoggedInDuesDetails";
import IsPlayerDuesDetails from "./IsPlayerDuesDetails";
import IsSpvsrDuesDetails from "./IsSpvsrDuesDetails";

export default function DuesDetails() {
    const { userLoading, isLoggedIn, user} = useUser();
    return (
        <>
            {!userLoading && (
                !isLoggedIn ? <IsNotLoggedInDuesDetails /> :
                                                        (user?.is_player ? <IsPlayerDuesDetails /> : 
                                                                                                    (user?.is_spvsr ? <IsSpvsrDuesDetails /> : null))
            )}
        </>
    )
}