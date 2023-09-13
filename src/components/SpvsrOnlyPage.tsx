import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";

interface ISpvsrOnlyPageProps {
    children : React.ReactNode;
}


export default function SpvsrOnlyPage({ children } : ISpvsrOnlyPageProps) {
    const { userLoading, user } = useUser();
    // useUser는 Header에서 제일 먼저 실행되기 때문에 그 상태에서 ProtectedPage에서 호출되더라도 캐시 데이터를 불러오기 때문에 속도가 아주 빠를 것

    const navigate = useNavigate();

    useEffect(() => {
        if(!userLoading) {
            if(!user?.is_spvsr) {
                navigate("/")
                    // user가 Loading이 완료되었는데 Login 상태가 아니라면 "/"로 보내버린다.
            }
        }
    }, [userLoading, user, navigate])

    return (<> { children } </>)
    // 여기서 children은 component 안에 있는 Element들을 말함, 굳이 props로 넘겨받지 않아도 <ProtectedPage></ProtectedPage> 안에 포함시키면 그렇게 인식함
}