import { NextApiRequest, NextApiResponse } from "next";

import randomString from "../../helpers/randomString";
import { prisma } from "../../db/client";

type RequestBody = {
  sourceUrl: string;
  short?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { sourceUrl, short } = JSON.parse(req.body) as RequestBody;

  if (!sourceUrl) {
    return res.status(400).send(JSON.stringify({ message: "Please send a source url" }));
  }

  const data = await prisma.shortLink.create({
    data: {
      slug: short || randomString(10),
      url: sourceUrl,
    },
  });

  return res.status(200).send(JSON.stringify(data));
};

export default handler;
