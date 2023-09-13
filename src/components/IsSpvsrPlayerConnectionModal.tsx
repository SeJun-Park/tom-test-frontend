import { Avatar, Button, Divider, FormLabel, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPlayer, playerConnectingCancel } from "../api";
import { IPlayer } from "../types";
import { useParams } from "react-router-dom";

interface IsSpvsrPlayerConnectionModalProps {
    isOpen : boolean;
    onClose : () => void;
}

export default function IsSpvsrPlayerConnectionModal ( props : IsSpvsrPlayerConnectionModalProps ) {

    const { playerPk } = useParams();
    const { isLoading : playerLoading, data : playerData, isError : playerError } = useQuery<IPlayer>(["player", playerPk], getPlayer);

    const toast = useToast();
    const queryClient = useQueryClient()

    const playerConnectingCancelMutation = useMutation(playerConnectingCancel, {
        onSuccess : (data) => {
            console.log("player connecting successful")
            // data.ok
            toast({
                title : "플레이어 연결 해제 요청 성공",
                status : "success"
            });
            props.onClose();
            queryClient.refetchQueries(["player"])
        },
    });

    const onCloseBtnClick = () => {
        props.onClose();
    }

    const onDisconnectBtnClick = () => {
        if(playerPk){
            playerConnectingCancelMutation.mutate({ playerPk });
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 연결 상태 </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <VStack>
                    <FormLabel>Connected User</FormLabel>
                    <HStack p={5} justifyContent={"flex-start"} spacing={5} width={"100%"}>
                    <HStack spacing={3}>
                            <Avatar src={playerData?.connected_user ? playerData.connected_user.avatar : ""}></Avatar>
                            <Text as="b" fontSize={"xs"}>{playerData?.connected_user ? playerData.connected_user.username : ""}</Text>
                        </HStack>
                    </HStack>
                    <Divider />
                    <FormLabel>Connected Player</FormLabel>
                    <HStack p={5} justifyContent={"flex-start"} spacing={5} width={"100%"}>
                        <HStack spacing={3}>
                            <Avatar src={playerData?.avatar}></Avatar>
                            <Text as="b" fontSize={"xs"}>{playerData?.backnumber}.</Text>
                            <Text as="b" fontSize={"xs"}>{playerData?.name}</Text>
                        </HStack>
                    </HStack>
                    <Divider />
                    <Button onClick={onCloseBtnClick} size={"md"} width="100%" backgroundColor={"main.500"} color={"white"}> 닫기 </Button>
                    <Button onClick={onDisconnectBtnClick} type="submit" isLoading={playerConnectingCancelMutation.isLoading} size={"md"} width="100%" backgroundColor={"black"} color={"white"}> 연결 취소하기 </Button>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}

