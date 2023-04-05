const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5' ,'item 6','item 7'];
  res.render('index', { items });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
