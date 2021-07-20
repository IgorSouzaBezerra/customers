import { BrowserRouter as Router } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from "./contexts/AuthContext";

import { Routes } from "./routes";
import { GlobalStyle } from "./styles/global";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes />
        </Router>
      </AuthProvider>
      <GlobalStyle />
      <ToastContainer />
    </>
  );
}

export default App;
