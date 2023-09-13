import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duesPaymentItemDelete } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

interface DuesPaymentItemDeleteModalProps {
    isOpen : boolean;
    onClose : () => void;
    id : number;
}

export default function DuesPaymentItemDeleteModal ( props : DuesPaymentItemDeleteModalProps ) {

    const { teamPk } = useParams();
    const itemPk = String(props.id)

    const { handleSubmit, formState : {errors} } = useForm();

    const toast = useToast();
    const queryClient = useQueryClient()

    const duesPaymentItemDeleteMutation = useMutation(duesPaymentItemDelete, {
        onSuccess : (data) => {
            console.log("duesPaymentItem delete successful")
            // data.ok
            toast({
                title : "회비 납부 현황 항목 삭제 성공",
                status : "success",
                duration : 1000
            });
            props.onClose();
            queryClient.refetchQueries(["duesPaymentItemsExtra"])
            queryClient.refetchQueries(["duesPaymentItems"])
        },
    });

    const onSubmit = () => {
        if(teamPk) {
            duesPaymentItemDeleteMutation.mutate({ teamPk, itemPk })
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
                    <Button type={"submit"} isLoading={duesPaymentItemDeleteMutation.isLoading} size={"md"} width="100%" backgroundColor={"black"} color={"white"}> 삭제하기 </Button>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}