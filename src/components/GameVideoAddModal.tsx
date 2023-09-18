import { useForm } from "react-hook-form";
import { Button, FormControl, Image, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gameVideoAdd } from "../api";
import { FaLink } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState } from "react";

interface GameVideoAddModalProps {
    isOpen : boolean;
    onClose : () => void;
}

interface IGameVideoAddForm {
    file : string;
}

export default function GameVideoAddModal ( props : GameVideoAddModalProps ) {

    const { gamePk } = useParams();

    const { register, handleSubmit, formState : {errors}, reset : gameVideoAddFormReset } = useForm<IGameVideoAddForm>();

    const toast = useToast();
    const queryClient = useQueryClient()

    const gameVideoAddMutation = useMutation(gameVideoAdd, {
        onSuccess : (data) => {
            console.log("gameVideo add successful")
            console.log(data)
            // data.ok
            toast({
                title : "유튜브 링크 추가 성공",
                status : "success",
                duration : 1000
            });
            gameVideoAddFormReset()
            props.onClose();
            queryClient.refetchQueries(["game"])
        },
    });

    const onSubmit = ({ file }:IGameVideoAddForm) => {
        if(gamePk) {
            gameVideoAddMutation.mutate({ gamePk, file });
        }
    }

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 유튜브 링크 추가하기 </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                <VStack>
                    <FormControl>
                        <InputGroup>
                            <InputLeftAddon children={<FaLink />} />
                            <Input {...register("file", {
                                                            required: "필수 항목입니다",
                                                            pattern: {
                                                            value: /^https:\/\/youtu.be\/[a-zA-Z0-9_-]{11}(?:\S*)?$/,
                                                            message: "아래 가이드에 따라 https://youtu.be/[code] 형식으로 입력해주세요!"
                                                            }
                                                        })} required type="text" isInvalid={Boolean(errors.file?.message)} placeholder={"https://youtu.be/"} />
                        </InputGroup>
                    </FormControl>
                    {errors.file && <Text color="red.500">{errors.file.message}</Text>}
                    {gameVideoAddMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> 문제가 발생했습니다. </Text>) : null}

                    <Button onClick={onOpen} size={"md"} width="100%" color={"gray"} variant="ghost"> 가이드 보기 </Button>

                    <Modal isOpen={isOpen} onClose={onClose} size="xl">
                        <ModalOverlay />
                        <ModalContent>
                            <ModalCloseButton />
                            <ModalBody>
                                <Image src={"https://imagedelivery.net/SbAhiipQhJYzfniSqnZDWw/e7f1e2cc-fde8-404d-59dc-78dad396cd00/public"} boxSize="100%" />
                            </ModalBody>
                        </ModalContent>
                    </Modal>

                    <Button type="submit" isLoading={gameVideoAddMutation.isLoading} size={"md"} width="100%" backgroundColor={"main.500"} color={"white"}> 추가하기 </Button>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}