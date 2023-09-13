import { Avatar, Box, Button, Card, CardBody, CardHeader, Divider, Flex, Heading, Image, Menu, MenuButton, MenuItem, MenuList, Stack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FaCamera, FaChevronCircleLeft, FaChevronCircleRight, FaEllipsisV, FaTrashAlt } from "react-icons/fa";
import { formatCardsDate } from "../lib/utils";
import { IPhoto } from "../types";
import FeedDeleteModal from "./FeedDeleteModal";
import FeedPhotoDeleteModal from "./FeedPhotoDeleteModal";
import FeedPhotoUploadModal from "./FeedPhotoUploadModal";
import FeedUpdateModal from "./FeedUpdateModal";

interface IFeedProps {
    pk : number,
    avatar : string,
    name : string,
    created_at : string,
    title : string,
    payload : string,
    photos : IPhoto[],
    isspvsr : boolean,
}

export default function Feed( props : IFeedProps ) {

    const { isOpen : isUpdateOpen, onOpen : onUpdateOpen, onClose : onUpdateClose } = useDisclosure()
    const { isOpen : isDeleteOpen, onOpen : onDeleteOpen, onClose : onDeleteClose } = useDisclosure()
    const { isOpen : isPhotoOpen, onOpen : onPhotoOpen, onClose : onPhotoClose } = useDisclosure()
    const { isOpen : isPhotoDeleteOpen, onOpen : onPhotoDeleteOpen, onClose : onPhotoDeleteClose } = useDisclosure()

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        if (currentImageIndex < props.photos.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };
    
    const prevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    const handleImageDeletion = () => {
        if (currentImageIndex >= props.photos.length - 1) {
            setCurrentImageIndex(props.photos.length - 2 >= 0 ? props.photos.length - 2 : 0);
        }
    };    
    
    
    return (
        <Card maxW='xs' minW='xs'>
            <CardHeader>
                <Flex gap="4">
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Avatar src={props.avatar} />

                    <Box>
                    <VStack alignItems={"flex-start"}>
                        <Heading size='sm'>{props.name}</Heading>
                    </VStack>
                    </Box>
                </Flex>
                {props.isspvsr &&
                            <Menu>
                                <MenuButton marginRight={1}>
                                    <FaEllipsisV />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={onUpdateOpen}> 수정하기 </MenuItem>
                                    <MenuItem onClick={onDeleteOpen}> 삭제하기 </MenuItem>
                                </MenuList>
                                <FeedUpdateModal pk={props.pk} isOpen={isUpdateOpen} onClose={onUpdateClose} />
                                <FeedDeleteModal pk={props.pk} isOpen={isDeleteOpen} onClose={onDeleteClose} />
                            </Menu>
                            }
                </Flex>
            </CardHeader>
            <CardBody pt={0}>
                <Stack spacing='3' alignItems={"flex-start"}>
                    {/* <Text fontSize={"xs"}>2023년 07월 28일</Text> */}
                    <Divider />
                    <Text fontSize={"xs"}>{formatCardsDate(props.created_at)}</Text>
                    <Heading size='md'>{props.title}</Heading>
                    <Text fontSize={"md"} align={"start"} style={{ whiteSpace: 'pre-line' }} mt={3}>
                        {props.payload}
                    </Text>
                    <Text fontSize={"md"} align={"start"}>
                    {/* 기한 : 08월 01일 24시까지. */}
                    </Text>
                    {props.photos && props.photos.length > 0 && (
                                                                    <Box position="relative">
                                                                        <Image
                                                                            objectFit="cover"
                                                                            maxW="100%"
                                                                            minW="100%"
                                                                            src={props.photos[currentImageIndex].file}
                                                                            borderRadius={"5px"}
                                                                        />

                                                                        {currentImageIndex !== 0 && props.photos.length > 1 && (
                                                                            <Button
                                                                                position="absolute"
                                                                                left={-1}
                                                                                top="50%"
                                                                                transform="translateY(-50%)"
                                                                                onClick={prevImage}
                                                                                variant={"ghost"}
                                                                            >
                                                                                <FaChevronCircleLeft color="#D8D8D8" />
                                                                            </Button>
                                                                        )}

                                                                        {currentImageIndex !== props.photos.length - 1 && props.photos.length > 1 && (
                                                                            <Button
                                                                                position="absolute"
                                                                                right={-1}
                                                                                top="50%"
                                                                                transform="translateY(-50%)"
                                                                                onClick={nextImage}
                                                                                variant={"ghost"}
                                                                            >
                                                                                <FaChevronCircleRight color="#D8D8D8" />
                                                                            </Button>
                                                                        )}

                                                                        {props.isspvsr &&
                                                                        <>
                                                                            <Button 
                                                                                onClick={onPhotoDeleteOpen}
                                                                                position="absolute"
                                                                                right={3}
                                                                                top={3}
                                                                                size={"xs"}
                                                                                variant={"outline"}
                                                                                // onClick={onDuesInDeleteOpen}
                                                                            >
                                                                                <FaTrashAlt color="black" size={"12"}/>
                                                                            </Button>
                                                                            <FeedPhotoDeleteModal isOpen={isPhotoDeleteOpen} onClose={onPhotoDeleteClose} pk={props.photos[currentImageIndex].id} handleImageDeletion={handleImageDeletion} />
                                                                        </>
                                                                                        }
                                                                    </Box>
                                                                )}
            
            {props.isspvsr && 
                <>
                    <Button onClick={onPhotoOpen} variant={"outline"} color={"gray"}>
                        <FaCamera size="20px" />
                    </Button>
                    <FeedPhotoUploadModal pk={props.pk} isOpen={isPhotoOpen} onClose={onPhotoClose} />
                </>
                    }
                </Stack>
            </CardBody>
        </Card>
    )
}