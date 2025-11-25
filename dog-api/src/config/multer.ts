import multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';

const uploadDir = path.join(__dirname, '../../uploads');

// Cria a pasta "uploads" se não existir
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: (error: any, destination: string) => void) => {
    cb(null, uploadDir);
  },
  filename: (req: any, file: any, cb: (error: any, filename: string) => void) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });
