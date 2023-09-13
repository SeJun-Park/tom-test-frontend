import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duesDetailDelete } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

interface DuesDetailDeleteModalProps {
    isOpen : boolean;
    onClose : () => void;
}

export default function DuesDetailDeleteModal ( props : DuesDetailDeleteModalProps ) {

    const { teamPk, detailPk } = useParams();

    const { register, handleSubmit, formState : {errors}, reset : duesDetailDeleteFormReset } = useForm();

    const toast = useToast();
    const queryClient = useQueryClient()
    const navigate = useNavigate();

    const duesDetailDeleteMutation = useMutation(duesDetailDelete, {
        onSuccess : (data) => {
            console.log("dues detail delete successful")
            // data.ok
            toast({
                title : "회비 사용 내역 삭제 성공",
                status : "success",
                duration : 1000
            });
            props.onClose();
            navigate(-1)
            queryClient.refetchQueries(["teamDuesDetails"])
        },
    });

    const onSubmit = () => {
        if(teamPk && detailPk) {
            duesDetailDeleteMutation.mutate({ teamPk, detailPk })
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
                    <Button type={"submit"} isLoading={duesDetailDeleteMutation.isLoading} size={"md"} width="100%" backgroundColor={"black"} color={"white"}> 삭제하기 </Button>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}