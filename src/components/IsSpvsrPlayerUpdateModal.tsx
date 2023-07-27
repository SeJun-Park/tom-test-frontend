import { useForm } from "react-hook-form";
import { Button, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  getPlayer, playerUpdate } from "../api";
import { FaCheck, FaUserAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { IPlayer } from "../types";

interface IsSpvsrPlayerUpdateModalProps {
    isOpen : boolean;
    onClose : () => void;
}

interface IPlayerUpdateForm {
    name : string;
    backnumber : number;
    description? : string;
}

export default function IsSpvsrPlayerUpdateModal ( props : IsSpvsrPlayerUpdateModalProps ) {

    const { playerPk } = useParams();
    const { isLoading : playerLoading, data : playerData, isError : playerError } = useQuery<IPlayer>(["player", playerPk], getPlayer);

    const { register, handleSubmit, formState : {errors}, reset : playerConnectFormReset } = useForm<IPlayerUpdateForm>();

    const toast = useToast();
    const queryClient = useQueryClient()

    const playerUpdateMutation = useMutation(playerUpdate, {
        onSuccess : (data) => {
            console.log("player add successful")
            // data.ok
            toast({
                title : "플레이어 업데이트 성공",
                status : "success"
            });
            props.onClose();
            queryClient.refetchQueries(["player"])
        },
    });

    const onSubmit = ({ name, backnumber, description }:IPlayerUpdateForm) => {
        if(playerPk){
            playerUpdateMutation.mutate({ playerPk, name, backnumber, description });
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 플레이어 업데이트 </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                <VStack>
                    <FormControl>
                        <InputGroup>
                            <InputLeftAddon children={<FaUserAlt />} />
                            <Input {...register("name", {required:true})} type="text" isInvalid={Boolean(errors.name?.message)} placeholder={playerData?.name} />
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <InputGroup>
                            <InputLeftAddon children={<FaCheck />} />
                            <Input {...register("backnumber", {required:true})} type="number" min={0} isInvalid={Boolean(errors.backnumber?.message)} placeholder={playerData?.backnumber.toString()} />
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <InputGroup>
                            <InputLeftAddon children={<FaStream />} />
                            <Input {...register("description")} type="text" maxLength={20} isInvalid={Boolean(errors.description?.message)} placeholder={playerData?.description ? playerData.description : "설명을 입력해보세요 (선택, 20자 이내)"} />
                        </InputGroup>
                    </FormControl>
                    {playerUpdateMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> name & backnumber required </Text>) : null}
                    <Button type="submit" isLoading={playerUpdateMutation.isLoading} size={"md"} width="100%" backgroundColor={"point.500"} color={"black"}> Update </Button>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}