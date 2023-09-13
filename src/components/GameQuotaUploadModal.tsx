import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gameQuotaUpload, photoDelete } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IGameQuota } from "../types";

interface GameQuotaUploadModalProps {
    isOpen : boolean;
    onClose : () => void;
    quotasData : IGameQuota[]
}

export default function GameQuotaUploadModal ( props : GameQuotaUploadModalProps ) {

    const { gamePk } = useParams();
    const quotasData = props.quotasData;

    const { handleSubmit, formState : {errors} } = useForm();

    const toast = useToast();
    const queryClient = useQueryClient()

    const navigate = useNavigate();

    const gameQuotaUploadMutation = useMutation(gameQuotaUpload, {
        onSuccess : (data) => {
            console.log("game quota upload successful")
            // data.ok
            toast({
                title : "쿼터 추가 성공",
                status : "success",
                duration : 1000
            });
            props.onClose();
            navigate(-1)
            queryClient.refetchQueries(["gameQuotas"])
        },
    });

    const onSubmit = () => {
        if(gamePk) {
            gameQuotaUploadMutation.mutate({ gamePk, quotasData })
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 이대로 포메이션을 추가하시겠습니까? </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Button type={"submit"} isLoading={gameQuotaUploadMutation.isLoading} size={"md"} width="100%" backgroundColor={"main.500"} color={"white"}> 추가하기 </Button>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}