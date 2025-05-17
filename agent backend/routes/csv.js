const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadAndDistribute } = require('../controllers/csvController');

router.post('/upload', upload.single('file'), uploadAndDistribute);

module.exports = router;
