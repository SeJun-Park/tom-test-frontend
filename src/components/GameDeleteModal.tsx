import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gameDelete } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
interface GameDeleteModalProps {
    isOpen : boolean;
    onClose : () => void;
}

export default function GameDeleteModal ( props : GameDeleteModalProps ) {

    const { gamePk } = useParams();
    const { handleSubmit, formState : {errors} } = useForm();

    const toast = useToast();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const gameDeleteMutation = useMutation(gameDelete, {
        onSuccess : (data) => {
            console.log("game delete successful")
            // data.ok
            toast({
                title : "게임 삭제 성공",
                status : "success",
                duration : 1000
            });
            props.onClose();   
            queryClient.refetchQueries(["teamGames"])
            navigate(-1)
        },
    });

    const onSubmit = () => {
        if (gamePk) {
            gameDeleteMutation.mutate({ gamePk });
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 경기를 삭제하시겠습니까? </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Button type={"submit"} isLoading={gameDeleteMutation.isLoading} size={"md"} width="100%" backgroundColor={"black"} color={"white"}> 삭제하기 </Button>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}