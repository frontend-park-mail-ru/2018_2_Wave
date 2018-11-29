const fallback = require('express-history-api-fallback');
const express = require('express');
const morgan = require('morgan');
const ws = require('express-ws');

const app = express();
ws(app);

app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(fallback('index.html', { root: 'public' }));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening port ${port}`);
});
