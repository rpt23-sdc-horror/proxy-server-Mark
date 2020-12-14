require('newrelic');

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const fetch = require('node-fetch');

const app = express();

// port 4000 for the proxy server
const port = 4000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/shop/:productId/:styleId', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/api/reviews/:productID', async (req, res) => {
  const { productID } = req.params;
  try {
    const response = await fetch(
      `http://18.219.146.205:3003/api/reviews/${productID}`
    );
    const data = await response.json();
    console.log(data);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/api/product/:productID', async (req, res) => {
  const { productID } = req.params;
  try {
    const response = await fetch(
      `http://127.0.0.1:3008/product/${productID}`
    );
    const data = await response.json();
    console.log(data);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('*', (req, res) => {
  res.status(404).send();
});



app.listen(port, () => {
  console.log(`Hugo's proxy server listening on port ${port}`);
});
