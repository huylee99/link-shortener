import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    return res.status(400).send(JSON.stringify({ message: "Slug is not valid" }));
  }

  const short = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!short) {
    return res.status(400).send(JSON.stringify({ message: "Not found" }));
  }

  return res.status(200).send(JSON.stringify({ url: short.url }));
}
