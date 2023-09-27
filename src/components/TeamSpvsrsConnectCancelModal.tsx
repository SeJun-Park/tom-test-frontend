import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamSpvsrsConnectCancel, teamSpvsrsConnectingCancel } from "../api";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

interface TeamSpvsrsConnectCancelModalProps {
    userName : string,
    isOpen : boolean;
    onClose : () => void;
}

export default function TeamSpvsrsConnectCancelModal ( props : TeamSpvsrsConnectCancelModalProps ) {

    const { teamPk } = useParams();

    const { handleSubmit, formState : {errors} } = useForm();

    const toast = useToast();
    const queryClient = useQueryClient()

    const teamSpvsrsConnectCancelMutation = useMutation(teamSpvsrsConnectCancel, {
        onSuccess : (data) => {
            console.log("team spvsrs connect cancel successful")
            // data.ok
            toast({
                title : "관리자 등록 해제 성공",
                status : "success",
                duration : 1000
            });
            props.onClose();
            queryClient.refetchQueries(["team"])
            queryClient.refetchQueries(["teamSpvsrs"])
            
        },
    });

    const onSubmit = () => {
        if(teamPk) {
            teamSpvsrsConnectCancelMutation.mutate({ teamPk })
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> {props.userName === "나" ? "" : `이름 : ${props.userName}`} <br/> 관리자 등록을 취소하시겠습니까? </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Button type={"submit"} isLoading={teamSpvsrsConnectCancelMutation.isLoading} size={"md"} width="100%" backgroundColor={"black"} color={"white"}> 취소하기 </Button>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}