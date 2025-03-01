import express from 'express';
import bodyParser from "body-parser";
const app = new express();

app.use(bodyParser.json());

const PORT = 5111;

app.get('/', (req, res) => {
    res.send({ message: 'Hello World' });
});

const todos = [{
    id: 1,
    title: 'Task 1',
    completed: false,
}, {
    id: 2,
    title: 'Task 2',
    completed: false,
}]
// READ
app.get('/api/todos', (req, res) => {
    res.json(todos);
})

// Create
app.post('/api/todos', (req, res) => {
    todos.push(req.body);
    res.json({ message: 'New Todo Added! '});
})

// Update
app.put('/api/todos/:id', (req, res) => {
    const id = +req.params.id;
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        todos[todoIndex] = {
           id,
            ...req.body
        };
    }
    res.json({ message: 'Todo Updated! '});
});

// Delete
app.delete('/api/todos/:id', (req, res) => {
    const id = +req.params.id;
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
    }
    res.json({ message: 'Todo Deleted! '});
});

// Patch
app.patch('/api/todos/:id', (req, res) => {
    const id = +req.params.id;
    const todoIndex = todos.findIndex(todo => todo.id === id);
    todos[todoIndex] = {
        ...todos[todoIndex],
        completed: !todos[todoIndex].completed
    }
    res.json({ message: 'Todo Patch Completed! '});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});