import { Avatar, Box, Button, Divider, HStack, Menu, MenuButton, MenuItem, MenuList, Text, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaDotCircle, FaEllipsisH, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { duesPaymentItemDelete, duesPaymentItemUpdate } from "../api";

interface IDuesPaymentItemProps {
    id : number,
    backnumber : number,
    avatar : string,
    name : string,
    payment : string,
    is_spvsr : boolean
}

export default function DuesPaymentItem( props : IDuesPaymentItemProps ) {

    const { teamPk } = useParams();

    const renderIcon = (payment: string) => {
        switch(payment) {
          case "paid":
            return <FaToggleOn size={22} color={"green"} />;
          case "non_paid":
            return <FaToggleOff size={22} color={"gray"} />;
          case "na":
            return <FaDotCircle size={15} color={"black"} />;
          default:
            return null;
        }
      }

    const toast = useToast();
    const queryClient = useQueryClient()

    const duesPaymentItemUpdateMutation = useMutation(duesPaymentItemUpdate, {
        onSuccess : (data) => {
            console.log("duesPaymentItem Update successful")
            // data.ok
            toast({
                title : "업데이트 성공",
                status : "success",
                duration : 1000
            });
            queryClient.refetchQueries(["duesPaymentItems"])
        },
    });

    const onToggleButtonClick = () => {

        const itemPk = String(props.id)
        let payment = props.payment;

        if (payment === 'paid') {
            payment = 'non_paid';
        } else if (payment === 'non_paid') {
            payment = 'paid';
        } else if (payment === 'na') {
            return ;
        }

        if(teamPk) {
            duesPaymentItemUpdateMutation.mutate({ teamPk, itemPk, payment })
        }
    }

    const onNAButtonClick = () => {

        const itemPk = String(props.id)
        let payment = props.payment

        if (payment === 'na') {
            payment = 'non_paid';
        } else {
            payment = 'na';
        }

        if(teamPk) {
            duesPaymentItemUpdateMutation.mutate({ teamPk, itemPk, payment })
        }
    }

    const duesPaymentItemDeleteMutation = useMutation(duesPaymentItemDelete, {
        onSuccess : (data) => {
            console.log("duesPaymentItem delete successful")
            // data.ok
            toast({
                title : "삭제 성공",
                status : "success",
                duration : 1000
            });
            queryClient.refetchQueries(["duesPaymentItems"])
            queryClient.refetchQueries(["duesPaymentItemsExtra"])
        },
    });

    const onDeleteButtonClick = () => {

        const itemPk = String(props.id)

        if(teamPk) {
            duesPaymentItemDeleteMutation.mutate({ teamPk, itemPk })
        }
    }

    return (
        <Box width={"100%"}>
            <HStack justifyContent={"space-between"} mb={4} px={3}>
                <HStack spacing={3}>
                    <Avatar src={props.avatar}></Avatar>
                    <HStack>
                        <Text as="b" fontSize={"xs"}>{props.backnumber}.</Text>
                        <Text as="b" fontSize={"sm"}>{props.name}</Text>
                    </HStack>
                </HStack>
                <HStack>
                    {props.is_spvsr ? 
                                                                        <>
                                                                            <Button onClick={onToggleButtonClick} variant={"unstyled"} isLoading={duesPaymentItemUpdateMutation.isLoading}>
                                                                                <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                                                                    {renderIcon(props.payment)}
                                                                                </Box>
                                                                            </Button>
                                                                            <Menu>
                                                                                <MenuButton marginX={1}>
                                                                                    {/* <Avatar size={"md"} name={user?.name} src={user?.avatar} /> */}
                                                                                    <FaEllipsisH size={12} />
                                                                                </MenuButton>
                                                                                <MenuList>
                                                                                    {props.payment === 'paid' && <MenuItem onClick={onNAButtonClick}> 면제 </MenuItem>}
                                                                                    {props.payment === 'non_paid' && <MenuItem onClick={onNAButtonClick}> 면제 </MenuItem>}
                                                                                    {props.payment === 'na' && <MenuItem onClick={onNAButtonClick}> 면제 취소 </MenuItem>}
                                                                                    <MenuItem onClick={onDeleteButtonClick}> 삭제하기 </MenuItem>
                                                                                </MenuList>
                                                                            </Menu>
                                                                        </>
                                                                        :
                                                                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                                                            {renderIcon(props.payment)}
                                                                        </Box>
                                                                              }
                </HStack>
            </HStack>
            <Divider />
        </Box>
    )
}