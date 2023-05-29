import { Box } from "@chakra-ui/react";

export default function SmallDivider() {
    return (
        <Box width={"100%"} height={"1"} bgGradient="linear(to-r, main.500, main.500, point.500)" my={5}> </Box>
    )
}