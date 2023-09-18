import { useForm } from "react-hook-form";
import { Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { duesPaymentItemExtraAdd, getTeamDuesPaymentItemsExtra } from "../api";
import { IDuesPaymentItemExtra } from "../types";
import { useParams } from "react-router-dom";

interface DuesPaymentItemAddModalProps {
    isOpen : boolean;
    onClose : () => void;
}

interface IDuesPaymentItemAddForm {
    player : number;
}

export default function DuesPaymentItemAddModal ( props : DuesPaymentItemAddModalProps ) {

    const { teamPk, paymentPk } = useParams();

    const { isLoading : duesPaymentItemsExtraLoading, data : duesPaymentItemsExtraData, isError : duesPaymentItemsExtraError } = useQuery<IDuesPaymentItemExtra[]>(["duesPaymentItemsExtra", teamPk, paymentPk], getTeamDuesPaymentItemsExtra);
    const { register, handleSubmit, formState : {errors}, reset : duesPaymentItemAddFormReset } = useForm<IDuesPaymentItemAddForm>();

    const toast = useToast();
    const queryClient = useQueryClient()

    const duesPaymentItemsExtraMutation = useMutation(duesPaymentItemExtraAdd, {
        onSuccess : (data) => {
            console.log("duesPaymentItemsExtra successful")
            // data.ok
            toast({
                title : "추가 성공",
                status : "success",
                duration : 1000
            });
            props.onClose();
            queryClient.refetchQueries(["duesPaymentItemsExtra"])
            queryClient.refetchQueries(["duesPaymentItems"])
        },
    });

    const onSubmit = ({ player }:IDuesPaymentItemAddForm) => {
        if(teamPk && paymentPk) {
            duesPaymentItemsExtraMutation.mutate({ teamPk, paymentPk, player });
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 회비 납부 현황 항목 추가하기 </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                <VStack>
                    <FormControl>
                            <FormLabel fontWeight={"bold"} color={"main.500"} fontSize={"md"} > 플레이어 선택하기 </FormLabel>
                            {/* <Select placeholder="Choose a vsteam" onChange={handleVSteamChange}> */}
                            <Select {...register("player", {required:true})} placeholder={duesPaymentItemsExtraData && duesPaymentItemsExtraData.length !== 0 ? "항목에 추가할 선수를 선택해주세요!" : "항목에 추가할 선수가 없습니다."} disabled={!duesPaymentItemsExtraData || duesPaymentItemsExtraData.length === 0}>
                                {duesPaymentItemsExtraData?.map((player) => <option key={player.id} value={player.id}>{player.backnumber}. {player.name}</option>)}
                            </Select>
                    </FormControl>
                    {duesPaymentItemsExtraMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> 문제가 발생했습니다. </Text>) : null}
                    <Button type="submit" isLoading={duesPaymentItemsExtraMutation.isLoading} size={"md"} width="100%" backgroundColor={!duesPaymentItemsExtraData || duesPaymentItemsExtraData.length === 0 ? "gray" : "main.500"} color={"white"} disabled={!duesPaymentItemsExtraData || duesPaymentItemsExtraData.length === 0}> 항목 추가하기 </Button>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}