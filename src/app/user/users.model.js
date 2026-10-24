const { DataTypes } = require("sequelize");
const sequelize = require("../common/db/connections");

function checkNameLength(user){
    const cleanName = user.name.trim();

    if(cleanName.length <= 2){
        throw new Error("Name must be longer than 2 characters");
    }
    user.name = cleanName;
}



const User = sequelize.define("User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true ,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Enter a valid email address",
                }, 
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false ,
            validate: {
                checkPasswordLength(value){
                    if( typeof value !== "string" || value.length <= 6){
                        throw new Error("Password must be longer than 6 characters");
                    }
                },
            },
        },
        role:{
            type: DataTypes.ENUM('user' , 'admin'),
            allowNull: false,
            defaultValue: 'user',
        },
    },
    {
        tableName: 'Users',
        timestamps: true,
        hooks: {
            beforeCreate: checkNameLength,
        },
    }
);

module.exports = User ;
