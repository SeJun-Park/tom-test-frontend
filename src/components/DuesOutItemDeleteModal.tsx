import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duesOutItemDelete } from "../api";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

interface DuesOutItemDeleteModalProps {
    isOpen : boolean;
    onClose : () => void;
    id : number;
}

export default function DuesOutItemDeleteModal ( props : DuesOutItemDeleteModalProps ) {

    const { teamPk } = useParams();
    const itemPk = String(props.id)

    const { handleSubmit, formState : {errors} } = useForm();

    const toast = useToast();
    const queryClient = useQueryClient()

    const duesOutItemDeleteMutation = useMutation(duesOutItemDelete, {
        onSuccess : (data) => {
            console.log("duesOutItem delete successful")
            // data.ok
            toast({
                title : "회비 지출 내역 삭제 성공",
                status : "success",
                duration : 1000
            });
            props.onClose();
            queryClient.refetchQueries(["duesOutItems"])
            queryClient.refetchQueries(["duesOutAmount"])
        },
    });

    const onSubmit = () => {
        if(teamPk) {
            duesOutItemDeleteMutation.mutate({ teamPk, itemPk })
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
                    <Button type={"submit"} isLoading={duesOutItemDeleteMutation.isLoading} size={"md"} width="100%" backgroundColor={"black"} color={"white"}> 삭제하기 </Button>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}