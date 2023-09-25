import { VStack, Text, Image, Box, HStack } from "@chakra-ui/react";
import { IPlayerQuotasLength } from "../../types";
import FormationPlayer from "../FormationPlayer";

interface IFFTpreviewUploadProps {
    lineups : number[],
    playerQuotasLengthArray : IPlayerQuotasLength[]
}


export default function FFTpreviewUpload(props : IFFTpreviewUploadProps) {

    const findPlayerQuotasLength = (index:number) => {
        const targetPlayer = props.playerQuotasLengthArray.find(item => item.playerId === props.lineups[index])
        if (targetPlayer) {
            return targetPlayer.gameQuotasLength+1
        } else {
            return 1
        }
    }

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
                        <VStack spacing={0}>
                            <FormationPlayer playerPk={props.lineups[0]}/>
                            <Text as="b" fontSize={"xx-small"} color={"gray.300"} mt={-1}>{props.lineups[0] && `${findPlayerQuotasLength(0)}개째`}</Text>
                        </VStack>
                    </HStack>
                </VStack>
                <VStack position="absolute" top="23%" right="32%" spacing={0}>
                    <HStack spacing={1}>
                        <Text as="b" fontSize={"xs"} color={"main.500"}>2</Text>
                        <VStack spacing={0}>
                            <FormationPlayer playerPk={props.lineups[1]}/>
                            <Text as="b" fontSize={"xx-small"} color={"gray.300"} mt={-1}>{props.lineups[1] && `${findPlayerQuotasLength(1)}개째`}</Text>
                        </VStack>
                    </HStack>
                </VStack>
        
                {/* 미드필더 */}
                <VStack position="absolute" top="39%" left={`10%`} spacing={0}>
                    <HStack spacing={1}>
                        <Text as="b" fontSize={"xs"} color={"main.500"}>3</Text>
                        <VStack spacing={0}>
                            <FormationPlayer playerPk={props.lineups[2]}/>
                            <Text as="b" fontSize={"xx-small"} color={"gray.300"} mt={-1}>{props.lineups[2] && `${findPlayerQuotasLength(2)}개째`}</Text>
                        </VStack>
                    </HStack>
                </VStack>
                <VStack position="absolute" top="44%" left={`30%`} spacing={0}>
                    <HStack spacing={1}>
                        <Text as="b" fontSize={"xs"} color={"main.500"}>4</Text>
                        <VStack spacing={0}>
                            <FormationPlayer playerPk={props.lineups[3]}/>
                            <Text as="b" fontSize={"xx-small"} color={"gray.300"} mt={-1}>{props.lineups[3] && `${findPlayerQuotasLength(3)}개째`}</Text>
                        </VStack>
                    </HStack>
                </VStack>
                <VStack position="absolute" top="44%" left={`50%`} spacing={0}>
                    <HStack spacing={1}>
                        <Text as="b" fontSize={"xs"} color={"main.500"}>5</Text>
                        <VStack spacing={0}>
                            <FormationPlayer playerPk={props.lineups[4]}/>
                            <Text as="b" fontSize={"xx-small"} color={"gray.300"} mt={-1}>{props.lineups[4] && `${findPlayerQuotasLength(4)}개째`}</Text>
                        </VStack>
                    </HStack>
                </VStack>
                <VStack position="absolute" top="39%" left={`70%`} spacing={0}>
                    <HStack spacing={1}>
                        <Text as="b" fontSize={"xs"} color={"main.500"}>6</Text>
                        <VStack spacing={0}>
                            <FormationPlayer playerPk={props.lineups[5]}/>
                            <Text as="b" fontSize={"xx-small"} color={"gray.300"} mt={-1}>{props.lineups[5] && `${findPlayerQuotasLength(5)}개째`}</Text>
                        </VStack>
                    </HStack>
                </VStack>
        
                {/* 방어수 */}
                <VStack position="absolute" top="61%" left={`10%`} spacing={0}>
                    <HStack spacing={1}>
                        <Text as="b" fontSize={"xs"} color={"main.500"}>7</Text>
                        <VStack spacing={0}>
                            <FormationPlayer playerPk={props.lineups[6]}/>
                            <Text as="b" fontSize={"xx-small"} color={"gray.300"} mt={-1}>{props.lineups[6] && `${findPlayerQuotasLength(6)}개째`}</Text>
                        </VStack>
                    </HStack>
                </VStack>
                <VStack position="absolute" top="61%" left={`30%`} spacing={0}>
                    <HStack spacing={1}>    
                        <Text as="b" fontSize={"xs"} color={"main.500"}>8</Text>                    
                        <VStack spacing={0}>
                            <FormationPlayer playerPk={props.lineups[7]}/>
                            <Text as="b" fontSize={"xx-small"} color={"gray.300"} mt={-1}>{props.lineups[7] && `${findPlayerQuotasLength(7)}개째`}</Text>
                        </VStack>
                    </HStack>
                </VStack>
                <VStack position="absolute" top="61%" left={`50%`} spacing={0}>
                    <HStack spacing={1}>
                        <Text as="b" fontSize={"xs"} color={"main.500"}>9</Text>
                        <VStack spacing={0}>
                            <FormationPlayer playerPk={props.lineups[8]}/>
                            <Text as="b" fontSize={"xx-small"} color={"gray.300"} mt={-1}>{props.lineups[8] && `${findPlayerQuotasLength(8)}개째`}</Text>
                        </VStack>
                    </HStack>
                </VStack>
                <VStack position="absolute" top="61%" left={`70%`} spacing={0}>
                    <HStack spacing={1}>
                        <Text as="b" fontSize={"xs"} color={"main.500"}>10</Text>
                        <VStack spacing={0}>
                            <FormationPlayer playerPk={props.lineups[9]}/>
                            <Text as="b" fontSize={"xx-small"} color={"gray.300"} mt={-1}>{props.lineups[9] && `${findPlayerQuotasLength(9)}개째`}</Text>
                        </VStack>
                    </HStack>
                </VStack>
        
                {/* 골키퍼 */}
                <VStack position="absolute" bottom="10%" left="49%" transform="translateX(-49%)" spacing={0}>
                    <HStack spacing={1}>
                        <Text as="b" fontSize={"xs"} color={"main.500"}>11</Text>
                        <VStack spacing={0}>
                        <FormationPlayer playerPk={props.lineups[10]}/>
                            <Text as="b" fontSize={"xx-small"} color={"gray.300"} mt={-1}>{props.lineups[10] && `${findPlayerQuotasLength(10)}개째`}</Text>
                        </VStack>
                    </HStack>
                </VStack>
            </Box>
    );
}
