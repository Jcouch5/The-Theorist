const { Model, DataTypes } = require('sequelize');
// Still require use of connection.js file
const sequelize = require('../config/connection');

class Comments extends Model {}

Posts.init(
	    {
                id: {
                        type: DataTypes.INTEGER,
                        primaryKey: true,
                        allowNull: false,
                        autoIncrement: true,
                },
                comment: { 
                        type: DataTypes.STRING,
                        allowNull: false,
                        validate: {
                            len:[2,140],
                        },
                },
                post_id: {
                        type: DataTypes.INTEGER,
                        references: {
                                model: 'post',
                                key: 'id',
                        },
                },
                user_id: {
                        type: DataTypes.INTEGER,
                        references: {
                                model: 'user',
                                key: 'id',
                        },
                },
        },
        {
                sequelize,
                timestamps: false,
                freezeTableName: true,
                underscored: true,
                modelName: 'posts',
        }
);

module.exports = Comments;