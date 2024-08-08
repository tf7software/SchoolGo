const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = 80;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    const response = await axios.get(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching search results');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
