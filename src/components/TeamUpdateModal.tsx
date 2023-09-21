import { useForm } from "react-hook-form";
import { Button, FormControl, FormHelperText, FormLabel, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTeam, isSpvsrTeams, teamUpdate } from "../api";
import { FaCheck, FaKey, FaStream } from "react-icons/fa";
import { ITeam, ITinyTeam } from "../types";
import { useParams } from "react-router-dom";

interface TeamUpdateModalProps {
    isOpen : boolean;
    onClose : () => void;
}

interface ITeamUpdateForm {
    description? : string;
    since? : number;
    code : number;
}

export default function TeamUpdateModal ( props : TeamUpdateModalProps ) {

    const { teamPk } = useParams();

    const { isLoading : teamLoading, data : teamData, isError : teamError } = useQuery<ITeam>(["team", teamPk], getTeam);
    const { register, handleSubmit, formState : {errors}, reset : teamUpdateFormReset } = useForm<ITeamUpdateForm>();

    const toast = useToast();
    const queryClient = useQueryClient()

    const teamUpdateMutation = useMutation(teamUpdate, {
        onSuccess : (data) => {
            console.log("team info update successful")
            // data.ok
            toast({
                title : "팀 정보 업데이트 성공",
                status : "success",
                duration : 1000,
            });
            props.onClose();
            queryClient.refetchQueries(["team"])
        },
        onError : (error) => {
            console.log(error)
        }
    });

    const onSubmit = ( { description, since, code } :ITeamUpdateForm) => {
        if(teamPk) {
            teamUpdateMutation.mutate({ teamPk, description, since, code });
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> 팀 정보 업데이트 </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                <VStack>
                    <FormControl>
                        <FormLabel>
                            팀 이름
                        </FormLabel>
                        <Input type={"text"} isReadOnly placeholder={teamData?.name} variant={"flushed"} color={"gray.400"}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            팀 설명
                        </FormLabel>
                        <InputGroup>
                            <InputLeftAddon children={<FaStream />} />
                            <Input {...register("description")} type="text" isInvalid={Boolean(errors.description?.message)} defaultValue={teamData ? teamData.description : ""} placeholder={teamData ? teamData.description : ""} />
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            창단 연도
                        </FormLabel>
                        <InputGroup>
                            <InputLeftAddon children={<FaCheck />} />
                            <Input {...register("since")} type="number" min={0} isInvalid={Boolean(errors.since?.message)} defaultValue={teamData ? teamData.since.toString() : ""} placeholder={teamData ? teamData.since.toString() : ""} />
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            팀 코드
                        </FormLabel>
                        <InputGroup>
                            <InputLeftAddon children={<FaKey />} />
                            <Input {...register("code", {required:true})} type="number" min={0} isInvalid={Boolean(errors.code?.message)} defaultValue={teamData ? teamData.code.toString() : ""} placeholder={teamData ? teamData.code.toString() : ""} />
                        </InputGroup>
                        <FormHelperText>* 팀 코드는 플레이어가 연결 요청 시 비밀번호 역할을 합니다.</FormHelperText>
                    </FormControl>
                    {teamUpdateMutation.isError ? (<Text color={"red.100"} textAlign={"center"} fontSize={"sm"}> 문제가 발생했습니다. </Text>) : null}
                    <Button type="submit" isLoading={teamUpdateMutation.isLoading} size={"md"} width="100%" backgroundColor={"point.500"} color={"black"}> 팀 정보 업데이트 </Button>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}