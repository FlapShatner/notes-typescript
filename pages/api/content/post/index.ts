import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { Tag, NoteData } from "../../../create";

// POST /api/content/post

type Data = {
  title: string;
  markdown: string;
  tags: Tag[];
  id: string; 
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, markdown, tags, id }: Data = req.body;

  let connects = [];
  for (let t of tags) {
    connects.push({ uuid: t.uuid });
  }

  const result = await prisma.note.create({
    data: {
      title: title,
      markdown: markdown,
      author:{
        connect: {
        id:id }
      },
      tags: {
        connect: connects,
      },
    },
  });
  res.json(result);
}
