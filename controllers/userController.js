const User = require('../models/User');
const bcrypt = require("bcrypt");
const {Sequelize} = require('sequelize')

//. Save the user data to Database
const saveData = async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
        });
        await newUser.save();
        res.status(200).json({
            message: "save user successful!",
        });
    } catch (err) {
        console.log(err.code);
        if (err instanceof Sequelize.UniqueConstraintError) {
            res.status(400).json({
                error: "Email already exists."
            });
        } else {
            res.status(500).json({
                error: "An error occurred during save.",
            });
        }
    }
};
// Get all the user 
const getAllUser = async (req, res) => {;
    try {
        const users = await User.findAll() ;
        res.status(200).json({
           Users : users
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "An error occurred during Find users.",
        });
    }
};

module.exports = {
    saveData,
    getAllUser
}


/*

const saveData = async (req, res) => {
  try {
    // ...
    await newUser.save();
    res.status(200).json({
      message: "save user successful!",
    });
  } catch (err) {
    console.log(err);
    if (err instanceof Sequelize.UniqueConstraintError) {
      res.status(400).json({
        error: "Email already exists."
      });
    } else {
      res.status(500).json({
        error: "An error occurred during save.",
      });
    }
  }
};


*/ 