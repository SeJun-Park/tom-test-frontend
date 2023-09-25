import { Avatar, Button, Divider, FormLabel, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPlayer, playerConnect, playerConnectingCancel } from "../api";
import { IPlayer } from "../types";
import { useParams } from "react-router-dom";

interface IsSpvsrPlayerConnectingModalProps {
    isOpen : boolean;
    onClose : () => void;
}

export default function IsSpvsrPlayerConnectingModal ( props : IsSpvsrPlayerConnectingModalProps ) {

    const { playerPk } = useParams();

    const { isLoading : playerLoading, data : playerData, isError : playerError } = useQuery<IPlayer>(["player", playerPk], getPlayer);

    const toast = useToast();
    const queryClient = useQueryClient()

    const playerConnectMutation = useMutation(playerConnect, {
        onSuccess : (data) => {
            console.log("player connecting successful")
            // data.ok
            toast({
                title : "플레이어 연결 성공",
                status : "success",
                duration : 1000
            });
            props.onClose();
            queryClient.refetchQueries(["player"])
        },
    });

    const playerConnectingCancelMutation = useMutation(playerConnectingCancel, {
        onSuccess : (data) => {
            console.log("player connecting successful")
            // data.ok
            toast({
                title : "플레이어 연결 해제 요청 성공",
                status : "success",
                duration : 1000
            });
            props.onClose();
            queryClient.refetchQueries(["player"])
        },
    });

    const onAllowBtnClick = () => {
        if(playerPk){
            playerConnectMutation.mutate({ playerPk });
        }
    }

    const onDenyBtnClick = () => {
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
            <ModalHeader> 연결 요청 중.. </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <VStack>
                    <Divider />
                    <FormLabel>연결을 요청한 사용자</FormLabel>
                    <HStack p={5} justifyContent={"flex-start"} spacing={5} width={"100%"}>
                    <HStack spacing={3}>
                            <Avatar src={playerData?.connecting_user ? playerData.connecting_user.avatar : ""}></Avatar>
                            <Text as="b" fontSize={"xs"}>{playerData?.connecting_user ? playerData.connecting_user.username : ""}</Text>
                        </HStack>
                    </HStack>
                    <Divider />
                    <FormLabel>플레이어</FormLabel>
                    <HStack p={5} justifyContent={"flex-start"} spacing={5} width={"100%"}>
                        <HStack spacing={3}>
                            <Avatar src={playerData?.avatar}></Avatar>
                            <Text as="b" fontSize={"xs"}>{playerData?.backnumber}.</Text>
                            <Text as="b" fontSize={"xs"}>{playerData?.name}</Text>
                        </HStack>
                    </HStack>
                    {playerConnectMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> connect failed </Text>) : null}
                    <Divider />
                    <Button onClick={onAllowBtnClick} type="submit" isLoading={playerConnectMutation.isLoading} size={"md"} width="100%" backgroundColor={"point.500"} color={"black"}> 허용하기 </Button>
                    <Button onClick={onDenyBtnClick} type="submit" isLoading={playerConnectingCancelMutation.isLoading} size={"md"} width="100%" backgroundColor={"black"} color={"white"}> 거부하기 </Button>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}