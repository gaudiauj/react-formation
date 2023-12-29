import { myCache } from "~/entry.server";

export default function () {
  myCache.flushAll();
}
