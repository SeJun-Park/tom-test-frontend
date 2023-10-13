import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamSpvsrsConnectingCancelByOneself } from "../api";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

interface TeamSpvsrsConnectingCancelByOneselfModalProps {
    teamName : string;
    isOpen : boolean;
    onClose : () => void;
}

export default function TeamSpvsrsConnectingCancelByOneselfModal ( props : TeamSpvsrsConnectingCancelByOneselfModalProps ) {

    const { teamPk } = useParams();

    const { handleSubmit, formState : {errors} } = useForm();

    const toast = useToast();
    const queryClient = useQueryClient()

    const teamSpvsrsConnectingCancelByOneselfMutation = useMutation(teamSpvsrsConnectingCancelByOneself, {
        onSuccess : (data) => {
            console.log("team spvsrs connecting cancel successful")
            // data.ok
            toast({
                title : "관리자 등록 요청 해제 성공",
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
            teamSpvsrsConnectingCancelByOneselfMutation.mutate({ teamPk })
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> {props.teamName} 팀 관리자로 등록 요청을 취소하시겠습니까? </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Button type={"submit"} isLoading={teamSpvsrsConnectingCancelByOneselfMutation.isLoading} size={"md"} width="100%" backgroundColor={"black"} color={"white"}> 요청 취소하기 </Button>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}