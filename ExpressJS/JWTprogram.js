// ...existing code...
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
const JWT_SECRET = process.env.JWT_SECRET || 'replace_this_with_env_secret';
const TOKEN_EXPIRY = '1h';
let users = [
  {
    "Name": "charan",
    "id": 101,
    "Dept": "CSE"
  }
];
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Missing Authorization header' });
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Malformed Authorization header' });
  }
  const token = parts[1];
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = payload;
    next();
  });
}
app.get('/', (req, res) => {
  res.json(users);
});
app.post('/login', (req, res) => {
  const { id, Name } = req.body;
  if (!id && !Name) return res.status(400).json({ message: 'Provide id or Name in body' });
  const user = users.find(u => (id && u.id === id) || (Name && u.Name === Name));
  if (!user) return res.status(401).json({ message: 'User not found' });
  const payload = { id: user.id, Name: user.Name };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
  res.json({ message: 'Login successful', token });
});
app.post('/data', authenticateToken, (req, res) => {
  const data = req.body;
  if (!data || data.id == null) return res.status(400).json({ message: 'Provide user object with id' });
  if (users.some(u => u.id === data.id)) return res.status(409).json({ message: 'User with this id already exists' });
  users.push(data);
  res.status(201).json({ message: 'Data received', data });
});
app.put('/data/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;
  if (updatedData.id !== id) {
    return res.status(400).json({ message: 'ID in the request body does not match the ID in the URL' });
  }
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return res.status(404).json({ message: 'User not found' });
  users[idx] = updatedData;
  res.json({ message: 'Data updated', updatedData });
});
app.delete('/data/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const idx = users.findIndex(user => user.id === id);
  if (idx === -1) return res.status(404).json({ message: 'User not found' });
  users = users.filter(user => user.id !== id);
  res.json({ message: 'Data deleted', id });
});
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
