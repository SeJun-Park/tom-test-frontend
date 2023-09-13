import { Avatar, Box, Divider, HStack, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from "@chakra-ui/react";
import { FaCheckCircle, FaDotCircle, FaEllipsisH, FaMinusCircle, FaToggleOff } from "react-icons/fa";
import DuesPaymentItemDeleteModal from "./DuesPaymentItemDeleteModal";
import DuesPaymentItemUpdateModal from "./DuesPaymentItemUpdateModal";

interface IDuesPaymentItemProps {
    id : number,
    backnumber : number,
    avatar : string,
    name : string,
    payment : string,
    is_spvsr : boolean
}

export default function DuesPaymentItem( props : IDuesPaymentItemProps ) {

    const { isOpen : isDeleteOpen, onOpen : onDeleteOpen, onClose : onDeleteClose } = useDisclosure()
    const { isOpen : isUpdateOpen, onOpen : onUpdateOpen, onClose : onUpdateClose } = useDisclosure()

    const renderIcon = (payment: string) => {
        switch(payment) {
          case "paid":
            return <FaCheckCircle color={"green"} />;
          case "non_paid":
            return <FaMinusCircle color={"red"} />;
          case "na":
            return <FaDotCircle color={"black"} />;
          case "non":
            return <FaToggleOff />;
          default:
            return null;
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
                    {renderIcon(props.payment)}
                    {props.is_spvsr && 
                                                                        <>
                                                                            <Menu>
                                                                                <MenuButton marginX={1}>
                                                                                    {/* <Avatar size={"md"} name={user?.name} src={user?.avatar} /> */}
                                                                                    <FaEllipsisH size={12} />
                                                                                </MenuButton>
                                                                                <MenuList>
                                                                                    <MenuItem onClick={onUpdateOpen}> 수정하기 </MenuItem>
                                                                                    <MenuItem onClick={onDeleteOpen}> 삭제하기 </MenuItem>
                                                                                </MenuList>
                                                                                <DuesPaymentItemUpdateModal id={props.id} isOpen={isUpdateOpen} onClose={onUpdateClose} />
                                                                                <DuesPaymentItemDeleteModal id={props.id} isOpen={isDeleteOpen} onClose={onDeleteClose} />
                                                                            </Menu>
                                                                        </>
                                                                              }
                </HStack>
            </HStack>
            <Divider />
        </Box>
    )
}