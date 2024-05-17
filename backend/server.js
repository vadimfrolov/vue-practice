const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const fs = require('fs');
const path = require('path');

app.use(cors());

app.get('/api/data', (req, res) => {
  const dataFilePath = path.join(__dirname, 'data.json');
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading data file');
      return;
    }
    const jsonData = JSON.parse(data);
    const { filter } = req.query;
    let filteredMachines = jsonData.machines;

    if (filter === 'active') {
      filteredMachines = jsonData.machines.filter(machine => machine.active);
    }

    res.json({
      machines: filteredMachines
    });
  });
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
