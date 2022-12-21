import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// POST /api/content/post

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { title, markdown, tags } = req.body
    const result = await prisma.note.create({
      data: {
        title: title,
        markdown: markdown,
        tags: tags        
      },
    })
    res.json(result)
  }

