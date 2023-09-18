import { useForm } from "react-hook-form";
import { Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGamePhoto, getUploadURL, uploadImage } from "../api";
import { useParams } from "react-router-dom";

interface GamePhotoUploadModalProps {
    isOpen : boolean;
    onClose : () => void;
}

interface IGamePhotoUploadForm {
    file : FileList;
}

interface IUploadURLResponse {
    id: string;
    uploadURL : string;
}

export default function GamePhotoUploadModal ( props : GamePhotoUploadModalProps ) {

    const { gamePk } = useParams();

    const { watch, register, handleSubmit, formState : {errors}, reset : gamePhotoUploadFormReset } = useForm<IGamePhotoUploadForm>();

    const toast = useToast();
    const queryClient = useQueryClient()

    const gamePhotoUploadMutation = useMutation(createGamePhoto, {
        onSuccess : (data) => {
            toast({
                status : "success",
                title : "사진 등록 완료",
                description : "연속으로 등록이 가능합니다",
                isClosable : true,
                // isClosable : true
            });
            gamePhotoUploadFormReset();
            queryClient.refetchQueries(["game"])
        },
        onError : (error) => {
            console.log("gamePhotoUploadMutation is onError")
            console.log(error)
        }
    })

    const uploadImageMutation = useMutation(uploadImage, {
        onSuccess : ({result}) => {
            // data 안에서 result를 뽑아내고 있음
            if(gamePk) {
                gamePhotoUploadMutation.mutate({
                    gamePk,
                    file : `https://imagedelivery.net/SbAhiipQhJYzfniSqnZDWw/${result.id}/public`,
                        // SbAh~ZDWw 는 내 아이디의 해시 값, 그러므로 고정임
                        // 이건 그냥 형식일 뿐, 별 다른 의미는 없음
                })
            }
            
        },
        onError : (error) => {
            console.log("uploadImageMutation is onError")
            console.log(error)
        }
    })

    const getUploadURLMutation = useMutation(getUploadURL, {
        onSuccess : (data:IUploadURLResponse) => {
            uploadImageMutation.mutate({
                file : watch("file"),
                    // 제대로 이해할 필요 있음
                    // "file"은 useForm에서 register된 Input 중 file이라는 이름의 Input을 말하는데, 아마 form안의 해당 Input이 submit 되면 그 파일을 넘겨받는다는 뜻인 듯
                    // form을 그대로 데이터로 가져올 때 이런 형식을 취하는 듯?
                uploadURL : data.uploadURL
            })
        },
        onError : (error) => {
            console.log("getUploadURLMutation is onError")
            console.log(error)
        }
    })

    const onSubmit = () => {
        getUploadURLMutation.mutate();
    }

    console.log(watch());

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 경기 사진 등록하기 </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                <VStack>
                    <FormControl>
                        <Input {...register("file")} type="file" accept="image/*" />
                    </FormControl>
                    {gamePhotoUploadMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> 문제가 발생했습니다. </Text>) : null}
                    <Button type="submit" isLoading={gamePhotoUploadMutation.isLoading || uploadImageMutation.isLoading || getUploadURLMutation.isLoading} size={"md"} width="100%" backgroundColor={"main.500"} color={"white"}> 등록하기 </Button>
                    {/* isLoading={} createPhotoMutation.isLoading || uploadImageMutation.isLoading || getUploadURLMutation.isLoading */}
                    {errors.file && <Text color="red.500">{errors.file.message}</Text>}
                    <Text fontSize={"sm"} color={"gray"} >*창을 닫지 않고 연속으로 등록할 수 있습니다.</Text>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}