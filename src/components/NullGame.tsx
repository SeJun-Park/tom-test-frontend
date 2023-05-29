import { Box, Container, Divider, Grid, HStack, Text, VStack } from "@chakra-ui/react";

export default function NullGame() {

    return (
            <VStack alignItems={"flex-start"} px={3} my={5} width="100vw">
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
                            <Box fontWeight={"bold"} bg={"black"} color={"white"} textAlign={"center"} fontSize={"xs"} border={"none"}>
                                -
                            </Box>
                            <Box bg={"black"} border={"none"}>
                            </Box>
                            <Box fontWeight={"bold"} bg={"black"} color={"white"} textAlign={"center"} fontSize={"xs"} border={"none"}>
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
            </VStack>
    )
}