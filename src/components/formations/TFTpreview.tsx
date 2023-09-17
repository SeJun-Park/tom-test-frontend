import { Avatar, VStack, Text, Image, Box, HStack } from "@chakra-ui/react";
import FormationPlayer from "../FormationPlayer";

interface ITFTpreviewProps {
    lineups : number[]
}

export default function TFTpreview(props : ITFTpreviewProps) {
    return (
            <Box position="relative" 
                w="350px" 
                h="550px" 
                >
                    <Image src="https://imagedelivery.net/SbAhiipQhJYzfniSqnZDWw/16eef5b5-5cf9-4cd6-7066-c12620fd5600/public" width="100%" objectFit="cover" alt="Background Image" />
                    {/* 공격수 */}
                    <VStack position="absolute" top="27%" left="32%" spacing={0}>
                        <HStack spacing={1}>
                            <Text as="b" fontSize={"xs"} color={"main.500"}>1</Text>
                            <FormationPlayer playerPk={props.lineups[0]}/>
                        </HStack>
                    </VStack>
                    <VStack position="absolute" top="27%" right="32%" spacing={0}>
                        <HStack spacing={1}>
                            <Text as="b" fontSize={"xs"} color={"main.500"}>2</Text>
                            <FormationPlayer playerPk={props.lineups[1]}/>
                        </HStack>
                    </VStack>
            
                    {/* 미드필더 */}
                    <VStack position="absolute" top="43%" left={`5%`} spacing={0}>
                        <HStack spacing={1}>
                            <Text as="b" fontSize={"xs"} color={"main.500"}>3</Text>
                            <FormationPlayer playerPk={props.lineups[2]}/>
                        </HStack>
                    </VStack>
                    <VStack position="absolute" top="46%" left={`23%`} spacing={0}>
                        <HStack spacing={1}>
                            <Text as="b" fontSize={"xs"} color={"main.500"}>4</Text>
                            <FormationPlayer playerPk={props.lineups[3]}/>
                        </HStack>
                    </VStack>
                    <VStack position="absolute" top="49%" left={`49%`} transform="translateX(-49%)" spacing={0}>
                        <HStack spacing={1}>
                            <Text as="b" fontSize={"xs"} color={"main.500"}>5</Text>
                            <FormationPlayer playerPk={props.lineups[4]}/>
                        </HStack>
                    </VStack>
                    <VStack position="absolute" top="46%" right={`23%`} spacing={0}>
                        <HStack spacing={1}>
                            <Text as="b" fontSize={"xs"} color={"main.500"}>6</Text>
                            <FormationPlayer playerPk={props.lineups[5]}/>
                        </HStack>
                    </VStack>
                    <VStack position="absolute" top="43%" right={`5%`} spacing={0}>
                        <HStack spacing={1}>
                            <Text as="b" fontSize={"xs"} color={"main.500"}>7</Text>
                            <FormationPlayer playerPk={props.lineups[6]}/>
                        </HStack>
                    </VStack>
            
                    {/* 방어수 */}
                    <VStack position="absolute" top="66%" left={`20%`} spacing={0}>
                        <HStack spacing={1}>
                            <Text as="b" fontSize={"xs"} color={"main.500"}>8</Text>
                            <FormationPlayer playerPk={props.lineups[7]}/>
                        </HStack>
                    </VStack>
                    <VStack position="absolute" top="66%" left={`50%`} transform="translateX(-50%)" spacing={0}>
                        <HStack spacing={1}>
                            <Text as="b" fontSize={"xs"} color={"main.500"}>9</Text>
                            <FormationPlayer playerPk={props.lineups[8]}/>
                        </HStack>
                    </VStack>
                    <VStack position="absolute" top="66%" right={`20%`} spacing={0}>
                        <HStack spacing={1}>
                            <Text as="b" fontSize={"xs"} color={"main.500"}>10</Text>
                            <FormationPlayer playerPk={props.lineups[9]}/>
                        </HStack>
                    </VStack>
            
                    {/* 골키퍼 */}
                    <VStack position="absolute" bottom="7%" left="50%" transform="translateX(-50%)" spacing={0}>
                        <HStack spacing={1}>
                            <Text as="b" fontSize={"xs"} color={"main.500"}>11</Text>
                            <FormationPlayer playerPk={props.lineups[10]}/>
                        </HStack>
                    </VStack>
                </Box>
    );
}