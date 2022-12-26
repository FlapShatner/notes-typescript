import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

import { Tag } from "../../../create";



export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {method} = req
  const {id} = req.query

 
  // DELETE /api/content/tag/[id]
  if(method === "DELETE"){
    const result = await prisma.tag.delete({
      where:{
        uuid:id as string
      }
    })
    res.json(result)
  } else{
// PUT /api/content/tag/[id]
  const {uuid, label}:Tag = req.body
  const result = await prisma.tag.update({
    where:{
        uuid:id as string
    },
    data: {
        uuid:uuid,
      label: label,
    },
  });
  res.json(result);
}
}