import { getUser } from "~/session.server";

export default async function (request: Request) {
  const user = await getUser(request);
  return !user || user.email !== "jean@react-formation.fr";
}
