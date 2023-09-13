import { Text, VStack } from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";
import Empty from "./Empty";

export default function Capture() {
    return (
        <VStack spacing={3}>
            <Empty />
            <FaCamera />
            <Text fontSize={"sm"} as="b" color={"gray"}> 화면을 캡쳐하여 팀원들에게 공유해보세요! </Text>
            <Empty />
        </VStack>
    )
}