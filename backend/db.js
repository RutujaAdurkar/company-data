// // db.js
require("dotenv").config();
const sql = require("mssql");

// SQL CONFIG
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT),
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// Create a single global DB connection pool
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log("✔ SQL Server Connected Successfully");
        return pool;
    })
    .catch(err => {
        console.error("❌ SQL Connection Error:", err);
    });

module.exports = {
    sql,
    poolPromise
};
