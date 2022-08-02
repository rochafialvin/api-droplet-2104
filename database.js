require("dotenv").config();
const mysql2 = require("mysql2");

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql2.createPool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  decimalNumbers: true,
});

pool.getConnection((err, conn) => {
  if (err) {
    conn && conn.release();
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log(`Successfully connected to the database (id ${conn.threadId})`);
  conn.release();
});

module.exports = pool;
