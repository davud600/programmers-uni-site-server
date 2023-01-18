import { DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD, DB_PORT } from '@config';
import mysql from 'mysql2';
// const mysql = require('mysql2');

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});
const poolPromise: any = pool.promise();

// const sql = 'SELECT * FROM users;';
// pool.execute(sql, (err, res) => {
//   if (err) throw err;
//   console.log(res);
// });

export { poolPromise };
