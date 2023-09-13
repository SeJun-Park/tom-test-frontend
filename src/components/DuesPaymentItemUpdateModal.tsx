import { useForm } from "react-hook-form";
import { Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { duesPaymentItemUpdate, getTeamDuesPaymentItemDetail } from "../api";
import { useParams } from "react-router-dom";
import { IDuesPaymentItem } from "../types";
import { useRecoilValue } from "recoil";
import { paymentState } from "../atoms";

interface DuesPaymentItemUpdateModalProps {
    isOpen : boolean;
    onClose : () => void;
    id : number;
}

interface IDuesPaymentItemUpdateForm {
    payment : string;
}

export default function DuesPaymentItemUpdateModal ( props : DuesPaymentItemUpdateModalProps ) {

    const { teamPk } = useParams();
    const itemPk = String(props.id)

    const { isLoading : duesPaymentItemLoading, data : duesPaymentItemData, isError : duesPaymentItemError } = useQuery<IDuesPaymentItem>(["duesPaymentItem", teamPk, itemPk], getTeamDuesPaymentItemDetail);

    const { register, handleSubmit, formState : {errors}, reset : duesPaymentUpdateFormReset } = useForm<IDuesPaymentItemUpdateForm>();

    const payment = useRecoilValue(paymentState)

    const toast = useToast();
    const queryClient = useQueryClient()

    const duesPaymentItemUpdateMutation = useMutation(duesPaymentItemUpdate, {
        onSuccess : (data) => {
            console.log("duesPaymentItem Update successful")
            // data.ok
            toast({
                title : "회비 납부 현황 항목 업데이트 성공",
                status : "success",
                duration : 1000
            });
            props.onClose();
            queryClient.refetchQueries(["duesPaymentItems"])
        },
    });

    const onSubmit = ({ payment }:IDuesPaymentItemUpdateForm) => {
        if(teamPk && itemPk){
            duesPaymentItemUpdateMutation.mutate({ teamPk, itemPk, payment });
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader>
                회비 납부 현황 수정하기
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                <VStack>
                    <FormControl>
                            <FormLabel fontWeight={"bold"} color={"main.500"} fontSize={"sm"} > {`${duesPaymentItemData?.player.backnumber}. ${duesPaymentItemData?.player.name}`} </FormLabel>
                            {/* <Select placeholder="Choose a vsteam" onChange={handleVSteamChange}> */}
                            <Select {...register("payment", {required:true})} defaultValue={duesPaymentItemData?.payment}>
                                {payment.map((payment, index) => <option key={index} value={payment[1]}>{payment[0]}</option>)}
                            </Select>
                    </FormControl>
                    {duesPaymentItemUpdateMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> 문제가 발생했습니다. </Text>) : null}
                    <Button type="submit" isLoading={duesPaymentItemUpdateMutation.isLoading} size={"md"} width="100%" backgroundColor={"main.500"} color={"white"}> 수정하기 </Button>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}