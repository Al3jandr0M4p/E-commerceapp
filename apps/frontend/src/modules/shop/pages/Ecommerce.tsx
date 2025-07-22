import { Outlet } from "react-router-dom";

import "../../../styles/Main.css";

function EcommerceMenu() {
  return (
    <>
      <h1>Menu de la app</h1>
      <Outlet />
    </>
  );
}

export default EcommerceMenu;
