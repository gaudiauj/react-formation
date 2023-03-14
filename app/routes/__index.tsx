import { Outlet } from "@remix-run/react";

import Navbar from "~/components/navbar/navbar";

export default function Index() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
