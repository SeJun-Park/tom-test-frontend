import { Avatar, Box, Container, Divider, Grid, HStack, Text, VStack } from "@chakra-ui/react";


export default function NullTomGame () {

    return (
        <>
            <VStack alignItems={"flex-start"} px={3} my={5} width={"100vw"}>
                <Divider />
                <Text as="b" fontSize={"sm"}> date </Text>
                <Divider />
                <HStack width={"100%"} height={"10"}>
                    <Container>
                        <Box textAlign={"center"} fontSize={"xs"}>
                            myteam
                        </Box>
                    </Container>
                    <Container>
                        <Grid templateColumns={"2fr 1fr 2fr"}>
                            <Box bg={"black"} fontWeight={"bold"} color={"white"} textAlign={"center"} fontSize={"xs"} border={"none"}>
                                -
                            </Box>
                            <Box bg={"black"} border={"none"}>
                                
                            </Box>
                            <Box bg={"black"} fontWeight={"bold"} color={"white"} textAlign={"center"} fontSize={"xs"} border={"none"}>
                                -
                            </Box>
                        </Grid>
                    </Container>
                    <Container>
                        <Box textAlign={"center"} fontSize={"xs"}>
                            vsteam
                        </Box>
                    </Container>
                </HStack>
                <Divider />
                <HStack height={"10"} justifyContent={"center"} width={"100%"} p={10} spacing={10}>
                    <VStack>
                        <Avatar />
                        <Text fontSize={"xx-small"}> PARKSEJUN </Text>
                    </VStack>
                    <VStack>
                        <Avatar />
                        <Text fontSize={"xx-small"}> PARKSEJUN </Text>
                    </VStack>
                    <VStack>
                        <Avatar />
                        <Text fontSize={"xx-small"}> PARKSEJUN </Text>
                    </VStack>
                </HStack>
                <Divider />
            </VStack>
        </>
    )
}