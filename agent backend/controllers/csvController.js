const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const Task = require('../models/Task');

const uploadAndDistribute = (req, res) => {
  const results = [];

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = path.join(__dirname, '..', req.file.path);

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        // Map and insert into Task collection
        const tasksToInsert = results.map(item => ({
          title: item.title,
          description: item.description,
          email: item.email,
          agentId: item.agentId  // Assuming your CSV also has this column
        }));

        const insertedTasks = await Task.insertMany(tasksToInsert);

        res.status(200).json({
          message: 'Tasks uploaded successfully!',
          tasks: insertedTasks
        });

        // Optionally delete the uploaded file after processing
        fs.unlinkSync(filePath);

      } catch (error) {
        res.status(500).json({ error: 'Failed to save tasks', details: error });
      }
    });
};

module.exports = { uploadAndDistribute };
