import { useForm } from "react-hook-form";
import { Box, Button, FormControl, FormHelperText, FormLabel, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { scheduleAdd } from "../api";
import React, { useState } from "react";
import Calendar from "react-calendar";

interface ScheduleAddModalProps {
    isOpen : boolean;
    onClose : () => void;
    teamPk : string
}

interface IScheduleAddForm {
    title : string,
    time : string
}

export default function ScheduleAddModal ( props : ScheduleAddModalProps ) {

    const { register, handleSubmit, formState : {errors}, reset : scheduleAddFormReset } = useForm<IScheduleAddForm>();

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

    const scheduleAddMutation = useMutation(scheduleAdd, {
        onSuccess : (data) => {
            console.log("schedule add successful")
            // data.ok
            toast({
                title : "일정 추가 성공",
                status : "success",
                duration : 1000
            });
            console.log(data)
            scheduleAddFormReset()
            props.onClose();
            window.location.reload();
        },
    });

    const onSubmit = ({ title, time }:IScheduleAddForm) => {
        const teamPk = props.teamPk
        if (date && teamPk) {
            const category = "plan"
            scheduleAddMutation.mutate({ teamPk, title, date, time, category });
            // data:ILogInForm 으로 받고, mutation.mutate({ data.username, data.password }) 로 받고 싶은데 안됨
            console.log(date, time)
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader color={"main.500"}> 일정 추가하기 </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={10}>
                    <FormControl>
                        <FormLabel> 
                            이름
                        </FormLabel>
                        <Input {...register("title", {required:true})} type="text" maxLength={12} isInvalid={Boolean(errors.title?.message)} placeholder={"일정 이름, 최대 12자"} />
                    </FormControl>
                    <FormControl>
                        <FormLabel> 
                            날짜 
                        </FormLabel>
                        <Box my={6}>
                            <Calendar onChange={handleDateChange} prev2Label={null} next2Label={null} minDetail="month" maxDate={new Date(Date.now() + (60*60*24*7*4*6*1000))} formatDay={(locale, date) => date.toLocaleString("en", {day : "numeric"})} />
                        </Box>
                        <FormHelperText fontSize={"xs"}> 날짜와 시간은 필수로 선택해야 합니다. </FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel mb={5}>
                            시간
                        </FormLabel>
                        <Input {...register("time", { required : true })} type={"time"} step="1800" isInvalid={Boolean(errors.time?.message)} placeholder="" variant={"flushed"}/>

                    </FormControl>
                    {scheduleAddMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> 전부 필수 항목입니다. </Text>) : null}
                    <Button type="submit" isLoading={scheduleAddMutation.isLoading} size={"md"} width="100%" backgroundColor={"main.500"} color={"white"}> 일정 추가하기 </Button>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}