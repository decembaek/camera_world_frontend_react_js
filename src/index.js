import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const client = new QueryClient();

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  // <StrictMode>
  <QueryClientProvider client={client}>
    <ChakraProvider>
      <ColorModeScript />
      <RouterProvider router={router} />
    </ChakraProvider>
  </QueryClientProvider>
  // </StrictMode>
);
