import { Avatar, Box, Card, CardBody, CardHeader, Divider, Flex, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { FaFire, FaFutbol, FaRegCalendarMinus, FaUserNinja } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { tomAvatarState } from "../atoms";
import { formatCardsDate } from "../lib/utils";

interface INotiProps {
    name : string,
    description : string,
    dateTime : string,
    title : string,
    category : string,
    payload : string,
    isspvsr : boolean
}

export default function Noti( props : INotiProps ) {

    const tomAvatar = useRecoilValue(tomAvatarState)
    
    return (
        <Card maxW='xs' minW='xs'>
            <CardHeader>
                <Flex gap="4">
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Avatar src={tomAvatar} />

                    <Box>
                    <VStack alignItems={"flex-start"}>
                        <Heading size='sm'>{props.name}</Heading>
                        <Text>{props.description}</Text>
                    </VStack>
                    </Box>
                </Flex>
                </Flex>
            </CardHeader>
            <CardBody pt={0}>
                <Stack spacing='3' alignItems={"flex-start"}>
                    {/* <Text fontSize={"xs"}>2023년 07월 28일</Text> */}
                    <Divider />
                    <Text fontSize={"xs"}>{formatCardsDate(props.dateTime)}</Text>
                    {props.category === "tom" ? 
                                                    <Box ml={1} color={"point.500"}>
                                                        <FaUserNinja />
                                                    </Box>
                                             : props.category === "game" ? 
                                                                                    <Box ml={1} color={"black"}>
                                                                                        <FaFutbol />
                                                                                    </Box>
                                                                                  : props.category === "vote" ?
                                                                                  
                                                                                    <Box ml={1} color={"red"}>
                                                                                        <FaFire />
                                                                                     </Box>
                                                                                  :
                                                                                    <Box ml={1} color={"main.500"}>
                                                                                        <FaRegCalendarMinus />
                                                                                    </Box>
                                                                                 }
                    <Heading size='md'>{props.title}</Heading>
                    <Text fontSize={"md"} textAlign={"start"}>
                    {props.payload}
                    </Text>
                    <Text fontSize={"md"} align={"start"}>
                    {/* 기한 : 08월 01일 24시까지. */}
                    </Text>
                </Stack>
            </CardBody>
        </Card>
    )
}