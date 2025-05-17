const express = require("express");
const { addAgent, getAgents, } = require("../controllers/agentController");
const auth = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/add", auth, addAgent);
router.get("/", auth, getAgents);


module.exports = router;
