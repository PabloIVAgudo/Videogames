const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('genre', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      validate:{
        isInteger: true        
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        is: /^[^{}<>#$%&~^`/*+]*$/g
      }
    }
  });
};
