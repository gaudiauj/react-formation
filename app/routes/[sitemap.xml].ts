import { routes } from "@remix-run/dev/server-build";
import { type DataFunctionArgs } from "@remix-run/node";
import { getDomainUrl } from "~/utils/getDomainUrl";

export const toXmlSitemap = (data: any[]) => {
  const urlsAsXml = data
    .map(
      (entry) =>
        `<url><loc>${entry.url}</loc>\n<priority>${
          entry.priority
        }</priority>\n${
          entry.lastmod
            ? `<lastmod>${new Date(entry.lastmod).toISOString()}</lastmod>`
            : ""
        }</url>`
    )
    .join("\n");

  return `
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      ${urlsAsXml}
    </urlset>
  `;
};

export async function loader({ request }: DataFunctionArgs) {
  const routesNotFlat = Object.entries(routes).map(async (route) => {
    const routeData = route[1];
    // @ts-expect-error
    const sitMapEntries = await routeData.module.handle?.getSitemapEntries(
      request
    );
    const path = routeData.path;
    if (
      sitMapEntries === null ||
      !path ||
      path === "healthcheck" ||
      (!sitMapEntries && path.includes(":"))
    )
      return null;
    if (sitMapEntries && sitMapEntries.length > 0) {
      return sitMapEntries.map(
        (entry: { url: string; priority: any; lastmod: any }) => {
          return {
            url: `${getDomainUrl(request)}/${entry.url}`,
            priority:
              // @ts-expect-error
              entry.priority || routeData.module.handle?.priority || 0.7,
            // @ts-expect-error
            lastmod: entry.lastmod || routeData.module.handle?.lastmod || null,
          };
        }
      );
    }
    return {
      url: `${getDomainUrl(request)}/${routeData.path}`,
      // @ts-expect-error
      priority: routeData.module.handle?.priority || 0.7,
      // @ts-expect-error
      lastmod: routeData.module.handle?.lastmod || null,
    };
  });

  const routesFlat = (await Promise.all(routesNotFlat))
    .flat()
    .filter((value) => {
      if (value === null) return false;
      if (value.url.includes("sitemap.xml")) return false;
      if (value.url.includes("robots.txt")) return false;
      return true;
    });

  return new Response(
    toXmlSitemap([
      ...routesFlat,
      { url: `${getDomainUrl(request)}/`, priority: 1 },
    ]),
    {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
}
