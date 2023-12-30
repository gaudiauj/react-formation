import { Client } from "@notionhq/client";
import type {
  DatabaseObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { myCache } from "../entry.server";

const NOTION_API_KEY = process.env.NOTION_API_KEY ?? "";

export const notion = new Client({ auth: NOTION_API_KEY });

export const getDatabaseBlog = async () => {
  try {
    const cachedDatabase = myCache.get("blogDatabase");
    if (cachedDatabase) return cachedDatabase as Blog[];
    const database = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID ?? "",
    });
    myCache.set("blogDatabase", parseProperties(database), 60 * 60 * 24);
    return parseProperties(database);
  } catch (error) {
    console.error(error);
  }
};

export const getPageContent = async ({ id }: { id: string }) => {
  try {
    const cachedPage = myCache.get(`blog-page-${id}`);
    if (cachedPage) return cachedPage;
    const page = await notion.blocks.children.list({ block_id: id });
    const markdown =
      //@ts-expect-error
      page.results[0] && page.results[0].code.rich_text[0].plain_text;
    myCache.set(`blog-page-${id}`, markdown);
    return markdown || "";
  } catch (error) {
    console.error(error);
  }
};

export type Blog = {
  id: string;
  title: string;
  tags: string[];
  image: string;
  status: string;
  slug: string;
};

export const parseProperties = (database: QueryDatabaseResponse): Blog[] =>
  database.results.map((row) => {
    const id = row.id;

    const properties = (row as DatabaseObjectResponse).properties;
    //  @ts-expect-error
    const date = properties?.date?.date?.start
      ? //  @ts-expect-error
        new Date(properties?.date?.date?.start)
      : "";
    //  @ts-expect-error
    const lastChange = properties?.lastChange?.date?.start
      ? //  @ts-expect-error
        new Date(properties?.lastChange?.date?.start)
      : "";

    const metaDescription =
      //@ts-expect-error
      properties?.metaDescription?.rich_text[0]?.plain_text ?? "";
    //@ts-expect-error
    const title = properties?.name?.title[0]?.plain_text ?? "";
    const tags =
      //@ts-expect-error
      properties?.tags?.multi_select.map((tag: { name: any }) => tag.name) ??
      [];

    //@ts-expect-error
    const status = properties?.status?.status?.name ?? "";
    const slug =
      //@ts-expect-error
      properties?.slug?.rich_text[0]?.plain_text ??
      title.toLowerCase().replace(/\s/g, "-");

    //@ts-expect-error
    const image = properties?.image?.url ?? "";

    return {
      id,
      title,
      tags,
      image,
      status,
      slug,
      date,
      lastChange,
      metaDescription,
    };
  });
