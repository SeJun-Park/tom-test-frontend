import { Avatar, Box, Card, CardHeader, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { gameAvatarState } from "../atoms";
import { formatSchedulesDate } from "../lib/utils";
import ScheduleDeleteModal from "./ScheduleDeleteModal";

interface IScheduleProps {
    pk : number,
    avatar : string,
    dateTime : string,
    category : string,
    title : string,
    isspvsr : boolean,
}

export default function Schedule( props : IScheduleProps ) {

    const gameAvatar = useRecoilValue(gameAvatarState)

    const { isOpen : isOpen, onOpen : onOpen, onClose : onClose } = useDisclosure()

    return (
        <Card maxW='xs' minW='xs'>
            <CardHeader>
                <Flex gap="4">
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar src={props.category === "game" ? gameAvatar : props.avatar} />
                        <Box>
                        <VStack alignItems={"flex-start"}>
                            <Heading size='sm'>{formatSchedulesDate(props.dateTime)}</Heading>
                            <Text>{props.title}</Text>
                        </VStack>
                        </Box>
                    </Flex>
                    {props.isspvsr && 
                                props.category === "plan" ?
                                                        <Menu>
                                                            <MenuButton marginRight={1}>
                                                                <FaEllipsisV />
                                                            </MenuButton>
                                                            <MenuList>
                                                                <MenuItem onClick={onOpen}> 삭제하기 </MenuItem>
                                                            </MenuList>
                                                            <ScheduleDeleteModal schedulePk={props.pk} isOpen={isOpen} onClose={onClose} />
                                                        </Menu>
                                                         : null}
                </Flex>
            </CardHeader>
        </Card>
    )
}