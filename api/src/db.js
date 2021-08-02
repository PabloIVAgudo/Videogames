require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename); //basename es es el nombre de este archivo con la extension

const modelDefiners = []; //modelDefiners es un array donde cada elemento tiene la funcion require a la ruta de directorio de cada archivo de modelo

// Leemos todos los archivos de la carpeta Models, los filtramos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file))); //Por alguna razón ya me agrega la barra '/' antes de file porque no la defino en path.join, quizá sea por defecto al estar __dirname
  });


// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models); //Me transforma todos los objetos en array
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries); //Me transforma todos los array dentro de mi array en pares key-value

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {Genre , Videogame} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Genre.belongsToMany(Videogame, {through: 'videogame_genre'});
Videogame.belongsToMany(Genre, {through: 'videogame_genre'});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
