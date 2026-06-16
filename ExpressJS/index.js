const express = require('express');
const app = express();
app.use(express.json());
let users = [
    {
        "Name": "charan",
        "id": 101,
        "Dept": "CSE"
    }
];
app.get('/', (req, res) => {
    res.send(users);
});
app.post('/data', (req, res) => {
    const data = req.body;
    users.push(data);
    res.json({ message: 'Data received', data });
});

app.put('/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    if (updatedData.id !== id) {
        return res.status(400).json({ message: 'ID in the request body does not match the ID in the URL' });
    }
    users.push(updatedData);
    res.json({ message: 'Data updated', updatedData });
})

app.delete('/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    users = users.filter(user => user.id !== id);
    res.json({ message: 'Data deleted', id });
})

app.listen(3000, () => {
    console.log('Server is running on port "https://localhost:3000"');
});