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
                width="100%"
                height="100%"
                textAlign={"center"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
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
                  {/* <Text color="black" mt={2}>
                    Please Log In / Sign Up
                  </Text> */}
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
            {/* <VStack> */}
              {/* <HStack color={logoColor} alignItems={"flex-end"} spacing={0} mb={2}>
                    <FaRunning size={"48"} />
                    <FaFutbol size={"12"} /> */}
                    {/* <Image src={logo} alt="Logo" boxSize={"24"} /> */}
                    {/* <FaAirbnb size={"48"} /> */}
                    {/* 해당 아이콘은 Chakra의 것이 아니므로 react-icons의 룰을 따라야 함 */}
                    {/* 따라서 Box로 감싸서 Chakra의 룰을 따를 수 있도록 하고 있음, 편의성, 일관성을 위해서 */}
                {/* </HStack> */}
              {/* <Heading> LogIn Required </Heading>
              <Text> Plaase LogIn / SignUp</Text>
            </VStack>
            <HStack width={"100%"} justifyContent={"center"} py={8}>
              <Button onClick={onLoginOpen}> Log In </Button>
              <LightMode>
                  <Button onClick={onSignUpOpen} backgroundColor={"main.500"} color="white"> Sign Up </Button> */}
                      {/* <LightMode></LightMode> 안에 컴포넌트를 넣으면 늘 라이트모드로 해당 컴포넌트를 유지시킬 수 있음 */}
              {/* </LightMode>
            </HStack> */}
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose}/>
          </VStack>  
          
    )
}