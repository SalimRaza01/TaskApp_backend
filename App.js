import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModel';

const { width, height } = Dimensions.get('window');


const API_URL = 'http://localhost:3000/tasks'; // Assuming this is your API endpoint

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'Pending',
    deadline: '',
    createdAt: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [validationError, setValidationError] = useState(false);

  const fetchTasksFromServer = () => {
    axios
      .get(API_URL)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  };

  useEffect(() => {
    fetchTasksFromServer();
  }, []);

  const fetchTasks = async () => {
    // Fetch tasks directly from MongoDB using the appropriate MongoDB driver
    // Replace with your MongoDB connection and query logic
    // Example:
    // const tasks = await mongodb.collection('tasks').find({}).toArray();
    // setTasks(tasks);
  };

  const handleAddTask = async () => {
    // Add a new task to MongoDB
    // Replace with your MongoDB connection and insert logic
    // Example:
    // await mongodb.collection('tasks').insertOne(task);
    // fetchTasks();
  };

  const handleEditTask = async (task) => {
    // Edit a task in MongoDB
    // Replace with your MongoDB connection and update logic
    // Example:
    // await mongodb.collection('tasks').updateOne({ _id: taskId }, { $set: updatedTask });
    // fetchTasks();
  };

  const handleDeleteTask = async (taskId) => {
    // Delete a task from MongoDB
    // Replace with your MongoDB connection and delete logic
    // Example:
    // await mongodb.collection('tasks').deleteOne({ _id: taskId });
    // fetchTasks();
  };

  const handleToggleCompletion = async (taskId) => {
    // Toggle task completion status in MongoDB
    // Replace with your MongoDB connection and update logic
    // Example:
    // await mongodb.collection('tasks').updateOne({ _id: taskId }, { $set: { status: 'Completed' } });
    // fetchTasks();
  };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Task Manager</Text>
            <View style={styles.divider} />
            <TaskList
                tasks={tasks}
                handleEditTask={handleEditTask}
                handleToggleCompletion={
                    handleToggleCompletion
                }
                handleDeleteTask={handleDeleteTask}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                    setEditingTask(null);
                    setTask({
                        title: "",
                        description: "",
                        status: "Pending",
                        deadline: "",
                        createdAt: "",
                    });
                    setModalVisible(true);
                    setValidationError(false);
                }}>
                <Text style={styles.addButtonText}>
                    {editingTask ? "Edit Task" : "Add Task"}
                </Text>
            </TouchableOpacity>

            <TaskModal
                modalVisible={modalVisible}
                task={task}
                setTask={setTask}
                handleAddTask={handleAddTask}
                handleCancel={() => {
                    setEditingTask(null);
                    setTask({
                        title: "",
                        description: "",
                        status: "Pending",
                        deadline: "",
                        createdAt: "",
                    });
                    setModalVisible(false);
                    setValidationError(false);
                }}
                validationError={validationError} />
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f7f7f7",
    },
    title: {
        fontSize: width * 0.08,
        fontWeight: "bold",
        marginTop: height * 0.04,
        marginBottom: -10,
        color: "#333",
        textAlign: "left",
    },
    divider: {
        marginTop: height * 0.04,
        backgroundColor: "#007BFF",
        height: 2,
    },
    addButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#007BFF",
        paddingVertical: height * 0.02,
        borderRadius: width * 0.1,
        marginTop: height * 0.04,
        marginBottom: height * 0.02,
    },
    addButtonText: {
        color: "#fff",
        fontSize: width * 0.05,
        fontWeight: "bold",
    },
});