import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import express from 'express';
import { authenticateToken } from './middleware/auth.js';
import authRouter from './router/auth.js';
import blogRouter from './router/blog.js';
import commonRouter from './router/common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 这里cwd指向了pwd的路径不是当前项目的根路径
const envPath = path.resolve(__dirname, '.env');
// 在应用启动时立即加载环境变量
dotenv.config({ path: envPath });

const app = express();
app.use(express.json());
app.use(authenticateToken);
app.use('/v1', authRouter);
app.use('/v1/blog', blogRouter);
app.use('v1/common', commonRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});