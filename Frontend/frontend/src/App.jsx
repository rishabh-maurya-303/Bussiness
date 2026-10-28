import Navbar from "./components/Navbar";
import Home from "./pages/public/Home"
import Services from "./pages/public/Services";

import { RouterProvider } from "react-router-dom";
import router from "./components/routes/router";

const App = () => {
  return <RouterProvider router={router} />;
}

export default App;