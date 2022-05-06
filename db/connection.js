import mysql from 'mysql';
import "dotenv/config";

const DBConnection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE,
  multipleStatements:true,
});

export default DBConnection;
