import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { photoDelete } from "../api";
import { useForm } from "react-hook-form";

interface FeedPhotoDeleteModalProps {
    pk : number;
    isOpen : boolean;
    onClose : () => void;
    handleImageDeletion : () => void;
}

export default function FeedPhotoDeleteModal ( props : FeedPhotoDeleteModalProps ) {

    const photoPk = String(props.pk)
    const { handleSubmit, formState : {errors} } = useForm();

    const toast = useToast();
    const queryClient = useQueryClient()

    const feedPhotoDeleteMutation = useMutation(photoDelete, {
        onSuccess : (data) => {
            console.log("feed photo delete successful")
            props.handleImageDeletion();
            // data.ok
            toast({
                title : "사진 삭제 성공",
                status : "success",
                duration : 1000
            });
            props.onClose();
            queryClient.refetchQueries(["teamFeeds"])
        },
    });

    const onSubmit = () => {
        feedPhotoDeleteMutation.mutate({ photoPk })
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 사진을 삭제하시겠습니까? </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Button type={"submit"} isLoading={feedPhotoDeleteMutation.isLoading} size={"md"} width="100%" backgroundColor={"black"} color={"white"}> 삭제하기 </Button>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}