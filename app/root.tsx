import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";

import { withEmotionCache } from "@emotion/react";
import type { DocumentProps } from "postcss";
import { useContext, useEffect, useMemo } from "react";
import { ServerStyleContext, ClientStyleContext } from "./uiContext";
import {
  ChakraProvider,
  cookieStorageManagerSSR,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { createUrlView } from "./models/urlView.server";

export function meta() {
  return [
    { title: "React-formation" },

    // you can now add SEO related <links>
    //{ tagName: "link", rel: "canonical", href: "..." },

    // and <script type=ld+json>
    // {
    //   "script:ld+json": {
    //     some: "value",
    //   },
    // },
  ];
}

export async function loader({ request }: LoaderFunctionArgs) {
  const urlInfo = new URL(request.url);
  if (urlInfo.host === "react-formation.fr") {
    try {
      createUrlView({ pathname: urlInfo.pathname, search: urlInfo.search });
    } catch (e) {
      console.error(e);
    }
  }
  return json({
    uiCookie: request.headers.get("cookie") ?? "",
  });
}

const Document = withEmotionCache(
  // @ts-ignore
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function getColorMode(cookies: string) {
      const match = cookies.match(
        new RegExp(`(^| )${CHAKRA_COOKIE_COLOR_KEY}=([^;]+)`)
      );
      return match == null ? void 0 : match[2];
    }

    // here we can set the default color mode. If we set it to null,
    // there's no way for us to know what is the the user's preferred theme
    // so the cient will have to figure out and maybe there'll be a flash the first time the user visits us.
    const DEFAULT_COLOR_MODE: "light" | "dark" | null = "light";

    const CHAKRA_COOKIE_COLOR_KEY = "chakra-ui-color-mode";

    let { uiCookie } = useLoaderData<any>();

    // the client get the cookies from the document
    // because when we do a client routing, the loader can have stored an outdated value
    if (typeof document !== "undefined") {
      uiCookie = document.cookie;
    }

    // get and store the color mode from the cookies.
    // It'll update the cookies if there isn't any and we have set a default value
    const colorMode = useMemo(() => {
      if (!uiCookie) {
        return DEFAULT_COLOR_MODE;
      }
      let color = getColorMode(uiCookie);

      if (!color && DEFAULT_COLOR_MODE) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        uiCookie += ` ${CHAKRA_COOKIE_COLOR_KEY}=${DEFAULT_COLOR_MODE}`;
        color = DEFAULT_COLOR_MODE;
      }

      return color;
    }, [uiCookie]);

    return (
      <html
        lang="fr"
        {...(colorMode && {
          "data-theme": colorMode,
          style: { colorScheme: colorMode },
        })}
      >
        <head>
          <meta charSet="utf-8" />
          <meta
            name="msvalidate.01"
            content="E459DDB6D00ADF264FB9B4CB51EB0C55"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body
          {...(colorMode && {
            className: `chakra-ui-${colorMode}`,
          })}
        >
          <ChakraProvider
            theme={theme}
            colorModeManager={cookieStorageManagerSSR(uiCookie)}
          >
            {children}
          </ChakraProvider>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

const colors = {
  brand: {
    "50": "#C0DCF6",
    "100": "#98C5F1",
    "200": "#70AFEB",
    "300": "#4898E5",
    "400": "#1F82E0",
    "500": "#1968B3",
    "600": "#134E86",
    "700": "#0D3459",
    "800": "#061A2D",
    "900": "#061A2D",
  },
  blue: {
    "50": "#E9F2FC",
    "100": "#C0DCF6",
    "200": "#98C5F1",
    "300": "#70AFEB",
    "400": "#4898E5",
    "500": "#1F82E0",
    "600": "#1968B3",
    "700": "#134E86",
    "800": "#0D3459",
    "900": "#061A2D",
  },
};

const theme = extendTheme(
  { colors },
  withDefaultColorScheme({ colorScheme: "brand" })
);

export function ErrorBoundary() {
  const error = useRouteError();

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <html lang="fr">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="msvalidate.01"
            content="E459DDB6D00ADF264FB9B4CB51EB0C55"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{`${error.status} ${error.data.message}`}</title>
          <Links />
        </head>
        <body>
          <div className="error-container">
            <h1>
              {error.status} {error.data.message}
            </h1>
          </div>
          <LiveReload />
        </body>
      </html>
    );
  }

  // Don't forget to typecheck with your own logic.
  // Any value can be thrown, not just errors!
  // let errorMessage = "Unknown error";
  // if (isDefinitelyAnError(error)) {
  //   errorMessage = error.message;
  // }

  return (
    <div>
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
    </div>
  );
}

export default function App() {
  return (
    // @ts-ignore
    <Document>
      <Outlet />
    </Document>
  );
}
