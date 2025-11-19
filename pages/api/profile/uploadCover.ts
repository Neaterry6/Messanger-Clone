import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

export const config = {
  api: {
    bodyParser: false
  }
};

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const form = formidable({ multiples: false });
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Upload error' });

    const userId = String(fields.userId);
    const file = files.file as formidable.File;
    if (!file || !userId) return res.status(400).json({ error: 'Missing file or userId' });

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const filename = `cover_${userId}_${Date.now()}${path.extname(file.originalFilename || '')}`;
    const destPath = path.join(uploadsDir, filename);

    await fs.copyFile(file.filepath, destPath);

    const publicPath = `/uploads/${filename}`;

    await prisma.user.update({
      where: { id: userId },
      data: { coverPhoto: publicPath }
    });

    res.status(200).json({ url: publicPath });
  });
}
