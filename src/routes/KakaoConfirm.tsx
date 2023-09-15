import { Heading, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoLogIn } from "../api";
import Empty from "../components/Empty";

export default function KakaoConfirm() {

    const kakaoMutation = useMutation(kakaoLogIn, {
        onMutate : () => {
            console.log("kakao login mutation on mutate")
        },
        onSuccess : () => {
            toast({
                status : "success",
                title : "환영합니다!",
                description : "Happy 3OM!",
                position : "bottom-right",
                duration : 1000
            })
            queryClient.refetchQueries(["me"]);
            navigate("/");
        },
        onError : () => {
            console.log("kakao login mutation on error")
        }
    })

    const { search } = useLocation();
        // useLocation Hook은 우리가 있는 위치를 알려줌 (url)
        // useLocation이 반환하는 객체 안에 Search 안에 code가 들어있음
        // search => ?code=wqghoqghqi 와 같은 형태가 될 것 [params가 더 있따면 뒤에 추가될 것]

    const toast = useToast();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const confirmLogIn = async () => {
        const params = new URLSearchParams(search);
        // search에서 찾아낸 params들을 object로 만들어주는 듯
        const code = params.get("code");
        // params object에서 code를 추출하고 있음
        if (code) {
            kakaoMutation.mutate({code})
        }
    }
    useEffect(() => {
        confirmLogIn();
    }, [])    

    return (
    <VStack justifyContent={"center"} mt={40}>
        <Heading> 로그인 중... </Heading>
        <Text> 3OM에 오신 걸 환영합니다. </Text>
        <Spinner size={"lg"} />
        <Empty />
        <Empty />
        <Empty />
        <Empty />
        <Empty />
        <Empty />
        <Empty />
        <Empty />
    </VStack>
    // NotFound 코드 복사해옴
    )
}