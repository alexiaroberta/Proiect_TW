import { Sequelize } from "sequelize";
import db from "../dbConfig.js"

const Activitate = db.define("Activitate",{
    ActivitateId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ActivitateData: {
        type: Sequelize.DATE,
        allowNull: false
    },
    ActivitateDescriere: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ActivitateCodUnic: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    ActivitateDurata: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
})

export default Activitate;