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
      allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    releaseDate:{
        type:DataTypes.STRING
    },
    rating:{
        type: DataTypes.FLOAT
    },
    platforms:{
        type: DataTypes.STRING,
        allowNull: false
    },
    image:{
      type: DataTypes.STRING,
    }
  });
};
