import type  { OgObject } from "open-graph-scraper/dist/lib/types";

export type OgTag = {
  title: OgObject["ogTitle"];
  images: OgObject["ogImage"];
  url: OgObject["ogUrl"];
  description: OgObject["ogDescription"];
};
