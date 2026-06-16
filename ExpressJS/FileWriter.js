const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});
const DATA_FILE = path.join(__dirname, 'hi.json');
async function readStore() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return { file: parsed, root: parsed, wrapper: null };
    return { file: parsed, root: parsed.users || [], wrapper: parsed };
  } catch (err) {
    return { file: null, root: [], wrapper: null };
  }
}
async function writeStore(users, wrapper) {
  const out = wrapper && typeof wrapper === 'object'
    ? { ...wrapper, users }
    : users;
  await fs.writeFile(DATA_FILE, JSON.stringify(out, null, 2), 'utf8');
}
app.param('id', (req, res, next, id) => {
  const num = parseInt(id, 10);
  if (Number.isNaN(num)) return res.status(400).json({ message: 'Invalid id' });
  req.requestedId = num;
  next();
});
app.route('/data')
  .get(async (req, res) => {
    const { root } = await readStore();
    res.json(root);
  })
  .post(async (req, res) => {
    const { root, wrapper } = await readStore();
    const newUser = req.body;
    if (newUser.id == null) {
      const maxId = root.reduce((m, u) => Math.max(m, u.id || 0), 0);
      newUser.id = maxId + 1;
    } else if (root.some(u => u.id === newUser.id)) {
      return res.status(409).json({ message: 'ID already exists' });
    }
    root.push(newUser);
    await writeStore(root, wrapper);
    res.status(201).json({ message: 'Data received', data: newUser });
  });
app.route('/data/:id')
  .put(async (req, res) => {
    const id = req.requestedId;
    const updatedData = req.body;
    if (updatedData.id !== id) {
      return res.status(400).json({ message: 'ID in the request body does not match the ID in the URL' });
    }
    const { root, wrapper } = await readStore();
    const idx = root.findIndex(u => u.id === id);
    if (idx === -1) return res.status(404).json({ message: 'User not found' });
    root[idx] = updatedData;
    await writeStore(root, wrapper);
    res.json({ message: 'Data updated', updatedData });
  })
  .delete(async (req, res) => {
    const id = req.requestedId;
    const { root, wrapper } = await readStore();
    const idx = root.findIndex(u => u.id === id);
    if (idx === -1) return res.status(404).json({ message: 'User not found' });
    const removed = root.splice(idx, 1)[0];
    await writeStore(root, wrapper);
    res.json({ message: 'Data deleted', id: removed.id });
  });
app.get('/', async (req, res) => {
  const { root } = await readStore();
  res.json(root);
});
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});