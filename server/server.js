const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 9909;
const db = new sqlite3.Database('./database.db');
app.use(cors());
app.use(express.json());

//Раскоментировать при первом запуске 
sql = 'CREATE TABLE user(id INTEGER PRIMARY KEY, username TEXT, email TEXT, taskname TEXT, task TEXT, status TEXT)';
db.run(sql);
sql = 'CREATE TABLE workers(id INTEGER PRIMARY KEY, username TEXT, email TEXT, status TEXT, password TEXT, lastname TEXT)';
db.run(sql);

function deleteTask(id) {
  const sql = 'DELETE FROM user WHERE id = ?';
  db.run(sql, [id], (err) => {
    if (err) {
      console.error('Ошибка при удалении задачи:', err);
    } else {
      console.log('Задача успешно удалена');
    }
  });
}

// sql="DROP TABLE workers"
// db.run(sql)
// sql="DROP TABLE user"
// db.run(sql)


function deleteWorker(id) {
  const sql = 'DELETE FROM workers WHERE id = ?';
  db.run(sql, [id], (err) => {
    if (err) {
      console.error('Ошибка при удалении Работника:', err);
    } else {
      console.log('работника успешно удалена');
    }
  });
}
// deleteTask(1);

app.get('/', (req, res) => {
  const sql = "SELECT * FROM user";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Ошибка при получении списка задач:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

app.get('/workers', (req, res) => {
  const sql = "SELECT * FROM workers";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Ошибка при получении списка Работников:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

app.post("/user", (req, res) => {
  const { username, email, taskname, task, status } = req.body;
  const sql = "INSERT INTO user(username, email, taskname, task, status) VALUES(?, ?, ?, ?, ?)";
  db.run(sql, [username, email, taskname, task, status], (err) => {
    if (err) {
      console.error('Ошибка при добавлении задачи:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Задача успешно добавлена');
      res.status(200).send('Задача успешно добавлена');
    }
  });
});

app.post("/workers", (req, res) => {
  const { username, email, status, password, lastname} = req.body;
  const sql = "INSERT INTO workers(username, email, status, password, lastname) VALUES(?, ?, ?, ?, ?)";
  db.run(sql, [username, email, status, password, lastname], (err) => {
    if (err) {
      console.error('Ошибка при добавлении работника:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Работник успешно добавлена');
      res.status(200).send('Работник успешно добавлена');
    }
  });
});

app.post("/user/delete", (req, res) => {
  const {id} = req.body;
  deleteTask(id)
});

app.post("/workers/delete", (req, res) => {
  const {id} = req.body;
  deleteWorker(id)
});

app.post("/user/status", (req, res) => {
  const {id,status} = req.body;
  const sql = "UPDATE user SET status=? WHERE id=?";
  db.run(sql, [status,id], (err) => {
    if (err) {
      console.error('Ошибка при изменение статуса:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Задача успешно добавлена');
      res.status(200).send('Статус успешно изменен');
    }
  });
});

app.post("/workers/status", (req, res) => {
  const {id,status} = req.body;
  const sql = "UPDATE workers SET status=? WHERE id=?";
  db.run(sql, [status,id], (err) => {
    if (err) {
      console.error('Ошибка при изменение статуса:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Задача успешно добавлена');
      res.status(200).send('Статус успешно изменен');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});