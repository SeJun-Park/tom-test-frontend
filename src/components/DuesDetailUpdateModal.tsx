import { useForm } from "react-hook-form";
import { Button, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  duesDetailUpdate, getTeamDuesDetail } from "../api";
import { FaCalendarMinus, FaStream } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { IDuesDetail } from "../types";

interface DuesDetailUpdateModalProps {
    isOpen : boolean;
    onClose : () => void;
}

interface IDuesDetailUpdateForm {
    title : string,
    memo? : string
}

export default function DuesDetailUpdateModal ( props : DuesDetailUpdateModalProps ) {

    const { teamPk, detailPk } = useParams();
    const { isLoading : duesDetailLoading, data : duesDetailData, isError : duesDetailError } = useQuery<IDuesDetail>(["duesDetail", teamPk, detailPk], getTeamDuesDetail);

    const { register, handleSubmit, formState : {errors}, reset : duesDetailUpdateFormReset } = useForm<IDuesDetailUpdateForm>();

    const toast = useToast();
    const queryClient = useQueryClient()

    const duesDetailUpdateMutation = useMutation(duesDetailUpdate, {
        onSuccess : (data) => {
            console.log("duesDetail add successful")
            // data.ok
            toast({
                title : "회비 사용 내역 업데이트 성공",
                status : "success",
                duration : 1000
            });
            props.onClose();
            queryClient.refetchQueries(["duesDetail"])
        },
    });

    const onSubmit = ({ title, memo }:IDuesDetailUpdateForm) => {
        if(teamPk && detailPk){
            duesDetailUpdateMutation.mutate({ teamPk, detailPk, title, memo });
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 회비 사용 내역 업데이트 </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                <VStack>
                    <FormControl>
                        <FormLabel>
                            회비 제목
                        </FormLabel>
                        <InputGroup>
                            <InputLeftAddon children={<FaCalendarMinus />} />
                            <Input {...register("title", {required:true})} type="text" isInvalid={Boolean(errors.title?.message)} placeholder={duesDetailData?.title} defaultValue={duesDetailData?.title} />
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <InputGroup>
                            <InputLeftAddon children={<FaStream />} />
                            <Input {...register("memo")} type="text" maxLength={20} isInvalid={Boolean(errors.memo?.message)} placeholder={duesDetailData?.memo ? duesDetailData.memo : "설명을 입력해보세요 (선택, 20자 이내)"} defaultValue={duesDetailData?.memo} />
                        </InputGroup>
                    </FormControl>
                    {duesDetailUpdateMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> 문제가 발생했습니다. </Text>) : null}
                    <Button type="submit" isLoading={duesDetailUpdateMutation.isLoading} size={"md"} width="100%" backgroundColor={"point.500"} color={"black"}> 업데이트 </Button>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}