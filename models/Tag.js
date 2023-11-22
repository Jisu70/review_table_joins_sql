const Sequelize = require("sequelize");
const sequelize = require("../utils/dbConnect");

const Tag = sequelize.define("Tag", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    tagName: {
        type: Sequelize.STRING, 
        allowNull: false,
    },
    
});

module.exports = Tag;