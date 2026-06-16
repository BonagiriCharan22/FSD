const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/json', (req, res) => {
  res.sendFile(path.join(__dirname, 'hi.json'));
});

app.get('/text', (req, res) => {
  res.sendFile(path.join(__dirname, 'sample.text')); 
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
