import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { scheduleDelete } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

interface ScheduleDeleteModalProps {
    schedulePk : number;
    isOpen : boolean;
    onClose : () => void;
}

export default function ScheduleDeleteModal ( props : ScheduleDeleteModalProps ) {

    const { teamPk } = useParams();

    const schedulePk = String(props.schedulePk)
    const { handleSubmit, formState : {errors} } = useForm();

    const toast = useToast();
    const queryClient = useQueryClient()
    const navigate = useNavigate();

    const scheduleDeleteMutation = useMutation(scheduleDelete, {
        onSuccess : (data) => {
            console.log("schedule delete successful")
            // data.ok
            toast({
                title : "일정 삭제 성공",
                status : "success",
                duration : 1000
            });
            props.onClose();
            window.location.reload();
        },
    });

    const onSubmit = () => {
        if(teamPk) {
            scheduleDeleteMutation.mutate({ teamPk, schedulePk })
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 일정을 삭제하시겠습니까? </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Button type={"submit"} isLoading={scheduleDeleteMutation.isLoading} size={"md"} width="100%" backgroundColor={"black"} color={"white"}> 삭제하기 </Button>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}