import { Box, Button, Stack, HStack, IconButton, LightMode, useColorMode, useColorModeValue, useDisclosure, Menu, MenuButton, MenuList, MenuItem, useToast, ToastId } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { FaFutbol, FaMoon, FaRunning, FaSearch, FaSun, FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../api";
import useUser from "../lib/useUser";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header() {
    const { userLoading, isLoggedIn, user} = useUser();
        // 로그인 여부를 확인하고 로그인 유저의 정보를 가져오는 Hook
        // 이 때 받아오는 userLoading은 users/me의 useQuery의 property isLoading을 그대로 받아오는 것임
    const { isOpen:isLoginOpen, onClose:onLoginClose, onOpen:onLoginOpen } = useDisclosure();
    const { isOpen:isSignUpOpen, onClose:onSignUpClose, onOpen:onSignUpOpen } = useDisclosure();
        // 이런 식으로 두 개의 모달에 모두 prop을 넘겨줄 수 있음
    const { colorMode, toggleColorMode } = useColorMode();  
        // colorMode, colorMode를 Toggle 시키는 함수를 줌
    const logoColor = useColorModeValue("main.500", "white");
        // 첫 번째 인자는 light 모드일 떄 반환되고, 두 번째 인자는 dark 모드일 때 반환됨
    const Icon = useColorModeValue(FaMoon, FaSun);

    const toast = useToast();
    const queryClient = useQueryClient()
    const toastId = useRef<ToastId>();
        // useRef는 state에 넣고 싶지는 않은 VALue를 저장할 떄 사용함
        // 컴포넌트가 re-rendering 되어도 유지
    const navigate = useNavigate();

    const logoutMutation = useMutation(logOut, {
        onMutate : () => { 
            toastId.current = toast({
            title: "LogOut...",
            description: "Bye...",
            status: "loading",
            position : "bottom-right",
            // duration: 2000,
            // isClosable: false,
            })
        },
        onSuccess : (data) => {
            queryClient.refetchQueries(["me"])
        
        if(toastId.current){
            toast.update(toastId.current, {
                status : "success",
                title : "Done!",
                description : "See you later"
            })
        }

        },
        onError : (error) => {

        }
    })

    const onLogOut = async() => {
        logoutMutation.mutate();
    }

    const linkToTeamSearch = () => {
        navigate("/teams/search")
    }

    return (
        <Stack 
            backgroundColor={"inherit"}
            justifyContent={"space-between"} alignItems={"center"}
            py={5} px={{
                base:10,
                lg:40
                    // 내가 추가한 내용
            }} 
            borderBottomWidth={0} 
            spacing={{
                sm:4,
                md:0,
            }}
            direction={{
                sm:"column",
                md:"row"
                // HStack 이나 VStack을 쓰면 이렇게 활용할 수 없음, Stack을 쓰면 됨
            }}
            >
            {/* py는 수직방향 padding, px는 수평방향 padding */}
            {/* "" 없이 숫자로만 적는 것과 "" 안에 적는 건 무슨 차이지? HStack은 Chakra의 것, FaAirbnb는 React-icons의 것이라 다른 듯? Chakra의 경우 숫자만 적으면 rem으로 적용되는 듯 */}
            <Link to={"/"}>
                <HStack color={logoColor} alignItems={"flex-end"} spacing={0}>
                    <FaRunning size={"24"} />
                    <FaFutbol size={"6"} />
                    {/* <Image src={logo} alt="Logo" boxSize={"24"} /> */}
                    {/* <FaAirbnb size={"48"} /> */}
                    {/* 해당 아이콘은 Chakra의 것이 아니므로 react-icons의 룰을 따라야 함 */}
                    {/* 따라서 Box로 감싸서 Chakra의 룰을 따를 수 있도록 하고 있음, 편의성, 일관성을 위해서 */}
                </HStack>
            </Link>
            <HStack spacing={2}>
                {/* <Link to={"teams/search"}>
                    <Button variant={"ghost"}>
                        <HStack>
                            <Box >
                                <FaSearch />
                            </Box>
                        </HStack>
                    </Button>
                </Link> */}
                <IconButton onClick={linkToTeamSearch} aria-label="Team Search" icon={<FaSearch />} variant={"ghost"}/>
                <IconButton onClick={toggleColorMode} aria-label="Toggle dark mode" icon={<Icon />} variant={"ghost"}/>
                                                                                                {/* icon={colorMode === "light" ? <FaMoon /> : <FaSun />} */}
                                                                                                {/* Dark Mode / Light Mode 에 따라 다르게 적용하는 건 이 방법도 있지만 짧은 방법도 있음, AirBnB 아이콘에서 확인 */}
                {!userLoading ? (
                    !isLoggedIn ? 
                    // react Query는 fetch에 실패하더라도 여러 번 재시도를 하게 돼있음
                    // 따라서 useQuery를 통해서 useUser의 반환값 userLoading, isLoggedIn을 받아와 판단하기까지 시간이 걸림
                    // 따라서 재시도를 하지 않게 만들기 위해서는 useUser에서 useQuery 설정을 따로 해줘야 함 --> {retry : false} 추가
                <>
                    {/* <Button onClick={onLoginOpen}> Log In </Button> */}
                    {/* <LightMode> */}
                        {/* <Button onClick={onSignUpOpen} backgroundColor={"main.500"} color="white"> Sign Up </Button> */}
                            {/* <LightMode></LightMode> 안에 컴포넌트를 넣으면 늘 라이트모드로 해당 컴포넌트를 유지시킬 수 있음 */}
                    {/* </LightMode> */}
                </>
                    // fragment를 사용하는 이유 : 공통된 부모가 없는 두 개의 element를 반환하는 것은 react의 룰에 위배되기 때문
                : (
                <Menu>
                    <MenuButton>
                        {/* <Avatar size={"md"} name={user?.name} src={user?.avatar} /> */}
                        <FaUserAlt />
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={onLogOut}> Log Out </MenuItem>
                    </MenuList>
                </Menu>
                )
                    ) : null}
                
            </HStack>
            {/* <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} /> */}
            {/* <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose}/> */}
        </Stack>
    );
}