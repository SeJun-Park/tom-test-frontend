import { useForm } from "react-hook-form";
import { Button, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duesDetailAdd } from "../api";
import { FaCalendarMinus, FaCashRegister, FaStream } from "react-icons/fa";
import { useParams } from "react-router-dom";

interface DuesDetailAddModalProps {
    isOpen : boolean;
    onClose : () => void;
}

interface IDuesDetailAddForm {
    title : string;
    memo? : string;
    carry_over? : number;
}

export default function DuesDetailAddModal ( props : DuesDetailAddModalProps ) {

    const { teamPk } = useParams();

    const { register, handleSubmit, formState : {errors}, reset : duesDetailAddFormReset } = useForm<IDuesDetailAddForm>();

    const toast = useToast();
    const queryClient = useQueryClient()

    const duesDetailAddMutation = useMutation(duesDetailAdd, {
        onSuccess : (data) => {
            console.log("duesDetail add successful")
            // data.ok
            toast({
                title : "회비 시용 내역 추가 성공",
                status : "success",
                duration : 1000
            });
            console.log(data)
            duesDetailAddFormReset()
            props.onClose();
            queryClient.refetchQueries(["teamDuesDetails"])
        },
        onError : (error) => {
            console.log(error)
        }
    });

    const onSubmit = ({ title, memo, carry_over }:IDuesDetailAddForm) => {

        if(teamPk) {
            duesDetailAddMutation.mutate({ teamPk, title, memo, carry_over });
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 회비 사용 내역 추가하기 </ModalHeader>
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
                    <FormControl>
                        <FormLabel>
                            이월 금액
                        </FormLabel>
                        <InputGroup>
                            <InputLeftAddon children={<FaCashRegister />} />
                            <Input {...register("carry_over", { setValueAs: (value) => value ? parseInt(value, 10) : 0 })} type="number" min={0} isInvalid={Boolean(errors.carry_over?.message)} placeholder={"선택"} />
                        </InputGroup>
                    </FormControl>
                    {duesDetailAddMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> 문제가 발생했습니다. </Text>) : null}
                    <Button type="submit" isLoading={duesDetailAddMutation.isLoading} size={"md"} width="100%" backgroundColor={"point.500"} color={"black"}> 사용 내역 추가하기 </Button>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}