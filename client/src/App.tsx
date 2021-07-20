import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from "./contexts/AuthContext";

import { Routes } from "./routes";
import { GlobalStyle } from "./styles/global";
import { theme } from "./styles/theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes />
        </Router>
      </AuthProvider>
      <GlobalStyle />
      <ToastContainer />
    </ ChakraProvider>
  );
}

export default App;
