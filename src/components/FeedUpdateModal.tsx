import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, Textarea, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { feedUpdate, getTeamFeed } from "../api";
import { IFeed } from "../types";

interface FeedUpdateModalProps {
    isOpen : boolean;
    onClose : () => void;
    pk : number;
}

interface IFeedUpdateForm {
    title : string,
    payload : string
}

export default function FeedUpdateModal( props : FeedUpdateModalProps ) {

    const { teamPk } = useParams();
    const feedPk = String(props.pk)

    const { isLoading : feedLoading, data : feedData, isError : feedError } = useQuery<IFeed>(["feed", teamPk, feedPk], getTeamFeed);
    const { watch, register, setValue, handleSubmit, formState : {errors}, reset : feedUpdateFormReset } = useForm<IFeedUpdateForm>();
    const toast = useToast();
    const queryClient = useQueryClient()

    const feedUpdateMutation = useMutation(feedUpdate, {
        onSuccess : (data) => {
            toast({
                title : "피드 수정 성공",
                status : "success"
            });
            props.onClose();
            queryClient.refetchQueries(["teamFeeds"])
        }
    })

    const onSubmit = ( { title, payload } : IFeedUpdateForm) => {
        if (teamPk) {
            feedUpdateMutation.mutate({teamPk, feedPk, title, payload})
        }
    }

    return (
        <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
        {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
            <ModalOverlay />
                {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
            <ModalContent> 
                <ModalHeader color={"main.500"}> 피드 수정하기 </ModalHeader>
                <ModalCloseButton />
                <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <VStack spacing={3}>
                        <FormControl>
                            <FormLabel> 
                                피드 제목
                            </FormLabel>
                            <Input {...register("title", {required:true})} type="text" required maxLength={20} isInvalid={Boolean(errors.title?.message)} defaultValue={feedData?.title} />
                        </FormControl>
                        <FormControl>
                            <FormLabel> 
                                피드 내용
                            </FormLabel>
                            <Textarea {...register("payload", {required:"필수 항목입니다"})} required maxLength={500} isInvalid={Boolean(errors.payload?.message)} defaultValue={feedData?.payload} />
                        </FormControl>
                        {feedUpdateMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> 전부 필수 항목입니다. </Text>) : null}
                        <Button type="submit" isLoading={feedUpdateMutation.isLoading} size={"md"} width="100%" backgroundColor={"main.500"} color={"white"}> 피드 수정하기 </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}