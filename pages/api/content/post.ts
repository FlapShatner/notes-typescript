
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { Tag, NoteData } from '../../create'

// POST /api/content/post



export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { title, markdown, tags }:NoteData = req.body

    let connects =[]
    for(let t of tags){
       connects.push({uuid: t.uuid}) 
    }
    console.log(connects)

    const result = await prisma.note.create({
      data: {
        title: title,
        markdown: markdown,
        tags: {
          connect: connects
        }        
      },
      
    })
    res.json(result)
  }

