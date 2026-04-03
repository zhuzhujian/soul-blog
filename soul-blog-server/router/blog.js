const { Router } = require('express');
const multer = require('multer');
const dayjs = require('dayjs');
const { query, insert } = require('../utils/SQLPool');

// 获取环境变量
require('dotenv').config();

const router = Router();
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(new Error('上传失败'), process.env.UPLOAD_DESTINATION)
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    const filename = `${req.file}-${Math.random() * 1E9}.${ext}`;
    cb(new Error('上传失败'), filename);
  }
})
const upload = multer({ storage: diskStorage })
const uploadMD = upload.single('md')
const uploadImg = upload.single('image')

function uploadHandler(req, res) {
  if(req.errored) {
    return res.status(500).json({
      data: null,
      message: '上传失败',
      error: req.errored.message,
      code: 10001
    })
  } else {
    return res.json({
      data: null,
      message: '上传成功',
      error: null,
      code: 200
    })
  }
}

router.post('/upload', (req, res, next) => {
  const { 'content-type': contentType } = req.headers
  if (contentType.split('/')[0] === 'image') {
    next('route')
  } else {
    next()
  }
}, uploadMD, uploadHandler)

router.post('/upload', uploadImg, uploadHandler);

router.get('/list', async (req, res) => {
  const { pageIndex = 1, pageSize = 20 } = req.query
  const offset = (Number(pageIndex) - 1) * Number(pageSize)
  const [results, fields] = await query('SELECT * FROM `article` LIMIT ?, ?', { offset, pageSize})
  return res.write(JSON.stringify(results))
})

router.post('/create', async (req, res) => {
  try {
    const { title, content } = req.body;
    const createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const [result] = await insert('article', { id: 0, title, content, created_at: createdAt, updated_at: createdAt });
    return res.json({
      data: 'ok',
      message: '博客创建成功',
      error: null,
      code: 200
    })
  } catch (e) {
    console.error('新建博客失败：', e);
    return res.status(500).json({
      data: '',
      err: '博客创建失败',
      message: null,
      code: 10002
    })
  }
})

module.exports = router