import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaUserNinja } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { spvsrSignUp } from "../api";
import SocialLogin from "./SocialLogin";

interface SpvsrSignUpModalProps {
    isOpen : boolean;
    onClose : () => void;
}

interface ISpvsrSignUpForm {
    email : string;
    username : string;
    password : string;
}

export default function SignUpModal( props : SpvsrSignUpModalProps ) {

    const { register, handleSubmit, formState : {errors}, reset : SignUpFormReset } = useForm<ISpvsrSignUpForm>();

    const toast = useToast();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

/////////////////////////////백엔드에서 signUp 후에 login 시키는 것으로 해결////////////////////////////////////////////////////////////


    // const loginMutation = useMutation(usernameLogIn, {
    //         onMutate : () => {
    //                 console.log("log-in mutation starting");
    //                 },
    //         // mutation이 시작되면 호출됨
    //         onSuccess : (data) => {
    //                 console.log("log-in mutation successful")
    //         // data.ok
    //                 toast({
    //                     title : "LogIn success.",
    //                     status : "success"
    //                     });
    //                 queryClient.refetchQueries(["me"]);
    //                 },
    //         onError : (error) => {
    //                 console.log("log-in mutation error")
    //                 }
    //         });


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const signupMutation = useMutation(spvsrSignUp, {
        onMutate : () => {
            console.log("sign up mutation starting");
        },
        onSuccess : (data) => {
            console.log("sign up mutation success");
            toast({
                title : "sign-up success.",
                status : "success"
            });
            props.onClose();
            queryClient.refetchQueries(["me"]);
            SignUpFormReset();
            navigate("/")
        },
        onError : (error) => {
            console.log("sign up mutation error");
            console.log(error)
        }
    });

    
    const onSubmit = ({ email, username, password } : ISpvsrSignUpForm) => {
        signupMutation.mutate({ email, username, password });
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> Player Sign Up </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                <SocialLogin />
                <VStack>
                    <InputGroup>
                        <InputLeftElement children={
                            <Box color={"gray.500"}>
                                <FaEnvelope />
                            </Box>
                    }/>
                        <Input {...register("email", { required : "이메일을 입력해주세요." })} isInvalid={Boolean(errors.email?.message)} required placeholder="Email" variant={"filled"}/>
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement children={
                            <Box color={"gray.500"}>
                                <FaUserNinja />
                            </Box>
                    }/>
                        <Input {...register("username", { required : "username을 입력해주세요." })} isInvalid={Boolean(errors.username?.message)} required placeholder="Username" variant={"filled"}/>
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement children={
                            <Box color={"gray.500"}>
                                <FaLock />
                            </Box>
                    }/>
                        <Input type={"password"} {...register("password", { required : "패스워드를 입력해주세요." })} isInvalid={Boolean(errors.password?.message)} required placeholder="Password" variant={"filled"}/>
                    </InputGroup>
                </VStack>
                {signupMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> something is wrong </Text>) : null}
                <Button isLoading={signupMutation.isLoading} type="submit"  backgroundColor={"main.500"} color={"white"} width={"100%"} marginTop={4}> Spvsr Sign Up </Button>
            </ModalBody>
            {/* <ModalFooter>
                <Button onClick={onClose} colorScheme={"red"}> close </Button>
            </ModalFooter> */}
        </ModalContent>
    </Modal>
    )
}