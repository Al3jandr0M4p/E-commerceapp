import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth
import Login from "../modules/auth/pages/Login";
import Register from "../modules/auth/pages/Register";
import {ForgotPassword} from "../modules/auth/pages/Forgot";
import {VerifyCode} from "../modules/auth/pages/VerifyCode";
import { ResetPassword } from "../modules/auth/pages/ResetPassword";

// Shops
import EcommerceMenu from "../modules/shop/pages/Ecommerce";
import Shops from "../modules/shop/pages/userShops";

import "../styles/Main.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registrarte" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ruta de los usuarios sin roles */}
        <Route path="/shopCap" element={<EcommerceMenu />}>
          <Route index element={<Shops />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
