import { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../context/AuthContext";

interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

export default function Todo() {
  const { token, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:3000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  const handleAdd = async () => {
    if (!newTask.trim()) return;
    await axios.post(
      "http://localhost:3000/api/tasks",
      { title: newTask },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setNewTask("");
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:3000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  const handleToggleComplete = async (task: Task) => {
    await axios.put(
      `http://localhost:3000/api/tasks/${task._id}`,
      { ...task, completed: !task.completed },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        My Tasks
      </Typography>

      <TextField
        fullWidth
        label="New Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <Button
        onClick={handleAdd}
        variant="contained"
        sx={{ mt: 2, mb: 2 }}
        fullWidth
      >
        Add Task
      </Button>

      <List>
        {tasks.map((task) => (
          <ListItem
            key={task._id}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleDelete(task._id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <Checkbox
              checked={task.completed}
              onChange={() => handleToggleComplete(task)}
            />
            <ListItemText
              primary={task.title}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            />
          </ListItem>
        ))}
      </List>

      <Button onClick={logout} variant="outlined" color="error" fullWidth>
        Logout
      </Button>
    </Container>
  );
}
