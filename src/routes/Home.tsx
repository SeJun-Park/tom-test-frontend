import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";
import IsPlayerHome from "./IsPlayerHome";
import IsSpvsrHome from "./IsSpvsrHome";
import LogInRequired from "./LogInRequired";

export default function Home() {

    const { userLoading, isLoggedIn, user} = useUser();

    const navigate = useNavigate();

    if(!isLoggedIn) {
        navigate("/login/required")
    }

    return (
        <Box>
            {!userLoading ? (
                (user?.is_player ? <IsPlayerHome /> : (
                        user?.is_spvsr ? <IsSpvsrHome /> : null
                    )
                )
            ) : null}
        </Box>
    )
}