import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Tag } from "../../create";

// POST /api/content/tag

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { label, uuid }: Tag = req.body;
  const result = await prisma.tag.create({
    data: {
      uuid: uuid,
      label: label,
    },
  });
  res.json(result);
}
