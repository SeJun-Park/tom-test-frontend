import { Box } from "@chakra-ui/react";
import RoleSelectModal from "../components/RoleSelectModal";
import useUser from "../lib/useUser";
import IsPlayerHome from "./IsPlayerHome";
import IsSpvsrHome from "./IsSpvsrHome";
import LogInRequired from "./LogInRequired";

export default function Home() {

    const { userLoading, isLoggedIn, user} = useUser();
    return (
        <Box>
            {!userLoading ? (
                !isLoggedIn ? <LogInRequired /> : (
                    user?.is_player ? <IsPlayerHome /> : (
                        user?.is_spvsr ? <IsSpvsrHome /> : <RoleSelectModal />
                    )
                )
            ) : null}
        </Box>
    )
}