import { Button, Grid, GridItem, HStack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import { formatDuesItemDate } from "../lib/utils";
import DuesInItemDeleteModal from "./DuesInItemDeleteModal";

interface IDuesInItemProps {
    id : number,
    title : string,
    date : string,
    amount : number,
    note : string,
    is_spvsr : boolean
}

export default function DuesInItem( props : IDuesInItemProps ) {

    const { isOpen : isDuesInDeleteOpen, onOpen : onDuesInDeleteOpen, onClose : onDuesInDeleteClose } = useDisclosure()

    return (
        <VStack alignItems={"flex-start"} padding={3} my={2}>
            <HStack justifyContent={"center"} spacing={3}>
                <Text as="b" fontSize={"xs"}> {formatDuesItemDate(props.date)} </Text>
                {props.is_spvsr && 
                                                                            <>
                                                                                <Button onClick={onDuesInDeleteOpen} size={"xs"} variant={"outline"}>
                                                                                    <FaTrashAlt size={"12"}/>
                                                                                </Button>
                                                                                <DuesInItemDeleteModal id={props.id} isOpen={isDuesInDeleteOpen} onClose={onDuesInDeleteClose} />
                                                                            </>
                                                                              }
            </HStack>
            <Grid
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(2, 1fr)"
                width="100%"
                height={"20"}
                borderWidth="0.5px"
                borderRadius={"10"}
                overflow="hidden"
            >
            <GridItem
                rowSpan={1}
                colSpan={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderWidth="0.5px"
                
            >
                <Text>{props.title}</Text>
            </GridItem>
            <GridItem
                colSpan={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderWidth="0.5px"
                
            >
                <Text fontSize={"sm"}>+ {props.amount.toLocaleString("ko-kr")}</Text>
                <Text> 원</Text>
            </GridItem>
            <GridItem
                colSpan={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderWidth="0.5px"
                
            >
                <Text>{props.note}</Text>
            </GridItem>
            </Grid>
        </VStack>
    )
}