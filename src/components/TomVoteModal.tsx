import { Box, Button, Checkbox, Divider, FormControl, FormHelperText, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gameDelete, tomVoteBallot } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IGameVote } from "../types";
import GameNoLink from "./GameNoLink";
import { useState } from "react";
import PlayerNoLink from "./PlayerNoLink";
interface TomVoteModalProps {
    isOpen : boolean;
    onClose : () => void;
    vote : IGameVote;
}

interface IUploadBallotForm {
    ballots : number[],
}


export default function TomVoteModal ( props : TomVoteModalProps ) {

    const { gamePk } = useParams();

    const { register, handleSubmit, formState : {errors}, reset : uploadBallotFormReset } = useForm<IUploadBallotForm>();

    const toast = useToast();
    const queryClient = useQueryClient()
    const navigate = useNavigate();

    const uploadBallotMutation = useMutation(tomVoteBallot, {
        onSuccess : (data) => {
            console.log("vote successful")
            // data.ok
            toast({
                title : "투표 성공",
                status : "success"
            });
            props.onClose();
            queryClient.refetchQueries(["gameVote"])

        },
    });



    const [selectedBallot, setSelectedBallot] = useState<number[]>([]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;

        if (checked) {
        // 선택된 체크박스를 추가하고 최대 3개까지 제한
        if (selectedBallot.length < 3) {
            setSelectedBallot((prevSelectedBallot) => [...prevSelectedBallot, Number(value)]);
        }
        } else {
        // 선택 취소된 체크박스를 제거
        setSelectedBallot((prevSelectedBallot) => prevSelectedBallot.filter((item) => item !== Number(value)));
        }
    };





    const onSubmit = ({ ballots } : IUploadBallotForm) => {
        if (gamePk) {
            uploadBallotMutation.mutate({ gamePk, ballots });
        }
    }

    return (
    <Modal motionPreset="slideInBottom" isOpen={props.isOpen} onClose={props.onClose}>
    {/* motionPreset prop을 이용하면 모달이 나타나는 모양을 지정할 수 있음, default는 "scale" */}
        <ModalOverlay />
            {/* ModalOverlay는 페이지를 조금 더 어둡게 해서 Modal이 조금 더 돋보이게 해줌 */}
        <ModalContent> 
            <ModalHeader> Who's the 3OM? </ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
            {/* <GameNoLink 
                        key={props.vote.game.pk}
                        pk={props.vote.game.pk}
                        date={props.vote.game.date}
                        team={props.vote.game.team}
                        vsteam={props.vote.game.vsteam}
                        team_score={props.vote.game.team_score}
                        vsteam_score={props.vote.game.vsteam_score}
                        /> */}
            <FormControl>
                {/* <FormLabel my={5}> 
                    candidates 
                </FormLabel> */}
                {props.vote.candidates?.map((candidate) => (
                    <Box key={candidate.pk} width={"100%"}>
                        <Checkbox {...register("ballots", {required:true})} 
                                    onChange={handleCheckboxChange}
                                    value={candidate.pk}
                                    my={1}
                                    isChecked={selectedBallot.includes(candidate.pk)}
                                    isDisabled={selectedBallot.length >= 3 && !selectedBallot.includes(candidate.pk)}
                                    > 
                                    <PlayerNoLink 
                                        pk={candidate.pk}
                                        backnumber={candidate.backnumber}
                                        avatar={candidate.avatar}
                                        name={candidate.name}
                                        is_connected={candidate.is_connected}
                                        is_connecting={candidate.is_connecting}
                                    />
                                    {/* {candidate.backnumber}. {candidate.name}  */}
                        </Checkbox>
                    </Box>
                ))}
                <FormHelperText mt={5} fontSize={"xs"}> *본인에게 투표할 수 있습니다. </FormHelperText>
                <FormHelperText fontSize={"xs"}> *최대 3명에게 투표할 수 있습니다. </FormHelperText>
            </FormControl>
                    <Button type={"submit"} isLoading={uploadBallotMutation.isLoading} size={"md"} width="100%" backgroundColor={"main.500"} color={"white"} my={6}> 투표하기 </Button>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}