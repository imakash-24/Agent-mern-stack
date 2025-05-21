const Agent = require("../models/Agent");
const Task = require("../models/Task");
const csv = require("csv-parser");
const XLSX = require("xlsx");
const fs = require("fs");

// Upload and process CSV/XLSX files
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

// Distribute tasks by assigning agentId via email matching
async function distribute(data, res) {
  try {
    const agents = await Agent.find();
    if (agents.length === 0)
      return res.status(404).json({ message: "No agents found" });

    for (const item of data) {
      const { title, description, email } = item;

      // Find agent by email
      const agent = await Agent.findOne({ email });
      console.log(email);

      const task = new Task({
        title,
        description,
        email,
        agentId: agent ? agent._id : null, // assign agentId if found
      });

      await task.save();
    }

    res.json({ message: "Tasks distributed successfully" });
  } catch (err) {
    console.error("Distribution Error:", err);
    res.status(500).json({ message: "Server error during distribution" });
  }
}

// Fetch tasks with agent name populated
// exports.getAgentTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find().populate("agentId", "name");

//     const formattedTasks = tasks.map(task => ({
//       title: task.title,
//       description: task.description,
//       email: task.email,
//       agentName: task.agentId?.name || "Unassigned"
//     }));

//     res.json(formattedTasks);
//   } catch (err) {
//     console.error("Fetch Tasks Error:", err);
//     res.status(500).json({ message: "Server error while fetching tasks" });
//   }
// };

exports.getAgentTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("agentId", "name");
    res.json(tasks);
  } catch (err) {
    console.error("Fetch Tasks Error:", err);
    res.status(500).json({ message: "Server error while fetching tasks" });
  }
};

