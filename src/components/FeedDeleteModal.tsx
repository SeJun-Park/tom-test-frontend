import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { feedDelete } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

interface FeedDeleteModalProps {
    pk : number;
    isOpen : boolean;
    onClose : () => void;
}

export default function FeedDeleteModal ( props : FeedDeleteModalProps ) {

    const { teamPk } = useParams();

    const feedPk = String(props.pk)
    const { register, handleSubmit, formState : {errors}, reset : feedDeleteFormReset } = useForm();

    const toast = useToast();
    const queryClient = useQueryClient()
    const navigate = useNavigate();

    const feedDeleteMutation = useMutation(feedDelete, {
        onSuccess : (data) => {
            console.log("feed delete successful")
            // data.ok
            toast({
                title : "피드 삭제 성공",
                status : "success",
                duration : 1000
            });
            props.onClose();
            queryClient.refetchQueries(["teamFeeds"])
        },
    });

    const onSubmit = () => {
        if(teamPk) {
            feedDeleteMutation.mutate({ teamPk, feedPk })
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 피드를 삭제하시겠습니까? </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Button type={"submit"} isLoading={feedDeleteMutation.isLoading} size={"md"} width="100%" backgroundColor={"black"} color={"white"}> 삭제하기 </Button>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}