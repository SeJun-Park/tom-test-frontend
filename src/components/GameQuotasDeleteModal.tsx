import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gameQuotasDelete } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

interface GameQuotasDeleteModalProps {
    isOpen : boolean;
    onClose : () => void;
}

export default function GameQuotasDeleteModal ( props : GameQuotasDeleteModalProps ) {

    const { gamePk } = useParams();
    const { handleSubmit, formState : {errors} } = useForm();

    const toast = useToast();
    const navigate = useNavigate();

    const queryClient = useQueryClient()

    const gameQuotasDeleteMutation = useMutation(gameQuotasDelete, {
        onSuccess : (data) => {
            console.log("gameQuotas all delete successful")
            // data.ok
            toast({
                title : "쿼터 전체 삭제 성공",
                status : "success"
            });
            props.onClose();   
            queryClient.refetchQueries(["game"]) 
            navigate(-1)
        },
    });

    const onSubmit = () => {
        if (gamePk) {
            gameQuotasDeleteMutation.mutate({ gamePk });
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 전체 쿼터를 삭제하시겠습니까? </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Button type={"submit"} isLoading={gameQuotasDeleteMutation.isLoading} size={"md"} width="100%" backgroundColor={"black"} color={"white"}> 삭제하기 </Button>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}