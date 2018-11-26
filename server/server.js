const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const path = require('path');
const ws = require('express-ws');

const app = express();
ws(app);

app.use(morgan('dev'));
app.use(favicon(path.join(__dirname, '../public/img/favicon.png')));

app.all('*/app.bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/app.bundle.js'));
});


// app.use(express.static(path.join(__dirname, '/public')));


const clients = {};
app.ws('/ws', (ws, req) => {
  const id = Math.round(Math.random() * 100);
  clients[id] = ws;
  console.log(`новое соединение ${id}`);
  ws.intervalId = null;
  ws.state = {};

  ws.on('message', (message) => {
    try {
      console.log('get Message', message);
      /*
      const { type, payload } = JSON.parse(message);
      console.log(`получено сообщение ${payload}`);

      if (type === 'chat-message') {
        Object
          .values(clients)
          .forEach((client) => {
            client.send(JSON.stringify({
              type,
              payload,
            }));
          });
      }

      if (type === 'start-game') {
        ws.state = {
          bullets: [],
          me: {
            coll: 2,
          },
        };

        ws.state.items = Array.from(new Array(5 * 5), (_, position) => ({
          coll: position % 5,
          row: position < 5 ? 0 : (position / 5) | 0,
          dead: false,
          fadeSpeed: 0,
          fadeLevel: 0,
        }));

        ws.send(JSON.stringify({
          type: 'START_GAME',
          payload: ws.state,
        }));

        ws.intervalId = setInterval(() => {
          ws.state.bullets = ws.state.bullets
            .map((bullet) => {
              bullet.percents += 0.02;
              return bullet;
            })
            .filter((bullet) => {
              if (bullet.percents >= 1 && bullet.row >= 0) {
                ws.state.items[bullet.row * 5 + bullet.coll].fadeSpeed = rand(10, 20) / 1000;
                return false;
              }

              return bullet.percents < 1;
            });

          ws.state.items = ws.state.items.map((item) => {
            if (item.fadeSpeed) {
              item.fadeLevel += item.fadeSpeed;
            }

            if (item.fadeLevel >= 1) {
              item.dead = true;
            }

            return item;
          });

          ws.send(JSON.stringify({
            type: 'GAME_STATE_CHANGED',
            payload: ws.state,
          }));

          if (!ws.state.items.find(item => !item.dead)) {
            ws.send(JSON.stringify({
              type: 'FINISH_GAME',
              payload: null,
            }));

            if (ws.intervalId) {
              clearInterval(ws.intervalId);
            }

            ws.intervalId = null;
            ws.state = {};
          }
        }, 1000 / 50);
      }

      if (type === 'game-command') {
        switch (payload) {
          case 'LEFT': {
            ws.state.me.coll = Math.max(0, ws.state.me.coll - 1);
            break;
          }
          case 'RIGHT': {
            ws.state.me.coll = Math.min(4, ws.state.me.coll + 1);
            break;
          }
          case 'FIRE': {
            const coll = ws.state.me.coll;
            const arr = [
              ws.state.items[20 + coll],
              ws.state.items[15 + coll],
              ws.state.items[10 + coll],
              ws.state.items[5 + coll],
              ws.state.items[coll],
            ];
            ws.state.bullets.push({
              coll,
              row: (arr.find(item => !item.fadeSpeed) || { row: -1 }).row, // FIXME
              percents: 0,
            });
            break;
          }
        }
      }
      */
    } catch (e) {
      console.log('onmessage error');
    }
  });

  ws.on('close', () => {
    console.log(`соединение закрыто ${id}`);
    if (ws.intervalId) {
      clearInterval(ws.intervalId);
    }
    delete clients[id];
  });
});


app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening port ${port}`);
});
