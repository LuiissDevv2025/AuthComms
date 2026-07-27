require('dotenv').config();
const mysql = require('mysql2/promise');

// Connection Pool
export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test Connection
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("Connection Sucessful");

        connection.release();
        process.exit(0);
    } catch (error) {
        console.log("Connection ErrorL: ", error);
        process.exit(1);
    }
}

testConnection();
