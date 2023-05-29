import { Avatar, Divider, HStack, Text } from "@chakra-ui/react"
import { FaArrowRight } from "react-icons/fa"

export default function NullPlayer () {
    return (
        <>
            <HStack width={"100%"} justifyContent={"space-between"} my={5} px={3}>
                <HStack spacing={3}>
                    <Avatar src={""}></Avatar>
                    <Text as="b" fontSize={"xs"}>9.</Text>
                    <Text as="b" fontSize={"xs"}>PARKSEJUN</Text>
                </HStack>
                <FaArrowRight size={10} />
            </HStack>
            <Divider />
        </>
    )
}