import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import { IUser } from "../types";

export default function useUser() {
    const { isLoading, data, isError } = useQuery<IUser>(["me"], getMe, {
        retry : false,
    });
                            // error는 error의 내용을, isError는 query의 error 발생 여부를 True or False로 반환함
    return {
        userLoading : isLoading,
        // isLoading : isLoading,
        user : data,
        isLoggedIn : !isError,
        // isLoggedIn 값은 isError의 반대 값을 가짐.
        // isError = True --> users/me api 호출에 문제가 생김 --> authentication이 안돼있다는 뜻 --> 로그인이 안돼있다는 뜻이므로 --> isLoggedIn = False
        // isError = False --> users/me api 호출에 문제가 없음 --> authentication이 잘됐다는 뜻 --> 로그인이 돼있다는 뜻이므로 --> isLoggedIn = True
    }

}