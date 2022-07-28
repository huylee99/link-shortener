import { createRouter } from "../context";
import { formValidator } from "../../components/create-short-url";
import { TRPCError } from "@trpc/server";
import randomSlug from "../../utils/random-slug";

export const url = createRouter().mutation("create-short", {
  input: formValidator,
  async resolve({ input, ctx }) {
    const { slug, url } = input;

    const existed = await ctx.prisma.shortLink.findFirst({
      where: {
        slug,
      },
    });

    if (existed) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Short is existed. Please use different short" });
    }

    const short = await ctx.prisma.shortLink.create({
      data: {
        slug: slug || randomSlug(8),
        url,
      },
    });

    return short;
  },
});
