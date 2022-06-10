import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../db/client";

const slugHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    return res
      .status(404)
      .send(JSON.stringify({ message: "Slug is not valid" }));
  }

  const data = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data) {
    return res
      .status(404)
      .send(JSON.stringify({ message: "Slug doesn't exist" }));
  }

  return res.status(201).send(JSON.stringify({ url: data.url }));
};

export default slugHandler;
