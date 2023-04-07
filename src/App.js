// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ScrollToTop from "./components/ScrollToTop";
import { ProgressBarStyle } from "./components/ProgressBar";
import MotionLazyContainer from "./components/animate/MotionLazyContainer";
import { ToastContainer } from "react-toastify";

// ----------------------------------------------------------------------

export default function App() {
  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <ProgressBarStyle />
        <ScrollToTop />
        <Router />
        <ToastContainer />
      </ThemeProvider>
    </MotionLazyContainer>
  );
}
