import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";
import AddEditUser from "./pages/AddEditUser";
import DashBoard from "./pages/DashBoard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/DashBoard" element={<DashBoard />} />
          <Route path="/UserDetails" element={<UserDetails />} />
          <Route path="/AddEditUser" element={<AddEditUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
