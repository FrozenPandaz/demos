import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import App from './app/app';
import { readFileSync } from 'fs';
import { join } from 'path';

const app = express();
const index = readFileSync(join(__dirname, '../react-app/index.html')).toString();
app.use(express.static(join(__dirname, '../react-app'), {
  index: false
}));

app.get('*', (req, res) => {
  const render = index.replace('<div id="root"></div>', `<div id="root">${renderToString(<App></App>)}</div>`);
  res.mimeType = 'text/html';
  res.send(render);
});

app.listen(4200, () => {
  console.log('Listening at http://localhost:4200');
});
