const mongoose = require('mongoose');

const todoDetails = new mongoose.Schema(
  {
      title: { type: String, required: true },
      status: { type: String, required: true },
      dueDate: { type: Date, required: true },
      userId: { type: String, rquired:true}
  },
  {
    collection: "tasks",
  }
);

mongoose.model('tasks', todoDetails);
