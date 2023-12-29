import { Link } from "@remix-run/react";
import { Link as UiLink } from "@chakra-ui/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import isAdmin from "~/utils/isAdmin.server";
import flushCache from "~/utils/flushCache.server";

export const meta: MetaFunction = () => {
  return [
    { title: "react-formation | flushCash " },
    {
      name: "robots",
      content: "noindex,nofollow",
    },
  ];
};

export const handle = {
  getSitemapEntries: () => null,
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  if (!(await isAdmin(request))) {
    flushCache();
  }
  return {};
};

export default function Index() {
  return <div>Cache vidé</div>;
}
