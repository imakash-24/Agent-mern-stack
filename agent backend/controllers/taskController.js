const Agent = require("../models/Agent");
const Task = require("../models/Task");
const csv = require("csv-parser");
const XLSX = require("xlsx");
const fs = require("fs");

exports.uploadCSV = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ message: "No file uploaded" });

  let records = [];

  if (file.mimetype.includes("csv")) {
    fs.createReadStream(file.path)
      .pipe(csv())
      .on("data", (row) => records.push(row))
      .on("end", () => distribute(records, res));
  } else {
    const workbook = XLSX.readFile(file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    records = XLSX.utils.sheet_to_json(sheet);
    distribute(records, res);
  }
};

async function distribute(data, res) {
  const agents = await Agent.find();
  if (agents.length === 0) return res.status(400).json({ message: "No agents found" });

  const total = data.length;
  const chunkSize = Math.floor(total / agents.length);
  let index = 0;

  for (let i = 0; i < agents.length; i++) {
    const extra = i < total % agents.length ? 1 : 0;
    const items = data.slice(index, index + chunkSize + extra);
    index += chunkSize + extra;

    for (const item of items) {
      const { FirstName, Phone, Notes } = item;
      const task = new Task({
        agentId: agents[i]._id,
        firstName: FirstName,
        phone: Phone,
        notes: Notes,
      });
      await task.save();
    }
  }

  res.json({ message: "Tasks distributed successfully" });
}

exports.getAgentTasks = async (req, res) => {
  const tasks = await Task.find().populate("agentId", "name email");
  res.json(tasks);
};
