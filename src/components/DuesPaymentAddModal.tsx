import { useForm } from "react-hook-form";
import { Button, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duesPaymentAdd } from "../api";
import { FaCalendarMinus, FaStream } from "react-icons/fa";
import { useParams } from "react-router-dom";

interface DuesPaymentAddModalProps {
    isOpen : boolean;
    onClose : () => void;
}

interface IDuesPaymentAddForm {
    title : string;
    memo? : string;
}

export default function DuesPaymentAddModal ( props : DuesPaymentAddModalProps ) {

    const { teamPk } = useParams();

    const { register, handleSubmit, formState : {errors}, reset : duesPaymentAddFormReset } = useForm<IDuesPaymentAddForm>();

    const toast = useToast();
    const queryClient = useQueryClient()

    const duesPaymentAddMutation = useMutation(duesPaymentAdd, {
        onSuccess : (data) => {
            console.log("duesPayment add successful")
            // data.ok
            toast({
                title : "회비 납부 현황 추가 성공",
                status : "success",
                duration : 1000
            });
            duesPaymentAddFormReset()
            props.onClose();
            queryClient.refetchQueries(["teamDuesPayments"])
        },
        onError : (error) => {
            console.log(error)
        }
    });

    const onSubmit = ({ title, memo }:IDuesPaymentAddForm) => {
        if(teamPk) {
            duesPaymentAddMutation.mutate({ teamPk, title, memo });
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 회비 납부 현황 추가하기 </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                <VStack>
                    <FormControl>
                        <FormLabel>
                            회비 제목
                        </FormLabel>
                        <InputGroup>
                            <InputLeftAddon children={<FaCalendarMinus />} />
                            <Input {...register("title", {required:true})} type="text" isInvalid={Boolean(errors.title?.message)} placeholder={"ex. 2023년 2분기"} />
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            메모
                        </FormLabel>
                        <InputGroup>
                            <InputLeftAddon children={<FaStream />} />
                            <Input {...register("memo")} type="text" maxLength={20} isInvalid={Boolean(errors.memo?.message)} placeholder={"ex. 회비 20,000원 (선택, 20자 이내)"} />
                        </InputGroup>
                    </FormControl>
                    {duesPaymentAddMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> 문제가 발생했습니다. </Text>) : null}
                    <Button type="submit" isLoading={duesPaymentAddMutation.isLoading} size={"md"} width="100%" backgroundColor={"main.500"} color={"white"}> 납부 현황 추가하기 </Button>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}