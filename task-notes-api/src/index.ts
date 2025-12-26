import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const tasks: Task[] = [];
let nextId = 1;

// GET All
app.get('/tasks', (req: Request, res: Response) => {
  res.json(tasks);
});

// GET One
app.get('/tasks/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) res.status(404).json({ error: "Task not found" });
  else res.json(task);
});

// CREATE
app.post('/tasks', (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) {
    res.status(400).json({ error: "Title is required" });
    return;
  }
  const newTask = { id: nextId++, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// UPDATE
app.put('/tasks/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  const { title, completed } = req.body;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  res.json(task);
});

// --- NEW ROUTE: DELETE ---
app.delete('/tasks/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  // Remove the item from the array
  tasks.splice(index, 1);
  
  // Send 204 (Success, No Content)
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
