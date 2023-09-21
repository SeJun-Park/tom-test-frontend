import { Box, Button, HStack, Modal, ModalBody, ModalContent, ModalOverlay, Text, ToastId, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut, updateMe } from "../api";
import { useEffect, useRef } from "react";
import useUser from "../lib/useUser";
import { FaRunning, FaUserCog } from "react-icons/fa";
import { Helmet } from "react-helmet";

export default function RoleSelectModal() {

    const { userLoading, isLoggedIn, user} = useUser();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        onOpen();
      }, [onOpen]);

    const toast = useToast();
    const toastId = useRef<ToastId>();
    const queryClient = useQueryClient();

    const loginByRoleMutation = useMutation(updateMe, {
        onSuccess : (data) => {
            console.log("login by role successful")
            // data.ok
            toast({
                title : "로그인 성공",
                status : "success",
                duration : 1000
            });
            onClose();
            queryClient.refetchQueries(["me"])
        },
    });

    const logoutMutation = useMutation(logOut, {
        onMutate : () => { 
            toastId.current = toast({
            title: "로그아웃...",
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
                title : "로그아웃 성공!",
                description : "다음에 만나요.",
                duration : 1000
            })
        }

        },
        onError : (error) => {

        }
    })

    const onLogOutBtnClick = async() => {
        logoutMutation.mutate();
    }

    const isSpvsrBtnOnClick = () => {
        const is_spvsr = true;
        const is_player = false;

        loginByRoleMutation.mutate({ is_spvsr, is_player })
    }
    const isPlayerBtnOnClick = () => {
        const is_spvsr = false;
        const is_player = true;

        loginByRoleMutation.mutate({ is_spvsr, is_player })
    }

    if (!userLoading && user?.is_player === true || user?.is_spvsr === true ) {
        return null;
    }


    return (
        <>
        <Helmet>
            <title>{ "3OM | 로그인" }</title>
        </Helmet>
    <Modal motionPreset="slideInBottom" size={"3xl"} isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay 
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalBody>
            <HStack spacing={3}>
                <Button 
                    onClick={isSpvsrBtnOnClick} 
                    isLoading={loginByRoleMutation.isLoading} 
                    width="50%" 
                    height={100}
                    backgroundColor="main.500" 
                    color="white"
                >
                            <VStack>
                                <Box>
                                    <FaUserCog />
                                </Box>
                                <Text>관리자로 로그인</Text>
                            </VStack>
                </Button>
                <Button 
                    onClick={isPlayerBtnOnClick} 
                    isLoading={loginByRoleMutation.isLoading} 
                    width="50%" 
                    height={100}
                    backgroundColor="point.500" 
                    color="black"
                >
                    <VStack>
                        <Box>
                            <FaRunning />
                        </Box>
                        <Text>플레이어로 로그인</Text>
                    </VStack>
                </Button>
            </HStack>
            <VStack>
                <Button onClick={onLogOutBtnClick} mt={3} mb={1} variant={"unstyled"} color={"gray.300"} size={"xs"} textDecoration={"underline"}>로그아웃</Button>
            </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
    </>
    )
}