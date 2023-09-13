import { useForm } from "react-hook-form";
import { Button, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { playerDailyAdd } from "../api";
import { FaUserAlt } from "react-icons/fa";

interface PlayerDailyAddModalProps {
    isOpen : boolean;
    onClose : () => void;
    gamePk : string
}

interface IPlayerDailyAddForm {
    name : string;
}

export default function PlayerDailyAddModal ( props : PlayerDailyAddModalProps ) {

    const gamePk = props.gamePk

    const { register, handleSubmit, formState : {errors}, reset : playerDailyAddFormReset } = useForm<IPlayerDailyAddForm>();

    const toast = useToast();
    const queryClient = useQueryClient()

    const playerDailyAddMutation = useMutation(playerDailyAdd, {
        onSuccess : (data) => {
            console.log("playerDaily add successful")
            // data.ok
            toast({
                title : "용병 추가 성공",
                status : "success",
                duration : 1000
            });
            playerDailyAddFormReset()
            props.onClose();
            queryClient.refetchQueries(["game"])
        },
    });

    const onSubmit = ({ name }:IPlayerDailyAddForm) => {
        playerDailyAddMutation.mutate({ gamePk, name });
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 용병 추가하기 </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                <VStack>
                    <FormControl>
                        <InputGroup>
                            <InputLeftAddon children={<FaUserAlt />} />
                            <Input {...register("name", {required:true})} type="text" isInvalid={Boolean(errors.name?.message)} placeholder={"용병 이름"} />
                        </InputGroup>
                    </FormControl>
                    {playerDailyAddMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> 필수 항목입니다. </Text>) : null}
                    <Button type="submit" isLoading={playerDailyAddMutation.isLoading} size={"md"} width="100%" backgroundColor={"main.500"} color={"white"}> 용병 추가하기 </Button>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}