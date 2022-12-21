import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { Tag, NoteData } from "../../../create";

// PUT /api/content/post/[id]

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, markdown, tags }: NoteData = req.body;
  const{id} = req.query

  let connects = [];
  for (let t of tags) {
    connects.push({ uuid: t.uuid });
  }

  const result = await prisma.note.update({
    where:{
        id: Number(id)
    },
    data: {
      title: title,
      markdown: markdown,
      tags: {
        connect: connects,
      },
    },
  });
  res.json(result);
}
