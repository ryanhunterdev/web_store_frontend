import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClientProvider, QueryClient } from  "react-query";
import { BrowserRouter as Router } from 'react-router-dom';
import { ModalProvider } from './ModalContext';
import { ProductsProvider } from './ProductsContext';
import { ChakraProvider } from "@chakra-ui/react"

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
      <ChakraProvider>
          <ModalProvider>
            <ProductsProvider>
            <App />
            </ProductsProvider>
          </ModalProvider>
        </ChakraProvider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
