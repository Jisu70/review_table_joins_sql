const Sequelize = require("sequelize");
const sequelize = require("../utils/dbConnect");

const Review = sequelize.define("Review", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    rating: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    reviewCount: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    reviewStatus: {
        type: Sequelize.ENUM(['tag1', 'tag2', 'tag3']),
        defaultValue: null ,
    }
});

module.exports = Review;