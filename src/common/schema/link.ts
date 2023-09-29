import { z } from "zod";

export const addLinkSchema = z.object({
  url: z.string().trim().url({ message: "올바른 url을 입력해주세요." }),
});
