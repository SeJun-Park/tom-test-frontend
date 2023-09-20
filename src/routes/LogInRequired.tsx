import { Box, Button, Heading, HStack, LightMode, Text, useColorModeValue, useDisclosure, VStack } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { useRecoilValue } from "recoil";
import { loginRequiredImageState } from "../atoms";
import LoginModal from "../components/LoginModal";
import SignUpModal from "../components/SignUpModal";

export default function LogInRequired() {

    const logoColor = useColorModeValue("main.500", "white");
    const loginRequiredImage = useRecoilValue(loginRequiredImageState)

    const { isOpen:isLoginOpen, onClose:onLoginClose, onOpen:onLoginOpen } = useDisclosure();
    const { isOpen:isSignUpOpen, onClose:onSignUpClose, onOpen:onSignUpOpen } = useDisclosure();

    return (
          <VStack justifyContent={"center"} minHeight={"100vh"}>
              <Helmet>
                  <title> 3OM | Home </title>
              </Helmet>
              <Box position="absolute" top={0} left={0} right={0} bottom={0}>
                  <Box
                  backgroundImage={`url(${loginRequiredImage})`}
                  backgroundSize="cover"
                  backgroundPosition="center"
                  backgroundRepeat="no-repeat" // 이 속성을 추가하여 이미지가 반복되지 않도록 함
                  width="100vw"  // 너비를 전체 뷰포트 너비로 설정
                  height="100vh" // 높이를 전체 뷰포트 높이로 설정
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  padding={2}
                  >
                    <Heading size="xl" color="white">
                      로그인이 필요합니다.
                    </Heading>
                    <Text color="white" mt={2}>
                      운영진을 위한
                    </Text>
                    <Text color="white" mt={0}>
                      쉽고 편한 조기축구 팀 관리 서비스
                    </Text>
                    <HStack spacing={4} mt={4}>
                      <Button onClick={onLoginOpen}>로그인</Button>
                      <LightMode>
                        <Button onClick={onSignUpOpen} backgroundColor="main.500" color="white">
                          가입하기
                        </Button>
                      </LightMode>
                    </HStack>
                  </Box>
              </Box>
              <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
              <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose}/>
          </VStack>  
          
    )
}