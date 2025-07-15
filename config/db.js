import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

if (process.env.PORT === undefined) {
  dotenv.config()  // Default port if not set
}


 const pool = mysql.createPool({

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,

})

export default pool