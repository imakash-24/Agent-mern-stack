const express = require("express");
const { uploadCSV, getAgentTasks } = require("../controllers/taskController");
const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();

router.post("/upload", auth, upload.single("file"), uploadCSV);
router.get("/all", auth, getAgentTasks);

module.exports = router;
