import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";

import { FirstPage, PayPage, CompletionPage } from "./pages";

import { store } from "./redux";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#FA551D",
          "&:hover": {
            backgroundColor: "#FFAD92", // Replace this with your desired hover color
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderColor: "#FA551D",
          backgroundColor: "#FFF5F3",
        },
      },
    },
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FirstPage />} />
            <Route path="/pay/*" element={<PayPage />} />
            <Route
              path="/completion"
              element={
                <CompletionPage
                  stripePromise={loadStripe(
                    import.meta.env.VITE_API_STRIPE_TEST
                  )}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
