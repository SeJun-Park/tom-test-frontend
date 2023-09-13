import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, Textarea, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { feedAdd } from "../api";

interface FeedAddModalProps {
    isOpen : boolean;
    onClose : () => void;
}

interface IFeedAddForm {
    title : string,
    payload : string
}

export default function FeedAddModal( props : FeedAddModalProps ) {

    const { teamPk } = useParams();
    const { watch, register, setValue, handleSubmit, formState : {errors}, reset : feedAddFormReset } = useForm<IFeedAddForm>();
    const toast = useToast();
    const queryClient = useQueryClient()

    const feedAddMutation = useMutation(feedAdd, {
        onSuccess : (data) => {
            toast({
                title : "피드 업로드 성공",
                status : "success"
            });
            props.onClose();
            queryClient.refetchQueries(["teamFeeds"])
        }
    })

    const onSubmit = ( { title, payload } : IFeedAddForm) => {
        if (teamPk) {
            feedAddMutation.mutate({teamPk, title, payload})
        }
    }

    return (
        <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
        {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
            <ModalOverlay />
                {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
            <ModalContent> 
                <ModalHeader color={"main.500"}> 피드 추가하기 </ModalHeader>
                <ModalCloseButton />
                <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <VStack spacing={3}>
                        <FormControl>
                            <FormLabel> 
                                피드 제목
                            </FormLabel>
                            <Input {...register("title", {required:true})} required type="text" maxLength={20} isInvalid={Boolean(errors.title?.message)} placeholder={"피드 이름, 최대 20자"} />
                        </FormControl>
                        <FormControl>
                            <FormLabel> 
                                피드 내용
                            </FormLabel>
                            <Textarea {...register("payload", {required:true})} required maxLength={500} isInvalid={Boolean(errors.payload?.message)} placeholder={"피드 내용, 최대 500자"} />
                        </FormControl>
                        {feedAddMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> 전부 필수 항목입니다. </Text>) : null}
                        <Button type="submit" isLoading={feedAddMutation.isLoading} size={"md"} width="100%" backgroundColor={"main.500"} color={"white"}> 피드 추가하기 </Button>
                        <Text fontSize={"sm"} color={"gray"}>* 피드 업로드 이후 사진을 추가할 수 있습니다.</Text>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}