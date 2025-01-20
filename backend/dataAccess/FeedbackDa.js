import Feedback from "../entities/Feedback.js";
import mysql from 'mysql2';
import { DB_PASSWORD, DB_USERNAME } from "../Const.js";

const conn = mysql.createConnection({
    host: "localhost",
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: "feedback_app"
})

async function createFeedback(feedback, ORM = true) {
    if (!ORM) {
        conn.query('INSERT INTO Feedback SET ?', feedback, (error, results, fields) => {
            if (error) throw error
            console.log(results.insertId)
        })
    }
    else{
        return await Feedback.create(feedback);
    }
}

async function getFeedback(ORM = true) {
    if (!ORM) {
        conn.query("SELECT * from Feedback", (error, results, fields) => {
            if (error) throw error;

            console.log(fields);
            console.log(results);
        });
    }
    else {
        return await Feedback.findAll();
    }
}

export {
    createFeedback,
    getFeedback
}