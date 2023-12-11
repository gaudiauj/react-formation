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
    const cachedPage = myCache.get(`page-${id}`);
    if (cachedPage) return cachedPage;
    const page = await notion.blocks.children.list({ block_id: id });
    const markdown = page.results[0].code.rich_text[0].plain_text;
    myCache.set(`page-${id}`, markdown, 60 * 60 * 24);
    return markdown;
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

    return { id, title, tags, image, status, slug };
  });
