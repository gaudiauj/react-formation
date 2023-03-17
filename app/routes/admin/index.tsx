import { Link } from "@remix-run/react";
import { Link as UiLink } from "@chakra-ui/react";

export default function Index() {
  return (
    <>
      <UiLink as={Link} py={2} to={"/admin/pageView"}>
        vue des pages
      </UiLink>
    </>
  );
}
