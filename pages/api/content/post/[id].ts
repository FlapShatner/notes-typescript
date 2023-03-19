import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { Tag, NoteData } from "../../../create";



export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {method} = req
  const{id} = req.query

  // DELETE /api/content/post/[id]

  if(method === 'DELETE'){
      const result = await prisma.note.delete({
        where: {
          id: id as string
        }
      })
      res.json(result)
  }
  // PUT /api/content/post/[id]

  const { title, markdown, tags, color }: NoteData = req.body;
  let connects = [];

  if(method === 'PUT') {
    
    for (let t of tags) {
      connects.push({ uuid: t.uuid });
    }
  
   

   

    await prisma.note.update({
      where: {
        id: id as string
      },
      data: {
        tags: {
          set: []
        }
      }
    })   
  
    const result = await prisma.note.update({
      where:{
          id: id as string
      },
      data: {
        title: title,
        markdown: markdown,
        color:color,
        tags: {
          connect: connects,
        },
      },
    });
    res.json(result);
  }
}
