import Activitate from '../entities/Activitate.js'
import mysql from 'mysql2';
import { DB_PASSWORD, DB_USERNAME } from "../Const.js";

const conn = mysql.createConnection({
    host: "localhost",
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: "feedback_app"
})

async function createActivitate(activitate, ORM = true) {
    if (!ORM) {
        conn.query('INSERT INTO Activitate SET ?', activitate, (error, results, fields) => {
            if (error) throw error
            console.log(results.insertId)
        })
    }
    else{
        return await Activitate.create(activitate);
    }
}

async function getActivitate(ORM = true) {
    if (!ORM) {
        conn.query("SELECT * from Activitate", (error, results, fields) => {
            if (error) throw error;

            console.log(fields);
            console.log(results);
        });
    }
    else {
        return await Activitate.findAll();
    }
}

async function getActivitateId(id, ORM = true) {
    if (!ORM) {
        conn.query("SELECT * from Activitate WHERE ActivitateId = ?", id, (error, results, fields) => {
            if (error) throw error;
            console.log(results);
        });
    }
    else {
        return await Activitate.findByPk(id);
    }
}

async function updateActivitate(id,activitate,ORM = false){
    if (parseInt(id) !== activitate.ActivitateId)
        return {error: true, msg: "Entity id diff"}

    let updateE = await getActivitateId(id);
    if (!updateE)
        return {error: true, msg: "No entity found"}

    if (!ORM)
    {
        conn.query('UPDATE Activitate SET ? WHERE ActivitateId = ?', [activitate, id], (error, results, fields) => {
            if (error) throw error;
            console.log('Utilizatorul a fost actualizat cu succes.');
          });   
        return {error: false, msg:"Success", obj: "Success"}
    } 
    else
    {
        return {error: false, msg: "", obj: await updateEntity.update(activitate)};
    }
}

async function deleteActivitate(id, ORM = false){
    let deleteE = await getActivitateId(id);
    if (!deleteE)
        return {error: true, msg: "No entity found"}

        if (!ORM)
        {
            conn.query('DELETE FROM Activitate WHERE ActivitateId = ?', id, (error, results, fields) => {
                if (error) throw error;
                console.log('Success.');
              });
              return {error: false, msg:"Success", obj: "Success"}
        } 
    
        else
        {
            return {error: false , msg: "", obj: await deleteEntity.destroy()};
        }
}

export {
    createActivitate,
    getActivitate,
    getActivitateId,
    updateActivitate,
    deleteActivitate
}