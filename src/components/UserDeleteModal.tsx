import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userDelete } from "../api";
import { useNavigate } from "react-router-dom";

interface UserDeleteModalProps {
    isOpen : boolean;
    onClose : () => void;
}

export default function UserDeleteModal ( props : UserDeleteModalProps ) {

    const navigate = useNavigate();

    const toast = useToast();
    const queryClient = useQueryClient()

    const userDeleteMutation = useMutation(userDelete, {
        onSuccess : (data) => {
            console.log("user delete successful")
            // data.ok
            toast({
                title : "회원 탈퇴 성공",
                status : "success"
            });
            props.onClose();
            navigate("/")
            queryClient.refetchQueries(["game"])
        },
    });

    const onClick = () => {
        userDeleteMutation.mutate();
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 정말 회원을 탈퇴하시겠습니까? </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <VStack alignItems={"flex-start"}>
                    <Text fontSize={"sm"} color={"gray"}> 회원을 탈퇴하면 삼오엠에 저장된 사용자 정보는 <br/> 모두 삭제되지만, 카카오 연동은 유지됩니다. </Text>
                    <Text fontSize={"xs"} color={"gray"}> *카카오 연동은 카카오톡에 접속하여 아래 경로를 통해 끊을 수 있습니다. <br/> 더보기 - 설정 - 카카오계정 - 연결된 서비스 관리 - 외부 서비스</Text>
                    {userDeleteMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> 문제가 발생했습니다. </Text>) : null}
                    <Button onClick={onClick} isLoading={userDeleteMutation.isLoading} size={"md"} width="100%" backgroundColor={"black"} color={"white"}> 탈퇴하기 </Button>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}