import { useForm } from "react-hook-form";
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTeamPlayersNotConnected, playerAdd, playerConnecting } from "../api";
import { ITinyPlayer } from "../types";
import { FaCheck, FaUserAlt } from "react-icons/fa";

interface PlayerAddModalProps {
    isOpen : boolean;
    onClose : () => void;
    teamPk : string
}

interface IPlayerAddForm {
    name : string;
    backnumber : number;
}

export default function PlayerAddModal ( props : PlayerAddModalProps ) {

    const { register, handleSubmit, formState : {errors}, reset : playerAddFormReset } = useForm<IPlayerAddForm>();

    const toast = useToast();
    const queryClient = useQueryClient()

    const playerAddMutation = useMutation(playerAdd, {
        onSuccess : (data) => {
            console.log("player add successful")
            // data.ok
            toast({
                title : "플레이어 생성 성공",
                status : "success"
            });
            playerAddFormReset()
            props.onClose();
            queryClient.refetchQueries(["isSpvsr"])
            queryClient.refetchQueries(["team"])
            queryClient.refetchQueries(["teamPlayers"])
        },
    });

    const onSubmit = ({ name, backnumber }:IPlayerAddForm) => {
        const teamPk = props.teamPk
        playerAddMutation.mutate({ teamPk, name, backnumber });
        // data:ILogInForm 으로 받고, mutation.mutate({ data.username, data.password }) 로 받고 싶은데 안됨
        // console.log(data)
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 플레이어 추가하기 </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                <VStack>
                    <FormControl>
                        <InputGroup>
                            <InputLeftAddon children={<FaUserAlt />} />
                            <Input {...register("name", {required:true})} type="text" isInvalid={Boolean(errors.name?.message)} placeholder={"PLAYER NAME"} />
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <InputGroup>
                            <InputLeftAddon children={<FaCheck />} />
                            <Input {...register("backnumber", {required:true})} type="number" min={0} isInvalid={Boolean(errors.backnumber?.message)} placeholder={"BACKNUMBER"} />
                        </InputGroup>
                    </FormControl>
                    {playerAddMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> name & backnumber required </Text>) : null}
                    <Button type="submit" isLoading={playerAddMutation.isLoading} size={"md"} width="100%" backgroundColor={"point.500"} color={"black"}> Add </Button>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}