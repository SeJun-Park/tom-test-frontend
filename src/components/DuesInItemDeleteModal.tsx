import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duesInItemDelete } from "../api";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

interface DuesInItemDeleteModalProps {
    isOpen : boolean;
    onClose : () => void;
    id : number;
}

export default function DuesInItemDeleteModal ( props : DuesInItemDeleteModalProps ) {

    const { teamPk } = useParams();
    const itemPk = String(props.id)

    const { handleSubmit, formState : {errors} } = useForm();

    const toast = useToast();
    const queryClient = useQueryClient()

    const duesInItemDeleteMutation = useMutation(duesInItemDelete, {
        onSuccess : (data) => {
            console.log("duesInItem delete successful")
            // data.ok
            toast({
                title : "삭제 성공",
                status : "success",
                duration : 1000
            });
            props.onClose();
            queryClient.refetchQueries(["duesInItems"])
            queryClient.refetchQueries(["duesInAmount"])
        },
    });

    const onSubmit = () => {
        if(teamPk) {
            duesInItemDeleteMutation.mutate({ teamPk, itemPk })
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 정말 삭제하시겠습니까? </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Button type={"submit"} isLoading={duesInItemDeleteMutation.isLoading} size={"md"} width="100%" backgroundColor={"black"} color={"white"}> 삭제하기 </Button>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}