import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamDelete, teamPhotoDelete } from "../api";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

interface TeamDeleteModalProps {
    teamName : string,
    isOpen : boolean;
    onClose : () => void;
}

export default function TeamDeleteModal ( props : TeamDeleteModalProps ) {

    const { teamPk } = useParams();

    const { register, handleSubmit, formState : {errors}, reset : teamDeleteFormReset } = useForm();

    const toast = useToast();
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const teamDeleteMutation = useMutation(teamDelete, {
        onSuccess : (data) => {
            console.log("team delete successful")
            // data.ok
            toast({
                title : "팀 삭제 성공",
                status : "success",
                duration : 1000
            });
            props.onClose();
            navigate("/")
            queryClient.refetchQueries(["isSpvsr"])
            queryClient.refetchQueries(["isSpvsrTeams"])
        },
    });

    const onSubmit = () => {
        if(teamPk) {
            teamDeleteMutation.mutate({teamPk});
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 팀 이름 : {props.teamName} <br/> 정말로 이 팀을 삭제하시겠습니까? </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Button type={"submit"} isLoading={teamDeleteMutation.isLoading} size={"md"} width="100%" backgroundColor={"black"} color={"white"}> 삭제하기 </Button>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}