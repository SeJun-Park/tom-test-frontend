import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gameDelete, photoDelete, scheduleDelete, videoDelete } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

interface GameVideoDeleteModalProps {
    pk : number;
    isOpen : boolean;
    onClose : () => void;
}

export default function GameVideoDeleteModal ( props : GameVideoDeleteModalProps ) {

    const videoPk = String(props.pk)
    const { register, handleSubmit, formState : {errors}, reset : gameVideoDeleteFormReset } = useForm();

    const toast = useToast();
    const queryClient = useQueryClient()

    const gameVideoDeleteMutation = useMutation(videoDelete, {
        onSuccess : (data) => {
            console.log("game video delete successful")
            // data.ok
            toast({
                title : "경기 영상 링크 삭제 성공",
                status : "success",
                duration : 1000
            });
            props.onClose();
            queryClient.refetchQueries(["game"])
        },
    });

    const onSubmit = () => {
        gameVideoDeleteMutation.mutate({ videoPk })
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 유튜브 링크를 삭제하시겠습니까? </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Button type={"submit"} isLoading={gameVideoDeleteMutation.isLoading} size={"md"} width="100%" backgroundColor={"black"} color={"white"}> 삭제하기 </Button>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}