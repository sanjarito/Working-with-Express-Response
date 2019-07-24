const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');


describe('GET /apps', () => {

  it('should return an array of playstores', () => {
  return request(app)
    .get('/apps')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
     expect(res.body).to.be.an('array')
     expect(res.body).to.have.lengthOf.at.least(1);
     const singapp = res.body[0]
     expect(singapp).to.include.all.keys('App','Rating')
     })
   })


  it('should be 400 if search is incorrect', () => {
  return request(app)
    .get('/apps')
    .query({search: 'MISTAKE'})
    .expect(400, 'Search query must be one of the following: Action, Puzzle, Strategy, Casual, Arcade, Card');
  });

  it.only('should sort by Rating', () => {
    return request(app)
      .get('/apps')
      .query({sort: 'App'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        let i = 0;
        let sorted = true;
        while(sorted && i < res.body.length - 1) {
          sorted = sorted && res.body[i].App< res.body[i + 1].App;
          i++;
        }
        expect(sorted).to.be.true;
        });
    });

})
