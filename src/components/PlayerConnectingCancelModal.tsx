import { useForm } from "react-hook-form";
import { Button, FormControl, FormHelperText, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPlayer, playerConnectingCancel } from "../api";
import { IPlayer } from "../types";
import PlayerNoLink from "./PlayerNoLink";

interface PlayerConnectingCancelModalProps {
    isOpen : boolean;
    onClose : () => void;
    playerPk : string;
}


export default function PlayerConnectingCancelModal ( props : PlayerConnectingCancelModalProps ) {
    const toast = useToast();
    const queryClient = useQueryClient()

    const playerConnectingCancelMutation = useMutation(playerConnectingCancel, {
        onSuccess : (data) => {
            console.log("player connect successful")
            // data.ok
            toast({
                title : "플레이어 연결 해제 요청 성공",
                status : "success"
            });
            props.onClose();
            queryClient.refetchQueries(["team"])
        },
    });

    const onClick = () => {
        if(props.playerPk) {
            const playerPk = props.playerPk
            playerConnectingCancelMutation.mutate({ playerPk });
            // data:ILogInForm 으로 받고, mutation.mutate({ data.username, data.password }) 로 받고 싶은데 안됨
            // console.log(data)
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> Are You Sure? </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <VStack>
                    
                    <Button onClick={onClick} isLoading={playerConnectingCancelMutation.isLoading} size={"md"} width="100%" backgroundColor={"black"} color={"white"}> disconnect </Button>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}