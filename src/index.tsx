import "@fontsource/orbitron/400.css";
import "@fontsource/orbitron/500.css";
import "@fontsource/orbitron/700.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import theme from './theme';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RecoilRoot } from "recoil";
import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId: 'GT-KDTS7T4'
}

TagManager.initialize(tagManagerArgs);

const client = new QueryClient();
  // 여기서 React Query가 캐싱을 엄청나게 함


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RecoilRoot>
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <RouterProvider router={router}></RouterProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </RecoilRoot>
);