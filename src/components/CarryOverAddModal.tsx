import { useForm } from "react-hook-form";
import { Button, FormControl, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { carryOverAdd } from "../api";
import { FaCashRegister } from "react-icons/fa";
import { useParams } from "react-router-dom";

interface CarryOverAddModalProps {
    isOpen : boolean;
    onClose : () => void;
}

interface ICarryOverAddForm {
    carry_over : number;
}

export default function CarryOverAddModal ( props : CarryOverAddModalProps ) {

    const { teamPk, detailPk } = useParams();

    const { register, handleSubmit, formState : {errors}, reset : carryOverAddFormReset } = useForm<ICarryOverAddForm>();

    const toast = useToast();
    const queryClient = useQueryClient()

    const carryOverAddMutation = useMutation(carryOverAdd, {
        onSuccess : (data) => {
            console.log("carryOver add successful")
            console.log(data)
            // data.ok
            toast({
                title : "입력 완료",
                status : "success",
                duration : 1000
            });
            carryOverAddFormReset()
            props.onClose();
            queryClient.refetchQueries(["duesDetail"])
        },
    });

    const onSubmit = ({ carry_over }:ICarryOverAddForm) => {
        if(teamPk && detailPk) {
            carryOverAddMutation.mutate({ teamPk, detailPk, carry_over });
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 이월 금액 입력하기 </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                <VStack>
                    <FormControl>
                        <InputGroup>
                            <InputLeftAddon children={<FaCashRegister />} />
                            <Input {...register("carry_over", {required:true})} required type="number" min={0} isInvalid={Boolean(errors.carry_over?.message)} placeholder={"이월 금액"} />
                        </InputGroup>
                    </FormControl>
                    {carryOverAddMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> 필수 항목입니다. </Text>) : null}
                    <Button type="submit" isLoading={carryOverAddMutation.isLoading} size={"md"} width="100%" backgroundColor={"main.500"} color={"white"}> 입력하기 </Button>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}