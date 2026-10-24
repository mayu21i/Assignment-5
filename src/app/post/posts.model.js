const { Model, DataTypes } = require("sequelize");
const sequelize = require("../common/db/connections");

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, 

    {
        sequelize,
        modelName: 'Post',
        tableName: 'Posts',
        timestamps: true,
        paranoid: true,
    }
);

module.exports = Post;