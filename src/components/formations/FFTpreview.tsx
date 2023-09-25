import { Avatar, VStack, Text, Image, Box, HStack } from "@chakra-ui/react";
import FormationPlayer from "../FormationPlayer";

interface IFFTpreviewProps {
    lineups : number[]
}

export default function FFTpreview(props : IFFTpreviewProps) {
    return (
            <Box position="relative" 
                w="350px" 
                h="550px" 
                >
                <Image src="https://imagedelivery.net/SbAhiipQhJYzfniSqnZDWw/d4b2d911-951f-497b-aea8-d290983a1e00/public" width="100%" objectFit="cover" alt="Background Image" />
                {/* 공격수 */}
                <VStack position="absolute" top="23%" left="32%" spacing={0}>
                    <HStack spacing={1}>
                        <Text as="b" fontSize={"xs"} color={"main.500"}>1</Text>
                        <FormationPlayer playerPk={props.lineups[0]}/>
                    </HStack>
                </VStack>
                <VStack position="absolute" top="23%" right="32%" spacing={0}>
                    <HStack spacing={1}>
                        <Text as="b" fontSize={"xs"} color={"main.500"}>2</Text>
                        <FormationPlayer playerPk={props.lineups[1]}/>
                    </HStack>
                </VStack>
        
                {/* 미드필더 */}
                <VStack position="absolute" top="39%" left={`10%`} spacing={0}>
                    <HStack spacing={1}>
                        <Text as="b" fontSize={"xs"} color={"main.500"}>3</Text>
                        <FormationPlayer playerPk={props.lineups[2]}/>
                    </HStack>
                </VStack>
                <VStack position="absolute" top="44%" left={`30%`} spacing={0}>
                    <HStack spacing={1}>
                        <Text as="b" fontSize={"xs"} color={"main.500"}>4</Text>
                        <FormationPlayer playerPk={props.lineups[3]}/>
                    </HStack>
                </VStack>
                <VStack position="absolute" top="44%" left={`50%`} spacing={0}>
                    <HStack spacing={1}>
                        <Text as="b" fontSize={"xs"} color={"main.500"}>5</Text>
                        <FormationPlayer playerPk={props.lineups[4]}/>
                    </HStack>
                </VStack>
                <VStack position="absolute" top="39%" left={`70%`} spacing={0}>
                    <HStack spacing={1}>
                        <Text as="b" fontSize={"xs"} color={"main.500"}>6</Text>
                        <FormationPlayer playerPk={props.lineups[5]}/>
                    </HStack>
                </VStack>
        
                {/* 방어수 */}
                <VStack position="absolute" top="62%" left={`10%`} spacing={0}>
                    <HStack spacing={1}>
                        <Text as="b" fontSize={"xs"} color={"main.500"}>7</Text>
                        <FormationPlayer playerPk={props.lineups[6]}/>
                    </HStack>
                </VStack>
                <VStack position="absolute" top="62%" left={`30%`} spacing={0}>
                    <HStack spacing={1}>
                        <Text as="b" fontSize={"xs"} color={"main.500"}>8</Text>
                        <FormationPlayer playerPk={props.lineups[7]}/>
                    </HStack>
                </VStack>
                <VStack position="absolute" top="62%" left={`50%`} spacing={0}>
                    <HStack spacing={1}>
                        <Text as="b" fontSize={"xs"} color={"main.500"}>9</Text>
                        <FormationPlayer playerPk={props.lineups[8]}/>
                    </HStack>
                </VStack>
                <VStack position="absolute" top="62%" left={`70%`} spacing={0}>
                    <HStack spacing={1}>
                        <Text as="b" fontSize={"xs"} color={"main.500"}>10</Text>
                        <FormationPlayer playerPk={props.lineups[9]}/>
                    </HStack>
                </VStack>
        
                {/* 골키퍼 */}
                <VStack position="absolute" bottom="11%" left="49%" transform="translateX(-49%)" spacing={0}>
                    <HStack spacing={1}>
                        <Text as="b" fontSize={"xs"} color={"main.500"}>11</Text>
                        <FormationPlayer playerPk={props.lineups[10]}/>
                    </HStack>
                </VStack>
            </Box>
    );
}
