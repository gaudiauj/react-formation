import { Form, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import isAdmin from "~/utils/isAdmin.server";
import flushCache from "~/utils/flushCache.server";
import { myCache } from "~/entry.server";

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
    return redirect("/404");
  }
  const stats = myCache.getStats();
  return { stats };
};

export const action = async () => {
  flushCache();
};

export default function Index() {
  const { stats } = useLoaderData<typeof loader>();
  console.log({ stats });
  return (
    <Form method="post">
      <button type="submit"> vider le cache </button>
    </Form>
  );
}
