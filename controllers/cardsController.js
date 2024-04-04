import sqlite3 from "sqlite3";

class CardController {
  constructor(dbPath) {
    this.db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Connected to the database.");
      }
    });
  }

  createTable() {
    const sql = `CREATE TABLE cards (
      id INTEGER PRIMARY KEY,
      fullname VARCHAR,
      title VARCHAR,
      email VARCHAR UNIQUE,
      username VARCHAR UNIQUE,
      password VARCHAR,
      phone VARCHAR,
      linkedin VARCHAR,
      github VARCHAR
    )`;

    this.db.run(sql, (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        console.log("Table created successfully");
      }
    });
  }

  dropTable() {
    this.db.run(`DROP TABLE cards`, (err) => {
      if (err) {
        console.error("Error dropping table:", err.message);
      } else {
        console.log("Table dropped successfully");
      }
    });
  }

  addCard(fullname, title, email, username, password, phone, linkedin, github) {
    const sql = `INSERT INTO cards (fullname, title, email, username, password, phone, linkedin, github) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    this.db.run(
      sql,
      [fullname, title, email, username, password, phone, linkedin, github],
      (err) => {
        if (err) {
          console.error(`ERROR when trying to insert card: ${err.message}`);
        } else {
          console.log("Card added successfully");
        }
      }
    );
  }

  queryAll() {
    const sql = `SELECT * FROM cards`;
    this.db.all(sql, [], (err, rows) => {
      if (err) {
        console.error("Error querying database:", err.message);
      } else {
        rows.forEach((row) => {
          console.log(row);
        });
      }
    });
  }
}

export default CardController;

/* REF CODE ********************************
// handle db
let sql;

//1. connect ot db
const db = new sqlite3.Database("./cards.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the cards.db database.");
  }
});
/*
 for ref

 fullname: "Shefy Gur-Ary",
    title: "Software Developer / Tech Lead",
    email: "shefyg@gmail.com",
    linkedin: "https://www.linkedin.com/in/shefy-gur-ary/",
    phone: "0541234567",
    github: "https://github.com/shefyg",
*/
//2. create table - should run this only one time
// sql = `CREATE TABLE cards (id INTEGER PRIMARY KEY, fullname VARCHAR, title VARCHAR, email VARCHAR UNIQUE,
//   username VARCHAR UNIQUE, password VARCHAR, phone VARCHAR, linkedin VARCHAR, github VARCHAR)`;
// db.run(sql);

//3.  drop table
// db.run(`DROP TABLE cards`);

//4. add data
/*
sql = `INSERT INTO cards (fullname, title, email, username, password, phone, linkedin, github) 
                  VALUES (?,?,?,?,?,?,?,?)`;
db.run(
  sql,
  [
    "Keren Gur-Ary",
    "The best partner",
    "keren123@gmail.com",
    "kerenMGirl",
    "123456",
    "0549988149",
    "",
    "",
  ],
  (err) => {
    if (err) {
      console.error(`ERROR when trying to insert card ${err.message}`);
    } else {
      console.log("Added to the cards");
    }
  }
);

// Querying the db
sql = `SELECT * FROM cards`;
db.all(sql, [], (err, rows) => {
  if (err) {
    console.error(err.message);
  } else {
    rows.forEach((row) => {
      console.log(row);
    });
  }
});
*/
