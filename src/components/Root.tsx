import { Box, HStack, Text } from "@chakra-ui/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect} from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

function ScrollToTopOnPathChange() {
    const location = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
  
    return null;
  }
  

export default function Root() {

    return (
        <Box>
            {/* Box는 Chakra UI에서의 div 같은 것, 아무 의미 없는 빈 박스 */}
            <Header />
            <ScrollToTopOnPathChange />
            <Outlet />
            <ReactQueryDevtools />
                {/* 이게 꽃 모양 버튼을 만드는 컴포넌트인듯 */}
        </Box>
    )
}