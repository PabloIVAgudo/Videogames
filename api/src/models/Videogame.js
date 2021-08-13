const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        is: /^[^{}<>#$%&~^`/*+]*$/g
      }
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        is: /^[^{}#$&~^`*+]*$/g
      }
    },
    releaseDate:{
      type:DataTypes.DATEONLY,
      allowNull: true,
      validate:{
        isDate: true
      }
    },
    rating:{
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        isFloat: true
      }
    },
    platforms:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        is: /^[^{}<>#$%&~^`/*+]*$/g
      }
    },
    image:{
      type: DataTypes.STRING
    }      
  });
};
