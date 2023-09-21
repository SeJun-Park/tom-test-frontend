import { useForm } from "react-hook-form";
import { Button, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTeamPlayersNotConnected, playerConnecting } from "../api";
import { ITinyPlayer } from "../types";
import { FaCheck } from "react-icons/fa";

interface PlayerConnectModalProps {
    isOpen : boolean;
    onClose : () => void;
    teamPk : string
}

interface IPlayerConnectForm {
    playerPk : string;
}

export default function PlayerConnectModal ( props : PlayerConnectModalProps ) {

    const { isLoading : teamPlayersNotConnectedLoading, data : teamPlayersNotConnectedData, isError : teamPlayersNotConnectedError } = useQuery<ITinyPlayer[]>(["teamNotConnectedPlayers", props.teamPk], getTeamPlayersNotConnected);
    const { register, handleSubmit, formState : {errors}, reset : playerConnectFormReset } = useForm<IPlayerConnectForm>();

    const toast = useToast();
    const queryClient = useQueryClient()

    const playerConnectingMutation = useMutation(playerConnecting, {
        onSuccess : (data) => {
            console.log("player connecting successful")
            // data.ok
            toast({
                title : "플레이어 연결 요청 성공",
                status : "success",
                duration : 1000
            });
            props.onClose();
            queryClient.refetchQueries(["team"])
        },
    });

    const onSubmit = ({ playerPk }:IPlayerConnectForm) => {
        playerConnectingMutation.mutate({ playerPk });
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 플레이어 연결 </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                <VStack>
                    <FormControl>
                            <FormLabel fontWeight={"bold"} color={"main.500"} fontSize={"md"} > 플레이어 선택하기 </FormLabel>
                            {/* <Select placeholder="Choose a vsteam" onChange={handleVSteamChange}> */}
                            <Select {...register("playerPk", {required:true})} placeholder="나와 연결할 선수를 선택하세요!">
                                {teamPlayersNotConnectedData?.map((player) => <option key={player.pk} value={player.pk}>{player.backnumber}. {player.name}</option>)}
                            </Select>
                    </FormControl>
                    {playerConnectingMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> 문제가 발생했습니다. </Text>) : null}
                    <Button type="submit" isLoading={playerConnectingMutation.isLoading} size={"md"} width="100%" backgroundColor={"main.500"} color={"white"}> 플레이어 연결하기 </Button>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}