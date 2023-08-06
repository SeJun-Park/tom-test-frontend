import { useForm } from "react-hook-form";
import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { FaLock, FaUserNinja } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ISpvsrLoginError, ISpvsrLoginSuccess, ISpvsrLoginVariables, spvsrLogIn } from "../api";

interface LoginModalProps {
    isOpen : boolean;
    onClose : () => void;
}

interface ILogInForm {
    username : string;
    password : string;
}

export default function LoginModal( props : LoginModalProps ) {

    const { register, handleSubmit, formState : {errors}, reset : logInFormReset } = useForm<ILogInForm>();
        // register는 form에 Input을 등록(register)하는데 사용함
            // register 라는 함수를 name과 함께 호출하면, {...register("username")} --> name, onBlur, onChange, ref가 포함된 Object가 생성되는 것과 같음
            // 그리고 ... 연산자로 우린 이 네가지를 컴포넌트에 prop인 것처럼 넣어줄 수 있음 <Input required {...register("username")} placeholder="username" variant={"filled"}/>
        // watch --> {username: '', password: ''} ~ Form 관련 객체를 볼 수 있고 접근할 수 있음
            // console.log(watch());
        // handleSubmit --> data validate(검증)
            // onSubmit 함수를 따로 정의하고, <ModalBody as="form" onSubmit={handleSubmit(onSubmit)} ~ > 이런 식으로 사용
            // onSubmit 기능
                // Form 관련 data를 data라는 인자로 받아옴
            // validation 기능
            // event.preventDefault 기능
        // formState : {errors}
            // error 를 기지고 올 수 있음, isInvalid={Boolean(errors.username?.message)}
        // setValue : 특정한 값을 수정할 수 있음 --> setValue("username", "sejunpark")
        // reset  : form을 초기화 시켜줌


    const toast = useToast();
    const queryClient = useQueryClient();
    const loginMutation = useMutation<ISpvsrLoginSuccess, ISpvsrLoginError, ISpvsrLoginVariables>(spvsrLogIn, {
                                // useMutation은 3개의 generic을 받을 수 있는데 첫 번째 any는 mutation이 성공했을 때 return할 {data}, 
                                // 두 번쨰 unknown은 에러가 있을 때 return할 {error}
                                // 세 번째는 아마 usernameLogIn 에서 사용될 인자, onSubmit 에서 받아서 mutation.mutate 를 통해서 넘어갈
                                // 아마 네 번째도 있는 듯,
                                // onSuccess 의 data args, onError 의 error args, usernameLogIn 의 args, ...
                                // 이 세개의 제네릭은 필수가 아님!
        onMutate : () => {
            console.log("log-in mutation starting");
        },
        // mutation이 시작되면 호출됨
        onSuccess : (data) => {
            console.log("log-in mutation successful")
            // data.ok
            toast({
                title : "LogIn success.",
                status : "success"
            });
            props.onClose();
            queryClient.refetchQueries(["me"]);
            logInFormReset();
        },
        // mutation이 성공하면 호출됨
        onError : (error) => {
            console.log("log-in mutation error")
            // error.error
        },
        // mutation이 에러가 있으면 호출됨
    });

    const onSubmit = ({ username, password }:ILogInForm) => {
        loginMutation.mutate({ username, password });
        // data:ILogInForm 으로 받고, mutation.mutate({ data.username, data.password }) 로 받고 싶은데 안됨
        // console.log(data)
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 플레이어로 로그인하기 </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                <SocialLogin />
                <VStack>
                    <InputGroup>
                        <InputLeftElement children={
                            <Box color={"gray.500"}>
                                <FaUserNinja />
                            </Box>
                    }/>
                        <Input isInvalid={Boolean(errors.username?.message)} required {...register("username", { required : "이름을 입력해주세요." })} placeholder="사용자 이름" variant={"filled"}/>
                                  {/* errors.username 에 어떤 msg가 있다면 이 input은 Invalid 하다는 의미  */}                                                {/* required : true 라고만 해도 됨 */}
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement children={
                            <Box color={"gray.500"}>
                                <FaLock />
                            </Box>
                    }/>
                        <Input isInvalid={Boolean(errors.password?.message)} required {...register("password", { required : "패스워드를 입력해주세요." })} type="password" placeholder="비밀번호" variant={"filled"}/>
                                            {/* errors.password 에 어떤 msg가 있다면 이 input은 Invalid 하다는 의미  */}  
                    </InputGroup>
                </VStack>
                {loginMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> Username or Password are wrong </Text>) : null}
                <Button isLoading={loginMutation.isLoading} type="submit" backgroundColor={"main.500"} color={"white"} width={"100%"} marginTop={4}> 관리자로 로그인 </Button>
            </ModalBody>
            {/* <ModalFooter>
                <Button onClick={onClose} colorScheme={"red"}> close </Button>
            </ModalFooter> */}
        </ModalContent>
    </Modal>
    )
}