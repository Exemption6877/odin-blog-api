import { Outlet } from "react-router-dom";
import Nav from "./components/layout/nav";
import Footer from "./components/layout/footer";

function App() {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
