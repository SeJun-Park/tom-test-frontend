import { useForm } from "react-hook-form";
import { Button, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { duesPaymentUpdate, getTeamDuesPayment } from "../api";
import { FaCalendarMinus, FaStream } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { IDuesPayment } from "../types";

interface DuesPaymentUpdateModalProps {
    isOpen : boolean;
    onClose : () => void;
}

interface IDuesPaymentUpdateForm {
    title : string,
    memo? : string
}

export default function DuesPaymentUpdateModal ( props : DuesPaymentUpdateModalProps ) {

    const { teamPk, paymentPk } = useParams();
    const { isLoading : duesPaymentLoading, data : duesPaymentData, isError : duesPaymentError } = useQuery<IDuesPayment>(["duesPayment", teamPk, paymentPk], getTeamDuesPayment);

    const { register, handleSubmit, formState : {errors}, reset : duesPaymentUpdateFormReset } = useForm<IDuesPaymentUpdateForm>();

    const toast = useToast();
    const queryClient = useQueryClient()

    const duesPaymentUpdateMutation = useMutation(duesPaymentUpdate, {
        onSuccess : (data) => {
            console.log("duesPayment add successful")
            // data.ok
            toast({
                title : "회비 사용 내역 업데이트 성공",
                status : "success",
                duration : 1000
            });
            props.onClose();
            queryClient.refetchQueries(["duesPayment"])
        },
    });

    const onSubmit = ({ title, memo }:IDuesPaymentUpdateForm) => {
        if(teamPk && paymentPk){
            duesPaymentUpdateMutation.mutate({ teamPk, paymentPk, title, memo });
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 회비 납부 현황 업데이트 </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                <VStack>
                    <FormControl>
                        <FormLabel>
                            회비 제목
                        </FormLabel>
                        <InputGroup>
                            <InputLeftAddon children={<FaCalendarMinus />} />
                            <Input {...register("title", {required:true})} type="text" isInvalid={Boolean(errors.title?.message)} placeholder={duesPaymentData?.title} defaultValue={duesPaymentData?.title} />
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <InputGroup>
                            <InputLeftAddon children={<FaStream />} />
                            <Input {...register("memo")} type="text" maxLength={20} isInvalid={Boolean(errors.memo?.message)} placeholder={duesPaymentData?.memo ? duesPaymentData.memo : "설명을 입력해보세요 (선택, 20자 이내)"} defaultValue={duesPaymentData?.memo} />
                        </InputGroup>
                    </FormControl>
                    {duesPaymentUpdateMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> 문제가 발생했습니다. </Text>) : null}
                    <Button type="submit" isLoading={duesPaymentUpdateMutation.isLoading} size={"md"} width="100%" backgroundColor={"main.500"} color={"white"}> 업데이트 </Button>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}