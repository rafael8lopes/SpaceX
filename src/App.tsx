import { ToastContainer } from "react-toastify";
import { Header } from "./components/shared/header/Header";
import { Footer } from "./components/shared/footer/Footer";
import { LaunchPage } from "./components/launchesPage/LaunchPage";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Header />
      <LaunchPage />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
