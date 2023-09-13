import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { playerConnectingCancel } from "../api";

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
                title : "플레이어 연결 요청 취소 성공",
                status : "success",
                duration : 1000
            });
            props.onClose();
            queryClient.refetchQueries(["team"])
        },
    });

    const onClick = () => {
        if(props.playerPk) {
            const playerPk = props.playerPk
            playerConnectingCancelMutation.mutate({ playerPk });
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 플레이어 연결 요청을 취소하시겠습니까? </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <VStack>
                    
                    <Button onClick={onClick} isLoading={playerConnectingCancelMutation.isLoading} size={"md"} width="100%" backgroundColor={"black"} color={"white"}> 취소하기 </Button>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}