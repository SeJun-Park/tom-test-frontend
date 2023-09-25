import { Avatar, VStack, Text, Image, Box } from "@chakra-ui/react";
import { ITinyPlayer } from "../../types";

interface IFFTProps {
    lineups : ITinyPlayer[]
}

export default function FFT(props : IFFTProps) {
    return (
            <Box position="relative" 
                w="350px" 
                h="550px" 
                >
                <Image src="https://imagedelivery.net/SbAhiipQhJYzfniSqnZDWw/d4b2d911-951f-497b-aea8-d290983a1e00/public" width="100%" objectFit="cover" alt="Background Image" />
                {/* 공격수 */}
                <VStack position="absolute" top="23%" left="33%" spacing={0}>
                <Avatar src={props.lineups[0]?.avatar} showBorder={true} borderColor={"white"} />
                <Text as="b">{props.lineups[0]?.name}</Text>
                </VStack>
                <VStack position="absolute" top="23%" right="33%" spacing={0}>
                <Avatar src={props.lineups[1]?.avatar} showBorder={true} borderColor={"white"} />
                <Text as="b">{props.lineups[1]?.name}</Text>
                </VStack>
        
                {/* 미드필더 */}
                <VStack position="absolute" top="39%" left={`13%`} spacing={0}>
                    <Avatar src={props.lineups[2]?.avatar} showBorder={true} borderColor={"white"} />
                    <Text as="b">{props.lineups[2]?.name}</Text>
                </VStack>
                <VStack position="absolute" top="44%" left={`33%`} spacing={0}>
                    <Avatar src={props.lineups[3]?.avatar} showBorder={true} borderColor={"white"} />
                    <Text as="b">{props.lineups[3]?.name}</Text>
                </VStack>
                <VStack position="absolute" top="44%" left={`53%`} spacing={0}>
                    <Avatar src={props.lineups[4]?.avatar} showBorder={true} borderColor={"white"} />
                    <Text as="b">{props.lineups[4]?.name}</Text>
                </VStack>
                <VStack position="absolute" top="39%" left={`73%`} spacing={0}>
                    <Avatar src={props.lineups[5]?.avatar} showBorder={true} borderColor={"white"} />
                    <Text as="b">{props.lineups[5]?.name}</Text>
                </VStack>
        
                {/* 방어수 */}
                <VStack position="absolute" top="62%" left={`13%`} spacing={0}>
                    <Avatar src={props.lineups[6]?.avatar} showBorder={true} borderColor={"white"} />
                    <Text as="b">{props.lineups[6]?.name}</Text>
                </VStack>
                <VStack position="absolute" top="62%" left={`33%`} spacing={0}>
                    <Avatar src={props.lineups[7]?.avatar} showBorder={true} borderColor={"white"} />
                    <Text as="b">{props.lineups[7]?.name}</Text>
                </VStack>
                <VStack position="absolute" top="62%" left={`53%`} spacing={0}>
                    <Avatar src={props.lineups[8]?.avatar} showBorder={true} borderColor={"white"} />
                    <Text as="b">{props.lineups[8]?.name}</Text>
                </VStack>
                <VStack position="absolute" top="62%" left={`73%`} spacing={0}>
                    <Avatar src={props.lineups[9]?.avatar} showBorder={true} borderColor={"white"} />
                    <Text as="b">{props.lineups[9]?.name}</Text>
                </VStack>
        
                {/* 골키퍼 */}
                <VStack position="absolute" bottom="11%" left="50%" transform="translateX(-50%)" spacing={0}>
                <Avatar src={props.lineups[10]?.avatar} showBorder={true} borderColor={"white"} />
                <Text as="b">{props.lineups[10]?.name}</Text>
                </VStack>
            </Box>
    );
}
