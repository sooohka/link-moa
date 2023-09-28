import type { ImageObject } from "open-graph-scraper/dist/lib/types";

export type OgTag = {
  title:string;
  images:ImageObject[]
  url:string;
  description:string;
};
