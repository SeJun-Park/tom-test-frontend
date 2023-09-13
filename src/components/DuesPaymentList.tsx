import { Box, Card, CardHeader, Flex, Heading, VStack } from "@chakra-ui/react";
import { FaArrowRight, FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";

interface IDuesPaymentListProps {
    teamPk : string;
    pk : number;
    title : string;
}

export default function DuesPaymentList( props : IDuesPaymentListProps ) {
    return (
        <Link to={`/teams/${props.teamPk}/dues/payment/${props.pk}`}>
            <Card maxW='xs' minW='xs'>
                <CardHeader>
                    <Flex gap="4" alignItems='center'>
                        <Box color={"main.500"}>
                            <FaTasks />
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