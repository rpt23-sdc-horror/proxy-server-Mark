const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

// port 4000 for the proxy server
const port = 4000;

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
})

app.listen(port, () => {
  console.log(`Hugo's proxy server listening on ${port}`);
});
