import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getAllUrlView } from "~/models/urlView.server";
import { Flex, Link as UiLink } from "@chakra-ui/react";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
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
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "0");
  if (isNaN(page)) {
    return redirect("/404");
  }
  return json({ pageView: await getAllUrlView({ page }), page });
};

export default function Index() {
  const { pageView, page } = useLoaderData<typeof loader>();
  return (
    <main>
      <TableContainer>
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>pathname</Th>
              <Th>search</Th>
              <Th>date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pageView.map((page) => (
              <Tr key={page.id}>
                <Td>{page.pathname}</Td>
                <Td>{page.search}</Td>
                <Td>{page.createdAt}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex justifyContent="center">
        <UiLink as={Link} to={`?page=${page + 1}`} color="blue">
          Page suivante
        </UiLink>
      </Flex>
    </main>
  );
}
