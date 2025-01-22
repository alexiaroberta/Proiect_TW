import express from 'express';
import mysql from 'mysql2/promise';
import { DB_USERNAME, DB_PASSWORD } from './Const.js';
import activitateRouter from './routes/ActivitateRoutes.js';
import feedbackRouter from './routes/FeedbackRoutes.js';
import cors from 'cors'; 

let app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/api', activitateRouter);
app.use('/api', feedbackRouter);

let conn;

mysql.createConnection({
    host: 'localhost',
    user: DB_USERNAME,
    password: DB_PASSWORD
})
    .then((connection) => {
        conn = connection;
        return connection.query('CREATE DATABASE IF NOT EXISTS feedback_app');
    })
    .then(() => {
        console.log("Database 'feedback_app' created or already exists.");
        return conn.end();
    })
    .catch((err) => {
        console.error("An error occurred:");
        console.error(err.stack);
    });

let port = process.env.PORT || 8000;
app.listen(port);
console.log("API is running at " + port);