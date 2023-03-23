import { Outlet } from "@remix-run/react";

import Navbar from "./navbar";
import Footer from "./footer";

export default function Index() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
