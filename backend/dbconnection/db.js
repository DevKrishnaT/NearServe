import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host:"localhost",
    user: "root",
    password: "Yummy@95800@",
    database: "servicesdb",
    waitForConnections: true,
    connectionLimit:10

});

export default pool;