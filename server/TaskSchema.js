const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  status: String,
  deadline: String,
  createdAt: String,
  comments: [
    {
      email: String,
      username: String,
      message: String,
    },
  ],
  userId: String,
  priority: String, 
  assignedUser: String,
  email: String,
});

mongoose.model("Task", TaskSchema);
