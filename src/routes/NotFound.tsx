import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <VStack bgColor={"gray.100"} justifyContent={"center"} minHeight={"100vh"}>
            <Heading> Page Not Found </Heading>
            <Text> It seems that you're lost. </Text>
            <Link to={"/"}>
                <Button variant={"solid"} bgColor={"main.500"} color={"white"}> Go Home &rarr; </Button>
            </Link>
        </VStack>  
    )
}