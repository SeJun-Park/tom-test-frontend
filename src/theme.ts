import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config : ThemeConfig = {
    initialColorMode : "light",
        // system에 맞출 지, 아니면 Default 값을 둘지
    useSystemColorMode : false,
        // system에 맞추지 않겠다 라는 뜻

};

const theme = extendTheme({ config, 
    fonts: {
        body: "Orbitron, sans-serif",
        heading: "Orbitron, sans-serif",
      },
    colors : {
        main : {
            500 : "#0C3A8F",
        },
        point : {
            500 : "#FFC108",
        },
    }
});

export default theme;