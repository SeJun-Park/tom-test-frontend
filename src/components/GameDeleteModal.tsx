import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast, VStack } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { gameDelete } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
interface GameDeleteModalProps {
    isOpen : boolean;
    onClose : () => void;
}

export default function GameDeleteModal ( props : GameDeleteModalProps ) {

    const { gamePk } = useParams();
    const { register, handleSubmit, formState : {errors}, reset : deleteGameFormReset } = useForm();

    const toast = useToast();
    const navigate = useNavigate();

    const gameDeleteMutation = useMutation(gameDelete, {
        onSuccess : (data) => {
            console.log("game delete successful")
            // data.ok
            toast({
                title : "게임 삭제 성공",
                status : "success"
            });
            props.onClose();    
            navigate(-2)
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
            <ModalHeader> 정말 삭제하시겠습니까? </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Button type={"submit"} isLoading={gameDeleteMutation.isLoading} size={"md"} width="100%" backgroundColor={"black"} color={"white"}> Delete </Button>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}