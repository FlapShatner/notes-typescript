import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


// POST /api/content/tag

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

   
    const {label} = req.body
    const result = await prisma.tag.create({
      data: {
        label: label
      },
    })
    res.json(result)
  }
 



