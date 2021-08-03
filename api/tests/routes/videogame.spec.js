/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
  description: 'El mejor juego de todos.',
  platforms: "SuperNintendo"
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', (done) =>{
      agent.get('/videogames').expect(200);
      done();
    });    
  });
  describe('GET /videogame', () => {
    it('should get 200', (done) =>{
      agent.get('/videogame').expect(200);
      done();
    }); 
  });
  describe('POST /videogame', () => {
    it('should get 200', (done) =>{
      agent.post('/videogame').expect(200);
      done();
    });
    it('responds a new model with the data logged', (done) =>{
      agent.post('/videogame').send({name:'GTA V', description: 'Oldie but goodie', platform:'PC,PS2,X-Box'})
      .then(res => {
        expect(res.body.result).to.be.equal(Videogame.create({name:'GTA V', description: 'Oldie but goodie', platform:'PC,PS2,X-Box'}));        
      })
      done();    
    });
    it('responds with 404 if the logged data lacks a name', (done) =>{
      agent.post('/videogame').send({description: 'Oldie but goodie', platform:'PC,PS2,X-Box'}).expect(404);      
      done();    
    });
    it('responds with 404 if the logged data lacks a description', (done) =>{
      agent.post('/videogame').send({name:'GTA V', platform:'PC,PS2,X-Box'}).expect(404);      
      done();    
    });
    it('responds with 404 if the logged data lacks a platform', (done) =>{
      agent.post('/videogame').send({name:'GTA V',description: 'Oldie but goodie'}).expect(404);      
      done();    
    });
  });
});
