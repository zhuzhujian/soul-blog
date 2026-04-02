const { Router } = require('express');
const multer = require('multer');
const { query } = require('../utils/SQLPool')

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
const uploadMiddleWare = upload.single('blog_md')

router.post('/upload', uploadMiddleWare, (req, res) => {
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
})

router.get('/list', async (req, res) => {
  const { pageIndex = 1, pageSize = 20 } = req.query
  const offset = (Number(pageIndex) - 1) * Number(pageSize)
  const [results, fields] = await query('SELECT * FROM `article` LIMIT ?, ?', { offset, pageSize})
  return res.write(JSON.stringify(results))
})

module.exports = router