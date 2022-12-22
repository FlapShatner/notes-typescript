import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { Tag } from "../../../create";

// PUT /api/content/tag/[id]

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {id} = req.query
  const {uuid, label}:Tag = req.body
  const result = await prisma.tag.update({
    where:{
        uuid:id
    },
    data: {
        uuid:uuid,
      label: label,
    },
  });
  res.json(result);
}
