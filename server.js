import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import util from 'util';
const execP = util.promisify(exec);

const app = express();
const PORT = process.env.PORT || 5000;
const CLIP_DIR = path.join(process.cwd(), 'clips');
if (!fs.existsSync(CLIP_DIR)) fs.mkdirSync(CLIP_DIR);

app.use(express.json({ limit: '50mb' }));
app.use('/static', express.static(CLIP_DIR));

app.get('/', (req, res) => res.send('ClipGenius backend OK'));

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));