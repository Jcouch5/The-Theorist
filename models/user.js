const { Model, DataTypes } = require('sequelize');
// Still require use of connection.js file
// const bcrypt = require('bcrypt');

const sequelize = require('../config/connection');

// class User extends Model {
//     checkPassword(loginPw) {
//       return bcrypt.compareSync(loginPw, this.password);
//     }
//   }
  

class User extends Model {}

User.init(
	    {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                username: { 
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                    validate: {
                            len:[8,30],
                    },
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        len: [8,20],
                    },
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                    validate: {
                        isEmail: true,
                    },

                }
        },
        {
                sequelize,
                timestamps: false,
                freezeTableName: true,
                underscored: true,
                modelName: 'user',
        }
);

module.exports = User;