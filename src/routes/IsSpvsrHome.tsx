import { useQuery } from "@tanstack/react-query";
import { isSpvsr } from "../api";
import ProtectedPage from "../components/ProtectedPage"
import { ISpvsrUser } from "../types";
import TeamRegister from "./TeamRegister";
import { Helmet } from "react-helmet";
import SpvsrOnlyPage from "../components/SpvsrOnlyPage";
import SpvsrHome from "./SpvsrHome";
import { Spinner, VStack } from "@chakra-ui/react";

export default function IsSpvsrHome() {
    const { isLoading : spvsrLoading, data : spvsrData, isError : spvsrError } = useQuery<ISpvsrUser>(["isSpvsr"], isSpvsr); 

    return (
        <SpvsrOnlyPage>
            <ProtectedPage>
                <Helmet>
                    <title>{ spvsrData ? ("3OM | Home") : "Loading.." }</title>
                </Helmet>
                {!spvsrLoading ? spvsrData?.team ? 
                                <SpvsrHome />
                                : <TeamRegister />
                                : 
                                    <VStack justifyContent={"center"} my={60}>
                                        <Spinner size={"lg"} />
                                    </VStack>
                                }
                
            </ProtectedPage>
        </SpvsrOnlyPage>
    )
}