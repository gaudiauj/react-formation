import { Link } from "@remix-run/react";
import { Link as UiLink } from "@chakra-ui/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import isAdmin from "~/utils/isAdmin.server";

export const meta: MetaFunction = () => {
  return [
    { title: "react-formation | admin " },
    {
      name: "robots",
      content: "noindex,nofollow",
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  if (!(await isAdmin(request))) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  return {};
};

export default function Index() {
  return (
    <>
      <UiLink as={Link} py={2} to={"/admin/pageView"}>
        vue des pages
      </UiLink>
      <UiLink as={Link} py={2} to={"/admin/message"}>
        messages
      </UiLink>
    </>
  );
}
