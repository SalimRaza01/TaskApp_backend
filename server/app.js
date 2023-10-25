const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  deadline: Date,
  createdAt: Date,
  comments: [String],
});
const User = mongoose.model('User', {
  email: String,
  password: String,
});

taskSchema.virtual('creationDate').get(function () {
  const day = ('0' + this.createdAt.getDate()).slice(-2);
  return day;
});
const Task = mongoose.model('Task', taskSchema);
app.use(bodyParser.json());

const mongURL = "mongodb+srv://Salim2017:OeMdsO7TpVBLVrP1@cluster0.apqm1pu.mongodb.net/taskapp?retryWrites=true&w=majority";
mongoose.connect(mongURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    if (user.password === password) {
      return res.json({ message: 'Login successful', user });
    } else {
      return res.status(401).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/send-data', (req, res) => {

  const newTaskData = req.body;
  newTaskData.createdAt = new Date(newTaskData.createdAt);
  newTaskData.deadline = new Date(newTaskData.deadline + "Z");

  const newTask = new Task(newTaskData);
  newTask.save()
    .then(data => {
      console.log("Task saved successfully:", data);
      res.json(data);
    })
    .catch(err => {
      console.error("Error saving task:", err);
      res.status(500).send('Error saving task.');
    });
});

app.get('/send-data', (req, res) => {
  Task.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error('Error fetching tasks:', err);
      res.status(500).send('Error fetching tasks.');
    });
});

app.put('/update/:id', (req, res) => {
  const taskId = req.params.id; // Use 'id' instead of '_id'

  Task.findByIdAndUpdate(taskId, req.body, { new: true })
    .then(updatedTask => {
      if (!updatedTask) {
        return res.status(404).send('Task not found.');
      }
      res.json(updatedTask);
    })
    .catch(err => {
      console.error('Error updating task:', err);
      res.status(500).send('Error updating task.');
    });
});

app.delete('/delete/:id', (req, res) => {
  const taskId = req.params.id;

  Task.findByIdAndDelete(taskId)
    .then(deletedTask => {
      if (!deletedTask) {
        return res.status(404).send('Task not found.');
      }
      res.send('Task deleted successfully.');
    })
    .catch(err => {
      console.error('Error deleting task:', err);
      res.status(500).send('Error deleting task.');
    });
});

app.post('/save-comment', (req, res) => {
  const { taskId, comment } = req.body;

  Task.findById(taskId)
    .then(task => {
      if (!task) {
        return res.status(404).send('Task not found.');
      }
      task.comments = task.comments || [];
      task.comments.push(comment);
      return task.save();
    })
    .then(updatedTask => {
      res.json(updatedTask);
    })
    .catch(err => {
      console.error('Error saving comment:', err);
      res.status(500).send('Error saving comment.');
    });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
