import { Box, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import AppRoutes from "./app-routes";
import "./App.css";
import IntegrateLex from "./components/Lex/IntegrateLex";
import { store } from "./store";
import { theme } from "./theme/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <Box className="App">
          <ThemeProvider theme={theme}>
            <AppRoutes />
            <IntegrateLex />
          </ThemeProvider>
        </Box>
      </Provider>
    </>
  );
}

export default App;
