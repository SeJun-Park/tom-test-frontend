import { useForm } from "react-hook-form";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  getPlayer, playerDelete } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { IPlayer } from "../types";

interface IsSpvsrPlayerDeleteModalProps {
    isOpen : boolean;
    onClose : () => void;
}

export default function IsSpvsrPlayerDeleteModal ( props : IsSpvsrPlayerDeleteModalProps ) {

    const { playerPk } = useParams();
    const { isLoading : playerLoading, data : playerData, isError : playerError } = useQuery<IPlayer>(["player", playerPk], getPlayer);
    const navigate = useNavigate();

    const toast = useToast();
    const queryClient = useQueryClient()

    const playerDeleteMutation = useMutation(playerDelete, {
        onSuccess : (data) => {
            console.log("player add successful")
            // data.ok
            toast({
                title : "플레이어 삭제 성공",
                status : "success"
            });
            props.onClose();
            navigate(-1)
        },
    });

    const onClick = () => {
        if(playerPk){
            playerDeleteMutation.mutate({ playerPk });
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> Are you sure? </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <VStack>
                    {playerDeleteMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> something is wrong </Text>) : null}
                    <Button onClick={onClick} isLoading={playerDeleteMutation.isLoading} size={"md"} width="100%" backgroundColor={"black"} color={"white"}> Delete </Button>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}