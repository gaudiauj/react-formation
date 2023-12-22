import { Link, useLoaderData } from "@remix-run/react";
import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Link as UiLink, Image, Text, HStack, Tag } from "@chakra-ui/react";
import type { LinksFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { createAndUpdateBlogFromNotion } from "~/utils/createBlogFromNotion.server";
import isAdmin from "~/utils/isAdmin.server";
import styles from './blog.css'
import randomColor from 'randomcolor'
import { countWords } from "~/utils/countWords";

export const meta: MetaFunction = () => {
  return [
    { title: "react-formation | blog " },
    {
      name: "description",
      content:
        "Les dernières nouvelles et articles de blog de react-formation ! Venez apprendre React avec nous",
    },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const isCurrentUserAdmin = await isAdmin(request);
  const blogList = await createAndUpdateBlogFromNotion(!!isCurrentUserAdmin);
  return { blogList };
};

const formatDate = (dateString: string) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const date = new Date(dateString);
  // @ts-ignore
  return date.toLocaleDateString('fr-FR', options);
};


export default function Index() {
  const { blogList } = useLoaderData<typeof loader>();

  const tagColors = ['#FF6B6B', '#48BB78', '#81E6D9', '#9F7AEA', '#F6E05E'];

  console.log(
    {blogList}
  )

  return (
    <div>
      {/* Hero Section with Image */}
      <section style={{ position: "relative", textAlign: "center" }}></section>
          
      <ul className="blog-list">
        {blogList.map((blog) => (
          <li key={blog.id}>
                
            <Card maxW='sm'>
              <CardBody>
                <Image
                  src={blog.image}
                  alt=''
                  borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                  <Text>
                    {blog.date !== null ? formatDate(blog.date) : ''}
                  </Text>
                  <p className="time-to-read">Temps de lecture :  {Math.round(countWords(blog?.blogPage?.markdown || '')/200) } min</p>
                  <HStack>
                    {blog?.tags.map((tag) => (
                      <Tag key={tag} color="white"  colorScheme="brand" > 
                        
                        {tag}
                      </Tag>
                    ))
                    }
                  </HStack>
                  <UiLink href={`${blog.slug}`} color='brand.400' fontSize='2xl'>
                    {blog.title}
                  </UiLink>
                </Stack>
              </CardBody>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
