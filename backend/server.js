const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

app.get('/api/data', (req, res) => {
  res.sendFile(__dirname + '/data.json');
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});