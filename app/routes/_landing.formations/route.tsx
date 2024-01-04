import { redirect } from "@remix-run/node";

export const loader = async () => {
  return redirect("/formations/plan", 308);
};
export const handle = {
  getSitemapEntries: () => null,
};
