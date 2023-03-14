import { Outlet } from "@remix-run/react";

import Navbar from "~/components/navbar/navbar";
import Footer from "~/components/footer/footer";

export default function Index() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
