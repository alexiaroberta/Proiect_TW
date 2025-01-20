import { Sequelize } from "sequelize";
import db from "../dbConfig.js"

const Feedback = db.define("Feedback",{
    FeedbackId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    FeedbackIdActivitate: {
        type: Sequelize.INTEGER,
        references:{
            model: 'Activitate',
            key: 'ActivitateId'
        },
        allowNull: false
    },
    FeedbackEmoticon: {
        type: Sequelize.STRING,
        allowNull: false
    },
    FeedbackData: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    }
})

export default Feedback;