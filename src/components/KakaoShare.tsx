import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaComment } from "react-icons/fa";
import Empty from "./Empty";

declare global {
    interface Window {
      Kakao: any;
    }
  }

interface KakaoShareProps {
    title : string,
    description : string,
    imageUrl : string,
    mobileWebUrl : string,
    webUrl : string,
    btnTitle : string
}


export default function KakaoShare(props:KakaoShareProps) {

    useEffect(() => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init('73a35797c5557b800422cc5735d88d6f');
        }
    }, []);
    

    const sendKakaoLink = () => {
        window.Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: props.title,
            description: props.description,
            imageUrl: props.imageUrl,
            link: {
              mobileWebUrl: props.mobileWebUrl,
              webUrl: props.webUrl,
            },
          },
          buttons: [
            {
              title: props.btnTitle,
              link: {
                mobileWebUrl: props.mobileWebUrl,
                webUrl: props.webUrl,
              },
            },
          ],
        });
      }

    return (
        <VStack spacing={0}>
            <Empty />
            <Button onClick={sendKakaoLink} color="gray" my={3} variant={"unstyled"}>
                <Box 
                    w="36px"   // 원하는 크기에 따라 조절하세요.
                    h="36px"   // 원하는 크기에 따라 조절하세요.
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    // border="1px"   // Avatar와 유사한 테두리를 원하면 추가하세요.
                    // borderColor={"black"}
                    color="#412423"
                    backgroundColor={"#fae11c"}
                >
                    <FaComment/>
                </Box>
            </Button>
            <Text fontSize={"sm"} as="b" color={"gray"}> 카카오로 공유하기 </Text>
            <Text fontSize={"xs"} color={"gray"} pt={0}> *현재 화면을 팀원들에게 공유해주세요! </Text>
            <Empty />
        </VStack>
    );
  }