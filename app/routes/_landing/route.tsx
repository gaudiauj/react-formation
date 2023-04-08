import { Outlet } from "@remix-run/react";

import Navbar from "./navbar";
import Footer from "./footer";
import { SkipNavContent } from "@chakra-ui/skip-nav";

export default function Index() {
  return (
    <>
      <Navbar />
      <SkipNavContent />
      <Outlet />
      <Footer />
    </>
  );
}
