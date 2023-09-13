import { useForm } from "react-hook-form";
import { Box, Button, FormControl, FormHelperText, FormLabel, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duesOutItemAdd } from "../api";
import { useState } from "react";
import Calendar from "react-calendar";
import { useParams } from "react-router-dom";
import { FaCashRegister } from "react-icons/fa";

interface DuesOutItemAddModalProps {
    isOpen : boolean;
    onClose : () => void;
}

interface IDuesOutItemAddForm {
    title : string,
    amount : number,
    note? : string
}

export default function DuesOutItemAddModal ( props : DuesOutItemAddModalProps ) {

    const { teamPk, detailPk } = useParams();

    const { register, handleSubmit, formState : {errors}, reset : duesOutItemAddFormReset } = useForm<IDuesOutItemAddForm>();

    const toast = useToast();
    const queryClient = useQueryClient()

    const [ date, setDate ] = useState<string | undefined>();

    const handleDateChange = (date : any) => {
        const offset = date.getTimezoneOffset() * 60 * 1000; // 클라이언트의 타임존 오프셋 (분 단위)을 계산합니다.
        const koreanTime = new Date(date.getTime() - offset); // 클라이언트의 로컬 시간에서 타임존 오프셋을 뺀 한국 시간을 계산합니다.
        const formattedDate = koreanTime.toISOString().split("T")[0]; // 한국 시간을 ISO 8601 형식으로 변환합니다.
        console.log(formattedDate)
        setDate(formattedDate);
      };

    const duesOutItemAddMutation = useMutation(duesOutItemAdd, {
        onSuccess : (data) => {
            console.log("duesOutItem add successful")
            // data.ok
            toast({
                title : "지출 내역 추가 성공",
                status : "success",
                duration : 1000
            });
            duesOutItemAddFormReset()
            props.onClose();
            queryClient.refetchQueries(["duesOutItems"])
            queryClient.refetchQueries(["duesOutAmount"])
        },
        onError : (error) => {
            console.log(error)
        }
    });

    const onSubmit = ({ title, amount, note }:IDuesOutItemAddForm) => {
        if (date && teamPk && detailPk) {
            duesOutItemAddMutation.mutate({ teamPk, detailPk, title, date, amount, note });
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 지출 내역 추가하기 </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={5}>
                    <FormControl>
                        <FormLabel> 
                            제목
                        </FormLabel>
                        <Input {...register("title", {required:true})} required type="text" maxLength={12} isInvalid={Boolean(errors.title?.message)} placeholder={"내역 이름, 최대 12자"} />
                    </FormControl>
                    <FormControl>
                        <FormLabel> 
                            날짜 
                        </FormLabel>
                        <Box my={6}>
                            <Calendar onChange={handleDateChange} prev2Label={null} next2Label={null} minDetail="month" maxDate={new Date(Date.now() + (60*60*24*7*4*6*1000))} formatDay={(locale, date) => date.toLocaleString("en", {day : "numeric"})} />
                        </Box>
                        <FormHelperText fontSize={"xs"}> 날짜는 필수로 선택해야 합니다. </FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            - 금액
                        </FormLabel>
                        <InputGroup>
                            <InputLeftAddon children={<FaCashRegister />} />
                            <Input {...register("amount", {required:true})} required type="number" min={0} isInvalid={Boolean(errors.amount?.message)} placeholder={"지출 금액"} />
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel> 
                            비고
                        </FormLabel>
                        <Input {...register("note")} type="text" maxLength={12} isInvalid={Boolean(errors.note?.message)} placeholder={"선택"} />
                    </FormControl>
                    {duesOutItemAddMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> 문제가 발생했습니다. </Text>) : null}
                    <Button type="submit" isLoading={duesOutItemAddMutation.isLoading} size={"md"} width="100%" backgroundColor={"black"} color={"white"}> 지출 내역 추가하기 </Button>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}