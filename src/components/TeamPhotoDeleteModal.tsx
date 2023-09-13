import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamPhotoDelete } from "../api";
import { useForm } from "react-hook-form";

interface TeamPhotoDeleteModalProps {
    isOpen : boolean;
    onClose : () => void;
}

export default function TeamPhotoDeleteModal ( props : TeamPhotoDeleteModalProps ) {

    const { register, handleSubmit, formState : {errors}, reset : teamPhotoDeleteFormReset } = useForm();

    const toast = useToast();
    const queryClient = useQueryClient()

    const teamPhotoDeleteMutation = useMutation(teamPhotoDelete, {
        onSuccess : (data) => {
            console.log("team photo delete successful")
            // data.ok
            toast({
                title : "팀 프로필 사진 삭제 성공",
                status : "success",
                duration : 1000
            });
            props.onClose();
            queryClient.refetchQueries(["isSpvsr"])
            queryClient.refetchQueries(["isSpvsrTeam"])
        },
    });

    const onSubmit = () => {
        teamPhotoDeleteMutation.mutate();
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 팀 프로필 사진을 삭제하시겠습니까? </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Button type={"submit"} isLoading={teamPhotoDeleteMutation.isLoading} size={"md"} width="100%" backgroundColor={"black"} color={"white"}> 삭제하기 </Button>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}