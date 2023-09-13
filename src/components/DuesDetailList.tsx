import { Box, Card, CardHeader, Flex, Heading, VStack } from "@chakra-ui/react";
import { FaArrowRight, FaReceipt } from "react-icons/fa";
import { Link } from "react-router-dom";

interface IDuesDetailListProps {
    teamPk : string;
    pk : number;
    title : string;
}

export default function DuesDetailList( props : IDuesDetailListProps ) {

    const detailPk = String(props.pk)

    return (
        <Link to={`/teams/${props.teamPk}/dues/details/${detailPk}`}>
            <Card maxW='xs' minW='xs'>
                <CardHeader>
                    <Flex gap="4" alignItems='center'>
                        <Box color={"point.500"}>
                            <FaReceipt />
                        </Box>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Box>
                            <VStack alignItems={"flex-start"}>
                                <Heading size='sm'>{props.title}</Heading>
                            </VStack>
                            </Box>
                        </Flex>
                        <FaArrowRight size={"10"}/>
                    </Flex>
                </CardHeader>
            </Card>
        </Link>
    )
}